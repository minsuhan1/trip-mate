import { db } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ProfileInfo } from "../../store/profileReducer";

export const updateProfile = async (uid: string, data: ProfileInfo) => {
  const docRef = doc(db, `${uid}/profile`);
  await setDoc(docRef, data);
  return data;
};
