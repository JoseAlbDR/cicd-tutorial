import express, { Router } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { envs } from '../config';
import fileUpload from 'express-fileupload';

interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, publicPath = 'public' } = options;

    this.port = port;
    this.routes = routes;
    this.publicPath = publicPath;
  }

  async start() {
    this.app.set('views', path.join(__dirname, 'web', 'views'));
    this.app.set('view engine', 'ejs');

    /**
     * Global Template variables
     */
    this.app.locals.title = 'NodePop';

    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser(envs.JWT_SEED));
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );

    // Routes
    this.app.use(this.routes);

    // Public Folder
    this.app.use(express.static(this.publicPath));

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    // this.app.get('*', (req, res) => {
    //   const indexPath = path.join(
    //     __dirname + `../../../${this.publicPath}/index.html`
    //   );
    //   res.sendFile(indexPath);
    // });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
