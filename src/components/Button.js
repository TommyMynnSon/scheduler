import React from "react";

import classNames from 'classnames';

import "components/Button.scss";

export default function Button(props) {
   const { onClick } = props;

   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (
      <button
         className={buttonClass}
         onClick={onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}
