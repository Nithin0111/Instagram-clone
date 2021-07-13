import React, { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - NotFound!";
  }, []);

  return (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Not Found!</p>
      </div>
    </div>
  );
};

export default NotFound;
