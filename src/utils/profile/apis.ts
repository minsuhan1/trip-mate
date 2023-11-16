import { db } from "../../services/firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { IProfile } from "../../store/profileReducer";
import TripAPI from "../trip/apis";

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

  static deleteAccount = async (uid: string, tripIDs: string[]) => {
    // 모든 여행 계획 삭제
    let deletePromises: Array<Promise<any>> = [];
    tripIDs.forEach((tripId, idx) => {
      deletePromises.push(TripAPI.delete(uid, tripId));
    });
    deletePromises.push(deleteDoc(doc(db, `users/${uid}/profile/${uid}`)));
    await Promise.all(deletePromises);

    await deleteDoc(doc(db, `users/${uid}`));
  };
}

export default ProfileAPI;
