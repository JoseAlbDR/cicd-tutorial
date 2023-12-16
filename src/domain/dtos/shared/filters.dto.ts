import { TAGS, Validators } from '../../../config';
import { ITags } from '../../../data/seed/seed';

export class FiltersDto {
  private constructor(
    public readonly name?: string,
    public readonly sale?: string,
    public readonly price?: string,
    public readonly tag?: ITags
  ) {}

  static create(
    name: string,
    sale: string,
    price: string,
    tag: ITags
  ): [string?, FiltersDto?] {
    if (price) {
      if (!Validators.isValidPrice(price))
        return [
          'Price is not a valid filter, allowed price filter are: number-, -number, number-number',
        ];
      const [min, max] = price.split('-');
      if (isNaN(+min)) ['Min price must be a number'];
      else if (+min < 0) ['Min price must be greater than zero'];
      if (isNaN(+max)) ['Min price must be a number'];
      else if (+max < 0) ['Min price must be greater than zero'];
    }
    if (sale !== 'onSale' && sale !== 'onSearch')
      [`Sale: ${sale} not allowed, alowed values: 'onSale', 'onSearch`];
    if (!Validators.isValidTag(tag))
      [`Tag must be a valid tag, allowed values: ${TAGS}.join(", ") `];

    return [undefined, new FiltersDto(name, sale, price, tag)];
  }
}
