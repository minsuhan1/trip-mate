import { db } from "../../services/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { ITripData, ITriplist } from "../../store/triplistReducer";

class TripAPI {
  // 여행 목록 가져오기
  static get = async (uid: string) => {
    const querySnapshot = await getDocs(collection(db, `users/${uid}/trips`));

    const trips: ITriplist = []; // 여행 일정 목록

    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, data: doc.data() as ITripData });
      });
      return trips;
    } else {
      return [];
    }
  };

  // 여행 추가하기
  static add = async (uid: string, data: ITripData) => {
    // Add a new document with a generated id.
    const newTripRef = doc(collection(db, `users/${uid}/trips`));
    await setDoc(newTripRef, data);

    // 생성된 여행 id와 data를 반환
    return { id: newTripRef.id, data };
  };

  // 여행 수정하기

  // 여행 삭제하기
  static delete = async (uid: string, id: string) => {
    await deleteDoc(doc(db, `users/${uid}/trips/${id}`));

    return id;
  };
}

export default TripAPI;
