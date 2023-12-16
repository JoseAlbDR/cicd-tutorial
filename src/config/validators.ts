import mongoose from 'mongoose';
import { ITags } from '../data/seed/seed';
import { TAGS } from './tags';

export class Validators {
  static isMongoID(id: string) {
    return mongoose.isValidObjectId(id);
  }

  static isValidTag(tags: ITags | ITags[]) {
    return (tags as ITags[]).every((tag) => TAGS.includes(tag));
  }

  static isValidPrice(price: string) {
    const regex = /^(?:(\d+)-(\d+)|(\d+)-|\-(\d+))$/;
    return regex.test(price);
  }
}
