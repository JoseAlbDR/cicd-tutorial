import { remove } from 'fs-extra';

export class FsAdapter {
  static async rmdir(path: string) {
    try {
      await remove(path);
    } catch (error) {
      throw error;
    }
  }
}
