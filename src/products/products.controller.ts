import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/UpdateProductDto';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(): string {
    return 'all products';
  }

  @Get(':id')
  getProductById(@Param('id') id: number): string {
    return 'product by id:' + id;
  }

  @Post()
  postProduct(@Body() body: CreateProductDto): string {
    return `product title: ${body.title} and the price is ${body.price}$`;
  }

  @Delete()
  deleteProduct(@Param('id') id: number): string {
    return 'Deleted ' + id;
  }

  @Put(':id')
  updateProduct(
    @Body() body: UpdateProductDto,
    @Param('id') id: number
  ): string {
    return 'Updated ' + id;
  }
}
