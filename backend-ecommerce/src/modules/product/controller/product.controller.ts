import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async getAllProducts(@Res() res) {
    try {
      const result = await this.productService.findAll({});
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error)
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: string, @Res() res) {
    try {
      const result = await this.productService.findOne({ where: { productID: id } });
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error)
    }
  }
}