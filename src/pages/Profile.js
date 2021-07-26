import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../components/Header";
import UserProfile from "../components/profile";
import * as ROUTES from "../constants/routes";
import { getUserByUsername } from "../services/firebase";

const Profile = () => {
  const { username } = useParams();
  const [userExists, setUserExists] = useState(false);
  const [user, setUser] = useState(null);

  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);
      if (user.username) {
        setUser(user);
        setUserExists(true);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }
    console.log(user);
    checkUserExists();
  }, []);

  return userExists ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
};

export default Profile;
