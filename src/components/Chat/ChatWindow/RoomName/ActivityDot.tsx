import React from "react";

interface Props {
  isUserIdle: boolean;
}

const ActivityDot = ({ isUserIdle }: Props) => {
  const className = `activeStatus ${ isUserIdle ? "idle" : "active" }`;
  return(
    <div id="idleUser" className={ className }></div>
  );
};

export default ActivityDot;