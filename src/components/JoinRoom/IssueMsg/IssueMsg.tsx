import React from "react";

interface Props {
  isServerDC: boolean;
}

const IssueMsg = ({ isServerDC }: Props) => {

  return(
    <p id="issueMsg" style={ isServerDC ? { color: "red" } : { color: "green" } }>
      { isServerDC ? "Not connected to server." : "Connection to server established." }
    </p>
  );
};

export default IssueMsg;