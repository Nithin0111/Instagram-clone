import React from "react";
import PropTypes from "prop-types";

const Image = ({ src, caption }) => {
  return (
    <div className="w-full h-full">
      <img src={src} alt={caption} />
    </div>
  );
};

export default Image;

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
