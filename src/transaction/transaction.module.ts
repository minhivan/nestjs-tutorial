import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ClientsModule, Transport} from "@nestjs/microservices";
import { TransactionController } from './transaction.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TransactionTrackingConsumer}  from "./transaction.consumer";
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        DatabaseModule,
        UsersModule,
        ClientsModule.register([
            {
                name: 'TRACKING_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'tracking',
                        brokers: [process.env.KAFKA],
                        ssl: true,
                        sasl: {
                            mechanism: 'plain', // scram-sha-256 or scram-sha-512
                            username: process.env.KAFKA_KEY,
                            password: process.env.KAFKA_PRIVATE
                        },
                    },

                    consumer: {
                        groupId: 'tracking_service-group'
                    }
                }
            },
        ])
    ],
    controllers: [TransactionController, TransactionTrackingConsumer],
    providers: [TransactionService, UsersService]
})

export class TransactionModule {}