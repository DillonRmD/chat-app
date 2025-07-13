import Room from "./BusinessObject/Room";

const server = Bun.serve<{username: string, roomId: string}>({
  port: 8080,
  fetch(req, server) {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    const roomId = url.searchParams.get("roomId");
    if (!username || !roomId) {
      return new Response("Invalid HTTP Request", { status: 401 });
    }

    const successfulUpgrade = server.upgrade(req, {data : { username, roomId }});
    return successfulUpgrade
      ? undefined
      : new Response("Web Socket upgrade error", {status: 400});
  },
  websocket: {
    open(ws) {
      const room = new Room();
      room.setId(ws.data.roomId);
      
      ws.subscribe(room.getId());
      server.publish(room.getId(), `${ws.data.username} has entered the chat`);
    },
    message(ws, message) {
      server.publish(ws.data.roomId, `${ws.data.username}: ${message}`);
    },
    close(ws) {
      ws.unsubscribe(ws.data.roomId);
      server.publish(ws.data.roomId, `${ws.data.username} has left the chat`);
    },
  }
});

console.log(`Listening on ${server.hostname}:${server.port}`);
