import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SocketModule } from './socket/socket.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '119.29.159.51',
      port: 3306,
      username: 'chat',
      password: 'llxhzm.2016',
      database: 'chat',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
      autoLoadEntities: true,
      logging: true,
      retryAttempts: 3,
      maxQueryExecutionTime: 1000
    }),
    SocketModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
