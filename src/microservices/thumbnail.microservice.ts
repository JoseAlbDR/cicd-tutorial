import jimp from 'jimp';
import { envs } from '../config';
import path from 'path';

interface ResizeImageOptions {
  imagePath: string;
  imageExtension: string;
  imageName: string;
}

export class ThumbnailMicroservice {
  static async resizeImage(options: ResizeImageOptions) {
    const { imagePath, imageExtension, imageName } = options;

    const image = await jimp.read(imagePath);

    await image.resize(100, jimp.AUTO);

    const thumbPath = path.join(
      envs.UPLOADS_FOLDER,
      'products',
      `${imageName}-thumb.${imageExtension}`
    );

    await image.writeAsync(thumbPath);
  }
}
