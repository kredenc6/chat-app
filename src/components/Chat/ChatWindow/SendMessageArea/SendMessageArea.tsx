import React, { useState } from "react";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, writtenMsg: string) => void;
}

const SendMessageArea = ({ handleSubmit }: Props) => {
  const [writtenMsg , setWrittenMsg] = useState("");
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value: string = event.target.value;
    setWrittenMsg(value);
  };

  const submitOnEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === "Enter") {
      e.preventDefault();
      const bttNode = document.getElementById("sendBtt");
      if(bttNode) bttNode.click();
    }
  };

  return(
    <form
      id="sendMessageContainer"
      onSubmit={ (e) => {
        handleSubmit(e, writtenMsg );
        setWrittenMsg("");
        }
      }
    >
      <textarea
        value={ writtenMsg }
        onChange={ handleChange }
        onKeyDown={ submitOnEnter }
        rows={3}
        placeholder="Type a message..."
        spellCheck="false"
      >
      </textarea>
      <button id="sendBtt">SEND</button>
    </form>
  );
}

export default SendMessageArea;