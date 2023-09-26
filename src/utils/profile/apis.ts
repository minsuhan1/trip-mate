import { db } from "../../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ProfileInfo } from "../../store/profileReducer";

class ProfileAPI {
  static get = async (uid: string) => {
    const docRef = doc(db, `${uid}/profile`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      return docSnap.data() as ProfileInfo;
    } else {
      return undefined;
    }
  };

  static update = async (uid: string, data: ProfileInfo) => {
    const docRef = doc(db, `${uid}/profile`);
    await setDoc(docRef, data);
    return data;
  };
}

export default ProfileAPI;
