/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";

const Image = props => {
  if (!props.src) return null;
  return (
    <img
      style={{
        objectFit: "contain",
        boxSizing: "border-box",
        display: "inline-block",
        overflow: "hidden",
        width: "initial",
        height: "initial",
        background: "none",
        opacity: "1",
        border: "0px",
        margin: "0px",
        padding: "0px",
        position: "relative",
        maxWidth: "100%",
        width: "100px",
        height: "100px",
      }}
      {...props}
    />
  );
};

export default Image;
