import { persistor } from "../..";
import { auth } from "../../services/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOutFirebase,
} from "firebase/auth";

// Google 로그아웃
export const signOut = () => {
  signOutFirebase(auth)
    .then(() => {})
    .catch((error) => {
      throw new Error("signOutFirebase Error");
    });

  // redux persist가 localStorage에 저장한 상태 clear
  setTimeout(async () => {
    await persistor.purge();
  }, 200);
};

// Google 로그인
export const signIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log("singIn Error");
    });
};