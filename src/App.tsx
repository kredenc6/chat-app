import React, { useEffect, useReducer } from 'react';
import './App.css';
import { createSocket } from "./createSocket";
import JoinRoom from "./components/JoinRoom/JoinRoom";
import ChatRoom from "./components/Chat/ChatRoom";
const SERVER_URL = "http://localhost:8889";
const VERIFICATION_DELAY = 2000;

interface Action {
  type: string;
  [key: string]: any;
};

interface State {
  socket: SocketIOClient.Socket;
  isServerDC: boolean;
  userName: { value: string, isValid: boolean, isVerified: boolean, isBeingVerified: boolean };
  roomName: { value: string, isValid: boolean };
  isLoggingIn: boolean;
  loggedInToRoom: string;
  timeoutID: { id: number, userName: string };
};

const appReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "socket":
      return {
        ...state,
        socket: action.value
      };

    case "isServerDC":
      return {
        ...state,
        isServerDC: action.value
      };

    case "credentialValue":
      const inputName: "userName" | "roomName" = action.inputName;
      if(action.inputName === "userName" || action.inputName === "roomName") {
        const data: { [key: string]: any } = {};
        for(const key in action) {
          if(key !== "type" && key !== "inputName") data[key] = action[key];
        }
        return {
          ...state,
          [inputName]: { ...state[inputName], ...data }
        };
      }
      else {
        console.warn(`Reducer received non-compatible inputName in "credentialValue" case.`);
        return state;
      }

    case "isLoggingIn":
      return {
        ...state,
        isLoggingIn: action.value
      };

    case "loggedInToRoom":
      return {
        ...state,
        loggedInToRoom: action.value
      };

    case "timeoutID":
      return {
        ...state,
        timeoutID: action.value
      }

    default:
      console.warn(`Reducer received unknown action type: "${action.type}".`);
      throw new Error();
  }
};

const initialState: State = {
  socket: createSocket(SERVER_URL),
  isServerDC: true,
  userName: { value: "", isValid: false, isVerified: false, isBeingVerified: false },
  roomName: { value: "", isValid: false },
  isLoggingIn: false,
  loggedInToRoom: "",
  timeoutID: { id: -1, userName: "" }
};

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const logoutReset = () => {
    dispatch(
      {
        type: "credentialValue",
        inputName: "userName",
        value: "",
        isValid: false,
        isVerified: false,
        isBeingVerified: false
      });
    dispatch({ type: "credentialValue", inputName: "roomName", value: "", isValid: false});
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!state.userName.isVerified) {
      state.userName.isBeingVerified ?
        console.log(`Please wait a moment. User name "${state.userName.value}" is being verified.`)
        :
        console.log(`Invalid log in credentials. User name "${state.userName.value}" is taken.`);
      return;
    }
    if(state.isLoggingIn) {
      console.log("Please wait. Logging in is in progress.");
      return;
    }

    dispatch({ type: "isLoggingIn", value: true });

    state.socket.off("room joining confirmation"); // remove previous listener
    state.socket.on("room joining confirmation", ({ yes, serverRoomName }: { yes: boolean, serverRoomName: string }) => {
      if(yes) {
        dispatch({ type:"loggedInToRoom", value: serverRoomName });
        dispatch({ type:"isLoggingIn", value: false });
      }
      else console.warn(`Failed to connect to room. User name ${state.userName.value} was probably taken.`);
    });
    state.socket.emit("join room", { roomName: state.roomName.value, userName: state.userName.value });
  }

  // reset state after user logs out of a room
  useEffect(() => {
    if(state.loggedInToRoom) return;
    logoutReset();  
  },[state.loggedInToRoom]);

  // userName verification setup(delay)
  useEffect(() => {
    if(state.timeoutID.userName !== state.userName.value) {
      if(state.userName.isValid) dispatch({ type: "credentialValue", inputName: "userName", isBeingVerified: true });
      else dispatch({ type: "credentialValue", inputName: "userName", isBeingVerified: false });
      
      clearTimeout(state.timeoutID.id);
      const id = window.setTimeout(() => {
        if(state.userName.isValid) state.socket.emit("check userName", state.userName.value);
      }, VERIFICATION_DELAY);
      dispatch({ type: "timeoutID", value: { id, userName: state.userName.value } });
    }
  },[state.userName, state.timeoutID, state.socket]);

  // userName server verification socket listener:
  useEffect(() => {
    state.socket.on("checked userName", (isUserNameFree: boolean) => {
      dispatch({ type: "credentialValue", inputName: "userName", isBeingVerified: false });
      if(isUserNameFree) dispatch({ type: "credentialValue", inputName: "userName", isVerified: true });
      else dispatch({ type: "credentialValue", inputName: "userName", isVerified: false });
    });
    return () => {
      state.socket.off("checked userName");
    }
  }, [state.socket]);

  // connect/disconnect + user logout socket listeners
  useEffect(() => {
    dispatch({ type: "isServerDC", value: state.socket.disconnected });

    state.socket.on("disconnect", () => {
      dispatch({ type: "isServerDC", value: true });
      dispatch({ type: "credentialValue", inputName: "userName", isVerified: false, isBeingVerified: false });
    });
    state.socket.on("connect", () => {
      dispatch({ type: "isServerDC", value: false });
      if(state.userName.isValid) {
        dispatch({ type: "credentialValue", inputName: "userName", isBeingVerified: true });
        state.socket.emit("check userName", state.userName.value);
      }
    });
    state.socket.on("user logged out", () => {
      dispatch({ type: "loggedInToRoom", value: "" });
     });
    return () => {
      state.socket.off("disconnect");
      state.socket.off("connect");
      state.socket.off("user logged out");
    }
  },[state.socket, state.userName]);
  
  // REACT COMPONENT
  return(
    <div id = "app">
      { state.loggedInToRoom ?
        <ChatRoom
          userName={ state.userName.value }
          roomName={ state.roomName.value }
          socket={ state.socket }
        />
      :
        < JoinRoom 
          userName={ state.userName }
          roomName={ state.roomName }
          isServerDC={ state.isServerDC }
          handleSubmit={ handleSubmit }
          dispatch={ dispatch }
        />
      }
    </div>
  );
}

export default App;