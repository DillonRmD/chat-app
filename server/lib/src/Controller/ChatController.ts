import { Server, ServerWebSocket } from "bun";
import Room from "../BusinessObject/Room";
import { ChatGateway } from "../Gateway/ChatGateway";
import { getPrismaClient } from "@prisma/client/runtime/library";

export class ChatController {

  private chatGateway: ChatGateway;

  public constructor() {
    this.chatGateway = new ChatGateway();
  }

  public initialize(request: Request, server: Server): boolean {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");
    const roomId = url.searchParams.get("roomId");
    if (!username || !roomId) {
      return false;
    }

    const successfulUpgrade = server.upgrade(request, {
      data: { username, roomId },
    });

    return successfulUpgrade;
  }

  public async onOpen(
    websocketConnection: ServerWebSocket<{ username: string; roomId: string }>,
    server: Server
  ) {
    const room = await this.chatGateway.createRoom(websocketConnection.data.roomId);
    if (!room) {
      console.error('failed to create room');
      return;
    }

    const user = this.chatGateway.createUser(websocketConnection.data.username, room);

    websocketConnection.subscribe(websocketConnection.data.roomId);
    server.publish(websocketConnection.data.roomId, `${websocketConnection.data.username} has entered the chat`);
  }

  public onMessage(
    websocketConnection:  ServerWebSocket<{ username: string; roomId: string }>,
    message: string | Buffer,
    server: Server
  ) {
    server.publish(websocketConnection.data.roomId, `${websocketConnection.data.username}: ${message}`);
  }

  public onClose(websocketConnection:  ServerWebSocket<{ username: string; roomId: string }>, server: Server) {
    websocketConnection.unsubscribe(websocketConnection.data.roomId);
    server.publish(websocketConnection.data.roomId, `${websocketConnection.data.username} has left the chat`);
  }
}
