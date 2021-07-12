import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

const SignUp = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = emailAddress === "" || password === "";

  const handleSignUp = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExist(userName);

    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        await createdUserResult.user.updateProfile({
          displayName: userName,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: userName.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setUserName("");
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setError("User name is already taken! please try another one");
    }
  };

  useEffect(() => {
    document.title = "SignUp - Instagram";
  }, []);
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="Iphone pic" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 mb-4 border border-gray-primary rounded">
          {" "}
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignUp} method="post">
            <input
              type="text"
              aria-label="Enter your username"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
            <input
              type="text"
              aria-label="Enter your full name"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            <input
              type="email"
              aria-label="Enter your email address"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
            />
            <input
              type="password"
              aria-label="Enter your password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Already have an account? {` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
