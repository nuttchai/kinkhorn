import React from "react";
import styled from "styled-components";

interface Props {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  radius: string
  width: string;
}

const Float = styled.div`
  position:fixed;
	width:60px;
	height:60px;
	bottom:30px;
	right:25px;
	// background-color:black;
	// color:#FFF;
	border-radius:50px;
	// text-align:center;
	box-shadow: 2px 2px 3px #999;
`;

const Button: React.FC<Props> = ({ 
    border,
    color,
    children,
    height,
    onClick, 
    radius,
    width
  }) => { 
  return (
    <Float>
      <button
        onClick={onClick}
        style={{
           backgroundColor: color,
           border,
           borderRadius: radius,
           height,
           width
        }}
      >
      <i className="fas fa-shopping-basket"/>
      </button>
    </Float>
  );
}

export default Button;