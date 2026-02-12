import { IsEmail, IsNotEmpty, IsString, IsArray, ValidateNested, IsInt, Min, Max, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class OrderItemDto {
    @IsInt()
    eventId: number;

    @IsInt()
    @Min(1)
    @Max(10)
    quantity: number;
}

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    customerName: string;

    @IsEmail()
    customerEmail: string;

    @IsString()
    @IsOptional()
    paymentMethod?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}
