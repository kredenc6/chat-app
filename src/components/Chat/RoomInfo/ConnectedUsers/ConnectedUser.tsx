import React from "react";
import ActivityDot from "../../ChatWindow/RoomName/ActivityDot";

interface Props {
  name: string;
  isUserIdle: boolean;
}

const ConnectedUser = ({ name, isUserIdle }: Props) => {
  return (
    <li>
      <ActivityDot isUserIdle={ isUserIdle } />
      { name }
    </li>
  );
};

export default ConnectedUser;