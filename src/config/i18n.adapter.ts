import { I18n } from 'i18n';

interface i18nOptions {
  locales: string[];
  directory: string;
  defaultLocale: string;
  autoReload: boolean;
  syncFiles: boolean;
  cookie: string;
}

export class i18nAdaper {
  static async configure(options: i18nOptions) {
    const config = new I18n({ ...options });

    config.setLocale(options.defaultLocale);

    return config.init;
  }
}
