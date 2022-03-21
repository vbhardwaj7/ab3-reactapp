import React from "react";
import NextImage from "next/image";
import { chakra } from "@chakra-ui/react";

const Img = chakra(NextImage, {
  shouldForwardProp: prop => {
    return [
      "width",
      "height",
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader",
      "style",
      "layout",
      "objectFit",
    ].includes(prop);
  },
});

const Image = props => {
  if (!props.src) return null;
  return <Img {...props} />;
};

export default Image;
