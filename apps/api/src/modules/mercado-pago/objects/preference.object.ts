import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
   IsBoolean,
   IsDate,
   IsNumber,
   IsOptional,
   IsString,
} from 'class-validator';

@ObjectType()
export class PreferenceResponseObject {
   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   additional_info?: string;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   auto_return?: string;

   @IsBoolean()
   @IsOptional()
   @Field({ nullable: true })
   binary_mode?: boolean;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   client_id?: string;

   @IsNumber()
   @IsOptional()
   @Field(() => Int, { nullable: true })
   collector_id?: number;

   @IsDate()
   @Field({ nullable: true })
   date_created?: Date;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   external_reference?: string;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   id?: string;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   init_point?: string;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   sandbox_init_point?: string;

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   site_id?: string;
}
