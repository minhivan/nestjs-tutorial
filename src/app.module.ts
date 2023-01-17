import { Module } from '@nestjs/common';
import appConfig from 'src/config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

// console.log(appConfig);
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                appConfig
            ],
            envFilePath: ['.env'],
        }),
        UsersModule, DatabaseModule],
    controllers: [AppController],
    providers: [AppService]
})

export class AppModule {}
