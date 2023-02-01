import { Module } from '@nestjs/common';
import appConfig from 'src/config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { TransactionService } from './transaction/transaction.service';
import { TransactionModule } from './transaction/transaction.module';
import { UsersService } from "./users/users.service";

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
        UsersModule, DatabaseModule, TransactionModule],
    controllers: [AppController],
    providers: [AppService, TransactionService, UsersService]
})

export class AppModule {}
