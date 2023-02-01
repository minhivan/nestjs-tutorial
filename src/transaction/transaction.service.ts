import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import Web3 from 'web3';
import {_isERC20Log} from "../common/utils";
import {UsersService} from "../users/users.service";


interface CreateTransactionTrackingInterface {
    address: string;
    transaction_hash: string;
}

@Injectable()
export class TransactionService {
    private web3 = new Web3('wss://bsc-testnet.nodereal.io/ws/v1/37790cc6643f4eababd9e4210712f96c');
    constructor(
        private readonly prismaService: DatabaseService,
        private readonly userService: UsersService
    ) {
    }
    async create(body: CreateTransactionTrackingInterface) {

    }

    async getAllTransactions() {
        const result = await this.prismaService.transaction.findMany();
        console.log(result);
        return result;
    }

    async retrieveTransaction(hash: string) {
        console.log(hash);
        const result = await this.prismaService.transaction.findFirst({
            where: { transaction_hash: hash }
        })
        console.log(result);
        return result;
    }

    async trackingTransaction(message: CreateTransactionTrackingInterface) {
        console.log(typeof message);
        const txReceipt = await this.web3.eth.getTransactionReceipt(message.transaction_hash);
        let amount = null;

        // check user first
        const user = await this.userService.findUserByAddress(message.address);

        if (!user) {
            throw new Error('User not found');
        }

        return await this.prismaService.$transaction(async (tx) => {

            for (let log of txReceipt.logs) {
                if (_isERC20Log(log)) {
                    amount = this.web3.utils.hexToNumberString(log.data);
                    console.log("ERC20 token amount: ", amount);
                    console.log("ERC20 token contract: ", log.address);

                }
            }



            const transaction = await tx.transaction.create({
                data: {
                    ...message,
                    amount: Number(this.web3.utils.fromWei(amount))
                },
            })

            console.log(transaction);

            if (!transaction.id) {
                throw new Error('Error when save transaction');
            }

            const userBalance = await tx.user.update({
                data: {
                    balance: {
                        increment: Number(this.web3.utils.fromWei(amount))
                    }
                },
                where: {
                    email: user.email
                }
            })
            console.log("===========================");
            console.log(userBalance);
            return userBalance;
        },{
            maxWait: 1000, // default: 2000
            timeout: 10000, // default: 5000
        })
    }
}
