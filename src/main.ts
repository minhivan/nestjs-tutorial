import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    await app.listen(configService.get('app.port'));
}
bootstrap();

async function bootstrapKafka() {
    const app = await NestFactory.createMicroservice(AppModule, {
        name: 'TRACKING_SERVICE',
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: [process.env.KAFKA],
                ssl: true,
                sasl: {
                    mechanism: 'plain', // scram-sha-256 or scram-sha-512
                    username: process.env.KAFKA_KEY,
                    password: process.env.KAFKA_PRIVATE
                },
            },
            consumer: {
                groupId: 'tracking-consumer'
            }
        },
    });
    await app.listen();
}
// bootstrapKafka();
