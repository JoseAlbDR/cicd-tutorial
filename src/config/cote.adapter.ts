import { Requester } from 'cote';

interface RequestOptions {
  name: string;
  type: string;
  [key: string]: any;
}

export class CoteAdapter {
  static request(options: RequestOptions) {
    const { name, type, ...payload } = options;

    const requester = new Requester({ name });

    const event = {
      type,
      ...payload,
    };

    requester.send(event, (result) => console.log(result));
  }
}
