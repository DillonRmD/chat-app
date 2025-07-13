import { ChangeEvent, useState } from "react";

interface JoinPageProps {
  submissionCallback: any;
}

const JoinPage = (props: JoinPageProps) => {
  const { submissionCallback } = props;

  const [usernameFieldHasError, setUsernameFieldHasError] =
    useState<boolean>(true);
  const [username, setUsername] = useState<string>("");

  const [roomIdFieldHasError, setRoomIdFieldHasError] = useState<boolean>(true);
  const [roomId, setRoomId] = useState<string>("");

  const handleButtonSubmit = () => {

    if (roomIdFieldHasError || usernameFieldHasError) {
      alert('Room ID and Username Cannot Be Empty!');
      return;
    }
    
    submissionCallback(username, roomId);
  };

  const handleRoomIDChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setRoomIdFieldHasError(newValue === "");
    setRoomId(newValue);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setUsernameFieldHasError(newValue === "");
    setUsername(newValue);
  };

  return (
    <div className="text-center">
      <h1 className="font-medium text-indigo-500">
        Enter Room ID and Username
      </h1>
      <div className="flex flex-col">
        <input
          onChange={handleRoomIDChange}
          placeholder="Room ID"
          className="rounded-lg text-slate-950 p-1.5 m-1"
        ></input>
        <input
          onChange={handleUsernameChange}
          placeholder="Username"
          className="rounded-lg text-slate-950 p-1.5 m-1"
        ></input>
        <button onClick={handleButtonSubmit} className="hover m-1">
          Enter
        </button>
      </div>
    </div>
  );
};

export default JoinPage;
