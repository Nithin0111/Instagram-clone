import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//Here import the seed file
// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyB2VMO9CvBHa_eW6g08xJiggLNvK6eZQjM",
  authDomain: "instagram-clone-6ccb4.firebaseapp.com",
  projectId: "instagram-clone-6ccb4",
  storageBucket: "instagram-clone-6ccb4.appspot.com",
  messagingSenderId: "300911843791",
  appId: "1:300911843791:web:df1dcf1b3bef6e3f30daba",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//here call the seed file only once
// seedDatabase(firebase);

export { firebase, FieldValue };
