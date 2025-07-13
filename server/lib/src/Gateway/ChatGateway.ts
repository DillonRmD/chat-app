import { PrismaClient } from "@prisma/client";
import Room from "../BusinessObject/Room";
import User from "../DataStructure/User";

export class ChatGateway {
    private prisma: PrismaClient;

    public constructor() {
        this.prisma = new PrismaClient();
    }

    public async createRoom(roomId: string): Promise<Room | null> {
        const roomQuery = await this.prisma.room.create({
            data: {
                id: roomId,
                user: undefined
            }
        }).then(async () => {
            await this.prisma.$disconnect();
        }).catch(async (e) => {
            console.error(e)
            await this.prisma.$disconnect();

            return null;
        });

        const room = new Room();
        room.setId(roomId);

        return room;
    }

    public async createUser(username: string, room: Room): Promise<User | null> {
        const userQuery = await this.prisma.user.create({
            data: {
                name: username,
                roomId: room.getId()
            }
        }).then(async () => {
            await this.prisma.$disconnect();
        }).catch(async (e) => {
            console.error(e)
            await this.prisma.$disconnect();

            return null;
        });

        const user = new User(username);
        
        return user;
    }
}