import { Router } from 'express';
import { ProductController } from './controller';
import { ProductService } from '../services/product.service';
import { ErrorHandler } from '../../../domain';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const productService = new ProductService();
    const errorHandler = new ErrorHandler();
    const productController = new ProductController(
      productService,
      errorHandler
    );

    router.get('/', productController.getProducts);
    router.post('/', productController.createProduct);

    return router;
  }
}
