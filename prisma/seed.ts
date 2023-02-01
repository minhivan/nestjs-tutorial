import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// const userData: Prisma.userCreateInput[] = [
//     {
//         address: '0xfeFd4C08f6B8e2380a324f4Bc63D26F16085ab23',
//         balance: 10,
//     },
//     {
//         address: '0x9027969be416A9f55b331fd96A026e9Fb44670FF',
//         balance: 20,
//     },
//     {
//         address: '0x9C810f744A9D2f06cf78c01842763D44A04f4e3b',
//         balance: 30,
//     },
//     {
//         address: '0x81d7187f2FFe9dFC951D4d3b2C2B791Be7A08b1b',
//         balance: 50,
//     },
//     {
//         address: '0xfab7B5D9ed65A861581aACDe5CD34338C940304A',
//         balance: 12,
//     },
// ]

// async function main() {
//     console.log(`Start seeding ...`)
//     for (const u of userData) {
//         const user = await prisma.user.create({
//             data: u,
//         })
//         console.log(`Created user with id: ${user.id}`)
//     }
//     console.log(`Seeding finished.`)
// }

// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })