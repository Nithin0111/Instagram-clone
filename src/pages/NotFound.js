import React, { useEffect } from "react";
import Header from "../components/Header";
const NotFound = () => {
  useEffect(() => {
    document.title = "404 - NotFound!";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">404 Not Found!</p>
      </div>
    </div>
  );
};

export default NotFound;
