import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import {
  CreateProductDto,
  CustomError,
  ErrorHandler,
  PaginationDto,
} from '../../../domain';

export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly errorHandler: ErrorHandler
  ) {}

  public getProducts = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error)
      return this.errorHandler.handleError(CustomError.badRequest(error), res);

    this.productService
      .getProducts(paginationDto!)
      .then((products) => res.json(products))
      .catch((err) => this.errorHandler.handleError(err, res));
  };

  public createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      createdBy: '657c35822cb82442ef7a239e',
    });

    if (error)
      return this.errorHandler.handleError(CustomError.badRequest(error), res);

    this.productService
      .createProduct(createProductDto!)
      .then((product) => res.status(201).json(product))
      .catch((err) => this.errorHandler.handleError(err, res));
  };
}
