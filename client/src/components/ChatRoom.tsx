import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

interface ChatRoomProps {
  username: string;
  roomId: string;
  leaveRoomCallback: any;
}

const ChatRoom = (props: ChatRoomProps) => {
  const { username, roomId, leaveRoomCallback } = props;

  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  
  const basePath: string  = `ws://${import.meta.env.VITE_SERVER_PATH}:${import.meta.env.VITE_SERVER_PORT}`;
  const parameters: string = `?username=${username}&roomId=${roomId}`;

  const { sendMessage, lastMessage, getWebSocket } = useWebSocket(
    basePath + parameters
  );

  useEffect(() => {
    if (lastMessage != undefined) {
      setMessages([...messages, lastMessage?.data]);
    }
  }, [lastMessage]);

  const leaveRoom = () => {
    getWebSocket()?.close();
    leaveRoomCallback();
  };

  const handleCurrentMessageChange = (event: any) => {
    setCurrentMessage(event.target.value);
  };

  const submitMessage = () => {
    sendMessage(currentMessage);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className=" flex flex-row justify-between">
        <button onClick={leaveRoom}>Leave Room</button>
        <h1 className="text-left">Room: {roomId}</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message: string, index: number) => {
          return <h3 key={index}>{message}</h3>;
        })}
      </div>
      <div className="">
        <input onChange={handleCurrentMessageChange} className=""></input>
        <button onClick={submitMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
