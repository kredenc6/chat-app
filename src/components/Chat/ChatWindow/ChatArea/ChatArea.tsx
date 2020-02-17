import React, { useState, useLayoutEffect, useRef } from "react";
import Message from "./Message/Message";
import { DownArrow } from "svgs/svgs";
import { MessageInfo } from "interfaces/messageInfo";
import Simplebar from "simplebar-react";
import "../../../../../node_modules/simplebar/dist/simplebar.min.css";
const TRANS_TIME = 500;
const defaultDownArrowStyle = { transition: `all ${TRANS_TIME / 1000}s`, bottom: "2.5rem", opacity: 0 };

interface Props {
  userName: string;
  messages: MessageInfo[];
  isScrolledToBottom: boolean;
  setIsScrolledToBottom: React.Dispatch<React.SetStateAction<boolean>>;
}


const ChatArea = ({ userName, messages, isScrolledToBottom, setIsScrolledToBottom }: Props) => {
  const [downArrowStyle, setDownArrowStyle] = useState<any>(defaultDownArrowStyle);
  const [hidden, setHidden] = useState(true);
  const [timeoutID, setTimeoutID] = useState(-1);
  const messageComponents = messages.map(({ fromUser, text }, index) => {
    return <Message key={ index } userName={ userName } fromUser={ fromUser } text={ text } />
  });
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const node = e.nativeEvent.target as HTMLDivElement;
    const isMaxScrolled = Math.round(node.scrollHeight - node.scrollTop) === node.clientHeight;
    setIsScrolledToBottom(isMaxScrolled);
    
    // styling scrollToBottom button:
    if(!isMaxScrolled) {
      if(timeoutID > -1) {
        clearTimeout(timeoutID);
        setTimeoutID(-1);
      }
      setHidden(false);
      // in the next line the setTimeout will push it's callback to the end of event loop -> when setHidden(false) is already applied
      setTimeout(() => setDownArrowStyle({ ...defaultDownArrowStyle, bottom: "3rem", opacity: 1 }));
    }
  };

  const scrollToBottom = (messages: MessageInfo[], chatAreaRef: React.RefObject<HTMLDivElement>) => {
    if(messages.length > 0 && chatAreaRef.current) {
      // @ts-ignore -> the condition above should prevent null values (typescript bug??)
      chatAreaRef.current.lastChild.scrollIntoView();

      // styling scrollToBottom button:
      setDownArrowStyle(defaultDownArrowStyle);
      const id = window.setTimeout(() => setHidden(true), TRANS_TIME);
      setTimeoutID(id);
    }
  };

  // scroll to bottom on incoming message:
  useLayoutEffect(() => {
    if(!isScrolledToBottom) return;
    if(chatAreaRef) scrollToBottom(messages, chatAreaRef);
  },[messages, isScrolledToBottom]);

  return(
    <div id="chatAreaWrapper">
      <Simplebar id="simpleBar" onScroll={ handleScroll }>
        <div id="chatArea" ref={ chatAreaRef }>
          { messageComponents }
        </div>
      </ Simplebar>
      <div id="scrollToBottom"
        hidden={ hidden }
        onClick={ () => {
          if(chatAreaRef) scrollToBottom(messages, chatAreaRef);
        }}
        style={ downArrowStyle }
      >
        < DownArrow />
      </div>
    </div>
  );
}

export default ChatArea;