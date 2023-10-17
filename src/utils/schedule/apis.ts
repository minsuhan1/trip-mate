import { db } from "../../services/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { IScheduleData, IScheduleList } from "../../store/scheduleReducer";

class ScheduleAPI {
  // 스케줄 목록 가져오기
  static get = async (uid: string, tripId: string) => {
    const querySnapshot = await getDocs(
      collection(db, `users/${uid}/trips/${tripId}/schedule`)
    );

    const scheduleList: IScheduleList = []; // 스케줄 목록

    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        scheduleList.push({ id: doc.id, data: doc.data() as IScheduleData });
      });
      return scheduleList;
    } else {
      return [];
    }
  };

  // 스케줄 추가하기
  static add = async (uid: string, data: IScheduleData) => {
    // Add a new document with a generated id.
    const newScheduleRef = doc(
      collection(db, `users/${uid}/trips/${data.trip_id}/schedule`)
    );
    await setDoc(newScheduleRef, data);

    // 생성된 스케줄 id와 data를 반환
    return { id: newScheduleRef.id, data };
  };

  // 스케줄 수정하기
  static update = async (
    uid: string,
    tripId: string,
    id: string,
    data: { [key: string]: any }
  ) => {
    await updateDoc(
      doc(db, `users/${uid}/trips/${tripId}/schedule/${id}`),
      data
    );

    return { id: id, data: data };
  };

  // 스케줄 삭제하기
  static delete = async (uid: string, tripId: string, id: string) => {
    await deleteDoc(doc(db, `users/${uid}/trips/${tripId}/schedule/${id}`));

    return id;
  };
}

export default ScheduleAPI;
