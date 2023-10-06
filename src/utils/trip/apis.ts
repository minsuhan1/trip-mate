import { db } from "../../services/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { ITripData, ITriplist } from "../../store/triplistReducer";

class TripAPI {
  // 여행 일정 목록 가져오기
  static get = async (uid: string) => {
    const querySnapshot = await getDocs(collection(db, `users/${uid}/trips`));

    const trips: ITriplist = []; // 여행 일정 목록

    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, data: doc.data() as ITripData });
      });
      return trips;
    } else {
      return undefined;
    }
  };

  // 여행 일정 추가하기
  static add = async (uid: string, data: ITripData) => {
    // Add a new document with a generated id.
    const newTripRef = doc(collection(db, `users/${uid}/trips`));
    await setDoc(newTripRef, data);

    // 생성된 여행 id와 data를 반환
    return { id: newTripRef.id, data };
  };
}

export default TripAPI;
