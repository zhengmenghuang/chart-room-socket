import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import * as history from 'connect-history-api-fallback';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 开启Ｇzip
  app.use(compression());

  // 配置跨域
  app.enableCors();

  // 配置刷新404
  app.use(history({ verbose: true, index: '/'}));

  // 配置读取静态资源和view文件夹
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
