import React from "react";

export const CheckIcon = () => {
  return(
    <svg
      width="100"
      height="100"
      version="1.1"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="checkIcon"
      >
        <polyline
          transform="matrix(.26965 0 0 .26965 -19.028 -23.859)"
          points="416 128 192 384 96 288"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={ { stroke: "#090", strokeWidth: "3rem" } }
        />
    </svg>
  );
};


interface CrossIconProps {
  styles: {
      stroke: string;
    }
}

export const CrossIcon = ( { styles }: CrossIconProps ) => {
  const style = { fill: "none", stroke: "#f00", strokeLineCap: "round", strokeLineJoin: "round", strokeWidth: ".8rem" };
  return(
    <svg
      width="100"
      height="100"
      version="1.1"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="crossIcon"
    >
      <line
        x1="91.51" 
        x2="8.4899"
        y1="91.51"
        y2="8.4899"
        style={ { ...style, ...styles } }
      />
      <line
        x1="91.51"
        x2="8.4899"
        y1="8.4899"
        y2="91.51"
        style={ { ...style, ...styles } }/>
    </svg>
  );
};


interface RightArrowProps {
  styles: {
    opacity: number;
    transform: string;
  };
}

export const RightArrow = ({ styles }: RightArrowProps) => {
  return(
    <svg
      width="100"
      height="100"
      version="1.1"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="rightArrow"
      style={ { ...styles } }
    >
      <path d="m68.862 49.982-62.874-35.921c-4.65-2.6587-4.65-6.9579 0-9.5884 4.65-2.6304 12.169-2.6304 16.819 0l71.234 40.701c4.5016 2.5739 4.6006 6.7034 0.34628 9.3621l-71.531 40.984c-2.325 1.3294-5.3921 1.9799-8.4096 1.9799-3.0176 0-6.0846-0.65054-8.4096-1.9799-4.65-2.6587-4.65-6.9579 0-9.5884z" />
    </svg>
  );
};


export const DownArrow = () => {
  const style: { [key: string ]: string } = { stroke: "#000" };
  return(
    <svg
      width="100"
      height="100"
      version="1.1"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="downArrow"
    >
      <polyline
        transform="matrix(.26364 0 0 .26364 -17.636 -17.446)"
        points="112 268 256 412 400 268"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="40px"
        style={ style }
      />
      <line
        x1="49.855"
        x2="49.855"
        y1="85.9"
        y2="8.9175"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10px"
        style={ style }
      />
    </svg>
  );
};