import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigType } from '@nestjs/config';
import mercadoPagoConfig from '../mercado-pago.config';
import { MyLogger } from '../../logger/my-logger.service';
import { PaymentCreateData } from 'mercadopago/dist/clients/payment/create/types';
import {
   PaymentSearch,
   PaymentSearchData,
} from 'mercadopago/dist/clients/payment/search/types';
import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';
import { PreferenceCreateData } from 'mercadopago/dist/clients/preference/create/types';
import { PreferenceResponse } from 'mercadopago/dist/clients/preference/commonTypes';
import { MerchantOrder, Payment, Preference } from 'mercadopago';
import { MerchantOrderGetData } from 'mercadopago/dist/clients/merchantOrder/get/types';
import { MerchantOrderResponse } from 'mercadopago/dist/clients/merchantOrder/commonTypes';
import appConfig from '../../app/app.config';

@Injectable()
class MercadoPagoProvider {
   private readonly client: AxiosInstance;
   private readonly preferenceClient: Preference;
   private readonly merchantOrderClient: MerchantOrder;
   private readonly paymentClient: Payment;

   constructor(
      @Inject(mercadoPagoConfig.KEY)
      private readonly mpConfig: ConfigType<typeof mercadoPagoConfig>,
      @Inject(appConfig.KEY)
      private readonly appConf: ConfigType<typeof appConfig>,
      private readonly logger: MyLogger,
   ) {
      logger.setContext(MercadoPagoProvider.name);

      this.client = axios.create({
         baseURL: this.mpConfig.baseUrl,
         headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${this.mpConfig.accessToken}`,
         },
      });

      this.preferenceClient = new Preference({
         accessToken: this.mpConfig.accessToken,
      });

      this.merchantOrderClient = new MerchantOrder({
         accessToken: this.mpConfig.accessToken,
      });

      this.paymentClient = new Payment({
         accessToken: this.mpConfig.accessToken,
         options: { timeout: 1000000 },
      });
   }

   private errorMessage(e: any, prefixo = 'Erro em Mercado Pago Provider: ') {
      if (e?.response?.data) {
         const { data } = e.response;
         this.logger.error('data: ', data);
         if (data.message)
            throw new BadRequestException(`${prefixo} ${data.message}`);
         if (data.reason)
            throw new BadRequestException(`${prefixo} ${data.reason}`);
         if (data.error)
            throw new BadRequestException(`${prefixo} ${data.error}`);
         throw new Error(`${prefixo} ${data}`);
      }
      this.logger.error(e);
      throw new BadRequestException(`${prefixo} ${e.message}`);
   }

   private async executeRequest<T>(
      method: 'get' | 'post' | 'delete' | 'put',
      url: string,
      data?: any,
      params?: any,
   ): Promise<T | null> {
      if (!this.mpConfig.enableModule) {
         this.logger.warn(
            `Integração com Mercado Pago desabilitada: ${method} ${url}`,
         );
         return null;
      }

      try {
         const config = {
            params: method === 'get' ? data : params,
            ...(method !== 'get' && { data }),
         };

         const response = await this.client[method]<T>(url, config);
         return response.data;
      } catch (e) {
         this.errorMessage(
            e,
            `Erro em Mercado Pago Provider: ${method} ${url}`,
         );
      }
   }

   async createPayment(
      paymentData: PaymentCreateData,
   ): Promise<PaymentResponse> {
      return this.executeRequest<PaymentResponse>(
         'post',
         '/v1/payments',
         paymentData,
      );
   }

   async getPayment(paymentId: string): Promise<PaymentResponse> {
      return this.executeRequest<PaymentResponse>(
         'get',
         `/v1/payments/${paymentId}`,
      );
   }

   async searchPaymentsBySDK(
      searchData: PaymentSearchData,
   ): Promise<PaymentSearch> {
      return this.paymentClient.search(searchData);
   }

   async searchPreferences(searchData: any): Promise<any> {
      return this.executeRequest<any>(
         'get',
         'checkout/preferences/search',
         null,
         searchData,
      );
   }

   async createPreference({
      body,
   }: PreferenceCreateData): Promise<PreferenceResponse> {
      try {
         return await this.preferenceClient.create({
            body: {
               ...body,
               expires: false,
               binary_mode: true,
               auto_return: 'approved',
               back_urls: {
                  failure: `${this.appConf.baseWebUrl}/profile/my-orders`,
                  pending: `${this.appConf.baseWebUrl}/profile/my-orders`,
                  success: `${this.appConf.baseWebUrl}/profile/my-orders`,
               },
               notification_url: `${this.appConf.baseApiUrl}/api/mercado-pago/notification`,
               payment_methods: {
                  excluded_payment_methods: [
                     { id: 'bolbradesco' },
                     { id: 'pec' },
                  ],
                  installments: 1,
               },
            },
         });
      } catch (e) {
         this.errorMessage(e, 'Erro ao criar preferência no Mercado Pago');
      }
   }

   async createProcessPayment({
      body,
   }: PaymentCreateData): Promise<PaymentResponse> {
      try {
         const payment = await this.paymentClient.create({ body });
         return payment;
      } catch (e) {
         this.errorMessage(e, 'Erro ao criar pagamento no Mercado Pago');
      }
   }

   async getMerchantOrder({
      merchantOrderId,
      requestOptions,
   }: MerchantOrderGetData): Promise<MerchantOrderResponse> {
      try {
         const merchantOrder = await this.merchantOrderClient.get({
            merchantOrderId,
            requestOptions,
         });
         return merchantOrder;
      } catch (e) {
         this.errorMessage(
            e,
            'Erro ao buscar ordem do comerciante no Mercado Pago',
         );
      }
   }
}

export default MercadoPagoProvider;
