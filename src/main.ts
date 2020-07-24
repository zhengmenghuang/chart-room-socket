import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import * as history from 'connect-history-api-fallback';
import { RedisIoAdapter } from './redis-io-adapter';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 开启Ｇzip 应该放在最前
  app.use(compression());

  // 设置全局的api前缀
  app.setGlobalPrefix('api');

  // 配置websocket 负载均衡
  app.useWebSocketAdapter(new RedisIoAdapter(app));

  // 配置跨域
  app.enableCors();

  // 配置刷新404 应该放在最后 并且配置带api的路径走原来的
  app.use(history({
    index: '/',
    rewrites: [
      {
        from: /^\/api\/.*$/,
        to: function(context) {
          return context.parsedUrl.path
        }
      }
    ]
  }));

  await app.listen(3000);
}
bootstrap();
