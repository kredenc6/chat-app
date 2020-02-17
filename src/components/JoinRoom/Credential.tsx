import React from "react";

interface Props {
  inputValue: string;
  inputName: string;
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  dispatch: React.Dispatch<any>;
}

const Credential = ({ inputValue, inputName, handleFocus, handleBlur, dispatch }: Props) => {
  
  return(
    <input
      value={ inputValue }
      name={ inputName }
      type="text"
      className="joinRoomInput"
      placeholder={ inputName }
      pattern="[_a-zA-Z0-9]{3,10}"
      spellCheck="false"
      required
      onChange={ (e) => dispatch(
        {
          type: "credentialValue",
          inputName: inputName,
          value: e.currentTarget.value,
          isValid: e.currentTarget.validity.valid
        }
      )}
      onFocus={ handleFocus }
      onBlur={ handleBlur }
    />
  );
}

export default Credential;