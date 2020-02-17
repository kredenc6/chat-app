import React, { useState, useEffect } from "react";
import Credential from "./Credential";
import { CheckIcon, CrossIcon, RightArrow } from "svgs/svgs";

interface Props {
  name: { value: string, isValid: boolean, isVerified?: boolean, isBeingVerified?: boolean };
  inputName: string;
  dispatch: React.Dispatch<any>;
}

const InputLine = ({ name, inputName, dispatch }: Props) => {
  const [rightArrowStyle, setRightArrowStyle] = useState({ opacity: 0, transform: "translateX(-1rem)" });
  const [crossIconStyle, setCrossIconStyle] = useState({ stroke: "#f00" });
  const [isNameOK, setIsNameOK] = useState(false);

  const handleFocus = () => {
    setRightArrowStyle({ opacity: 1, transform: "translateX(0)" });
  }
  
  const handleBlur = () => {
    setRightArrowStyle({ opacity: 0, transform: "translateX(-1rem)" });
  }

  useEffect(() => {
    setIsNameOK(() => {
      if(inputName === "userName") {
        if(name.isValid && name.isVerified) return true;
        else if(name.isValid && !name.isVerified) {
          return false;
        }
        else return false;
      }
      if(inputName === "roomName") {
        if(name.isValid) return true;
        return false;
      }
      return false;
    });

    setCrossIconStyle(() => {
      if(inputName === "userName") {
        if(name.isValid && !name.isVerified) return { stroke: "#ee0" };
      }
      return { stroke: "#f00" };
    });
  },[inputName, name]);

  return(
    <div>
      <RightArrow styles={ rightArrowStyle } />
      <Credential
        inputValue={ name.value }
        inputName={ inputName }
        handleFocus={ handleFocus }
        handleBlur={ handleBlur }
        dispatch= { dispatch }
      />
      <span className="verified">
        { name.isBeingVerified ?
          <div className="lds-facebook"><div></div><div></div><div></div></div>
          :
            isNameOK ?
            <CheckIcon />
            : 
            <CrossIcon styles={ crossIconStyle } />
        }
      </span>
    </div>
  );
}

export default InputLine;