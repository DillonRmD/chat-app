import { ChatController } from "./Controller/ChatController";

const chatController = new ChatController();

const server = Bun.serve<{ username: string; roomId: string }>({
  port: 8080,
  fetch(req, server) {
    const isSuccess = chatController.initialize(req, server);
    if (!isSuccess) {
      return new Response("Websocket connection failed", {status:400});
    }

    return undefined;
  },
  websocket: {
    open(ws) {
      chatController.onOpen(ws, server);
    },
    message(ws, message) {
      chatController.onMessage(ws, message, server);
    },
    close(ws) {
      chatController.onClose(ws, server);
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
