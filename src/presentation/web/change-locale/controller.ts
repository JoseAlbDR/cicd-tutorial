import { Request, Response } from 'express';

export class ChangeLocaleController {
  constructor() {}

  translate = (req: Request, res: Response) => {
    const { locale } = req.params;
  };
}
