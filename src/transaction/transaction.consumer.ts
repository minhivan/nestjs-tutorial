import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionService } from "./transaction.service";


interface TrackingTransactionInterface {
    transaction_hash: string;
    address: string;
}

@Controller()
export class TransactionTrackingConsumer {
    constructor(
        private transactionService: TransactionService
    ) {}


    @MessagePattern('tracking')
    async TrackingTransaction(@Payload() message: TrackingTransactionInterface) {
        try {
            console.log(`Receive new message with transaction ${message.transaction_hash}`);
            return await this.transactionService.trackingTransaction(message);
        } catch (e) {
            console.log(e)
        }
    }
}