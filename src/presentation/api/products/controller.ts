import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import {
  CreateProductDto,
  CustomError,
  ErrorHandler,
  FiltersDto,
  PaginationDto,
} from '../../../domain';
import { BuildFilterFromReq } from '../../../utils';

export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly errorHandler: ErrorHandler
  ) {}

  public getProducts = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const { name, tag, sale, price } = req.query;

    const [paginationError, paginationDto] = PaginationDto.create(
      +page,
      +limit
    );
    const [filtersError, filtersDto] = FiltersDto.create({ ...req.query });

    if (paginationError)
      return this.errorHandler.handleError(
        CustomError.badRequest(paginationError),
        res
      );

    if (filtersError)
      return this.errorHandler.handleError(
        CustomError.badRequest(filtersError),
        res
      );

    const queryObject = BuildFilterFromReq.build(filtersDto!);

    console.log({ queryObject });

    this.productService
      .getProducts(paginationDto!, queryObject)
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
