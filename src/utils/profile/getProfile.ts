import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ProfileInfo } from "../../store/profileReducer";

export const getProfile = async (uid: string) => {
  const docRef = doc(db, `${uid}/profile`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as ProfileInfo;
  } else {
    console.log(docSnap.data());
    return undefined;
  }
};
