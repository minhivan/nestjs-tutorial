import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: DatabaseService) {}

    async create(body: any) {
        console.log(body);
        const result = await this.prismaService.user.create({
            data: {
                address: '0xfeFd4C08f6B8e2380a324f4Bc63D26F16085ab23',
                balance: 10,
            },
        });
        console.log(result);
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
