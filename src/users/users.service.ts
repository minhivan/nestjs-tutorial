import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';


interface CreateUserInterface {
    address: string;
    email: string;
}


@Injectable()
export class UsersService {
    constructor(private readonly prismaService: DatabaseService) {}

    async create(body: CreateUserInterface) {
        console.log(body);
        const result = await this.prismaService.user.create({
            data: {
                ...body,
                balance: 0,
            },
        });
        return result;
    }

    async findAll() {
        const result = await this.prismaService.user.findMany();
        console.log(result);
        return result;
    }

    async findOne(id: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: Number(id)
            },
        })
        return user;
    }


    async findUserByAddress(address: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                address
            }
        })

        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    async remove(id: number) {
        await this.prismaService.user.delete({
            where: {
                id
            },
        })
        return;
    }
}
