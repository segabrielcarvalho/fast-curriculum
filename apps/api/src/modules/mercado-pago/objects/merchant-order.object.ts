import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
   IsBoolean,
   IsDate,
   IsNumber,
   IsOptional,
   IsString,
} from 'class-validator';

@ObjectType()
export class MerchantOrderObject {
   @Field(() => Int, { nullable: true })
   id?: number;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   preference_id?: string;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   application_id?: string;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   status?: string;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   site_id?: string;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   sponsor_id?: string;

   @IsNumber()
   @IsOptional()
   @Field(() => Float, { nullable: true })
   paid_amount?: number;

   @IsNumber()
   @IsOptional()
   @Field(() => Float, { nullable: true })
   shipping_cost?: number;

   @IsDate()
   @Field({ nullable: true })
   date_created?: Date;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   external_reference?: string;

   @IsNumber()
   @IsOptional()
   @Field(() => Float, { nullable: true })
   total_amount?: number;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   order_status?: string;

   @IsDate()
   @Field({ nullable: true })
   last_updated?: Date;

   @IsBoolean()
   @Field()
   is_test: boolean;
}
