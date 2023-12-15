import { Lodash } from '../../config';
import { CustomError, ErrorHandler, PaginationDto } from '../../domain';
import { ProductService } from './product.service';

export class TagsService {
  constructor(private readonly productService: ProductService) {}

  public async getTags(paginationDto: PaginationDto) {
    try {
      const data = await this.productService.getProducts(paginationDto);

      const tags = Lodash.unique(data.products);

      return tags;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      console.log(error);
      throw CustomError.internalServer();
    }
  }
}
