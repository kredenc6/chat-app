import React from "react";
import InputLine from "./InputLine";
import IssueMsg from "./IssueMsg/IssueMsg";
import "./joinRoom.css";

interface Props {
  userName: { value: string, isValid: boolean, isVerified: boolean, isBeingVerified: boolean };
  roomName: { value: string, isValid: boolean };
  isServerDC: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  dispatch: React.Dispatch<any>;
}

const JoinRoom = ({ userName, roomName, isServerDC, handleSubmit, dispatch }: Props) => {
  return(
    <div id="joinRoom">
      <h1>join room</h1>
      <IssueMsg
        isServerDC={ isServerDC }
      />
      <form id="joinForm" onSubmit={ handleSubmit }>
        <p id="validationMsg">Only letters, numbers and an underscore are permitted. Min lenght: 3, max lenght: 10.</p>
        <InputLine
          name={ userName }
          inputName="userName"
          dispatch= { dispatch }
          />
        <InputLine
          name={ roomName }
          inputName="roomName"
          dispatch= { dispatch }
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default JoinRoom;