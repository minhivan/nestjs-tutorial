import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { ClientKafka } from '@nestjs/microservices';


@Controller('transactions')
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService,
        @Inject('TRACKING_SERVICE')
        private readonly client: ClientKafka,
    ) {}

    @Get()
    getListTransactions() {
        try {
            return this.transactionService.getAllTransactions();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    @Get(':hash')
    retrieveTransaction(@Param('hash') hash: string) {
        try {
            return this.transactionService.retrieveTransaction(hash);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    @Post('tracking')
    createTrackingTransaction(@Body() trackingData: CreateTransactionDto) {
        try {
            console.log(trackingData);
            return this.client.emit('tracking', trackingData);
        } catch (e) {
            console.log(e);
            throw e;

        }
    }

    @Post()
    createTransaction (@Body() data: CreateTransactionDto) {
        try {
            console.log(data);
            return this.transactionService.trackingTransaction(data);
        } catch (e) {
            console.log(e);
            throw e;

        }
    }
}

