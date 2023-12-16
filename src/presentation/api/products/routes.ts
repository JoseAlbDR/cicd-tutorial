import { Router } from 'express';
import { ProductController } from './controller';
import { ProductService } from '../services/product.service';
import { ErrorHandler } from '../../../domain';
import { JWTAdapter, envs } from '../../../config';
import { AuthMiddleware } from '../../middlewares/authMiddleware';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const jwtAdapter = new JWTAdapter(envs.JWT_SEED);
    const authMiddleware = new AuthMiddleware(jwtAdapter);
    const productService = new ProductService();
    const errorHandler = new ErrorHandler();
    const productController = new ProductController(
      productService,
      errorHandler
    );

    router.get('/', productController.getProducts);
    router.post(
      '/',
      authMiddleware.authenticateUser,
      productController.createProduct
    );

    return router;
  }
}
