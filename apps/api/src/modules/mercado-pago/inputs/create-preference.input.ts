import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

@InputType()
class PreferenceItemsInput {
   @Field(() => String, {
      nullable: false,
      description:
         '(string, obrigatório): Este é um identificador único para o item dentro da preferência de pagamento. Ele é usado para diferenciar este item de outros na mesma preferência. Exemplo: "vote-1234',
   })
   id!: string;

   @Field(() => String, {
      nullable: false,
      description:
         '(string, obrigatório): O título ou nome do item. Este campo é usado para descrever o item que está sendo vendido. Exemplo: "Voto Miss Brasil - Maria Eduarda"',
   })
   title!: string;

   @Field(() => String, {
      nullable: true,
      description:
         '(string, opcional): Identificador de categoria do item. Este campo pode ser usado para classificar o item em uma categoria específica, o que pode ser útil para fins de relatório ou organização. Exemplo: "eletronicos"',
   })
   category_id?: string;

   @Field(() => String, {
      nullable: false,
      description:
         '(string, opcional): Uma descrição mais detalhada do item. Este campo pode ser usado para fornecer informações adicionais que podem ser importantes para o comprador. Exemplo: "X Votos para a X em - Y"',
   })
   description!: string;

   @Field(() => String, {
      nullable: false,
      description:
         ' (string, opcional): O identificador da moeda usada para o preço do item. Isso é importante para garantir que as transações sejam processadas na moeda correta. Exemplo: "BRL"',
      defaultValue: 'BRL',
   })
   currency_id!: string;

   @Field(() => Number, { nullable: false })
   quantity!: number;

   @Field(() => Number, { nullable: false })
   unit_price!: number;
}

@InputType()
class PreferencePayerInput {
   @Field(() => String, {
      nullable: true,
      description: '(string, opcional): Nome do comprador. Exemplo: "João"',
   })
   name?: string;

   @Field(() => String, {
      nullable: true,
      description: '(string, opcional): E-mail do comprador. Exemplo: ',
   })
   email?: string;
}

@InputType()
export class CreatePreferenceInput {
   @Field(() => String, { nullable: false })
   additional_info!: string;

   @ValidateNested()
   @Type(() => PreferenceItemsInput)
   @Field(() => [PreferenceItemsInput], { nullable: false })
   items!: PreferenceItemsInput[];

   @IsOptional()
   @ValidateNested()
   @Type(() => PreferencePayerInput)
   @Field(() => PreferencePayerInput, { nullable: true })
   payer?: PreferencePayerInput;
}
