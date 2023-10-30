import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { IChecklistItem } from "../../store/checklistReducer";

class ChecklistAPI {
  // 체크리스트 목록 가져오기
  static get = async (uid: string, tripId: string) => {
    const querySnapshot = await getDocs(
      collection(db, `users/${uid}/trips/${tripId}/checklist`)
    );

    if (querySnapshot.docs.length > 0) {
      let checklist: IChecklistItem[] = [];
      querySnapshot.forEach((doc) => {
        checklist = doc.data().data as IChecklistItem[]; // 체크리스트 목록
      });
      return checklist;
    } else {
      return [];
    }
  };

  // 체크리스트 업데이트하기
  static set = async (uid: string, data: IChecklistItem[], tripId: string) => {
    try {
      await setDoc(doc(db, `users/${uid}/trips/${tripId}/checklist`, tripId), {
        data: data,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  };
}

export default ChecklistAPI;
