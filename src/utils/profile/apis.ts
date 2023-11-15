import { db } from "../../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { IProfile } from "../../store/profileReducer";

class ProfileAPI {
  static get = async (uid: string) => {
    const docRef = doc(db, `users/${uid}/profile/${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as IProfile;
    } else {
      return undefined;
    }
  };

  static update = async (uid: string, data: IProfile) => {
    const docRef = doc(db, `users/${uid}/profile/${uid}`);
    await setDoc(docRef, data);
    return data;
  };
}

export default ProfileAPI;
