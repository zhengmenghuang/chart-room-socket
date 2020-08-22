"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const compression = require("compression");
const history = require("connect-history-api-fallback");
const redis_io_adapter_1 = require("./redis-io-adapter");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(compression());
    app.setGlobalPrefix('api');
    app.useWebSocketAdapter(new redis_io_adapter_1.RedisIoAdapter(app));
    app.enableCors();
    app.use(history({
        index: '/',
        rewrites: [
            {
                from: /(^\/api\/|^\/api-json\/).*$/,
                to: function (context) {
                    return context.parsedUrl.path;
                }
            }
        ]
    }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Chart example')
        .setDescription('The chart API description')
        .setVersion('1.0')
        .addTag('app')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map