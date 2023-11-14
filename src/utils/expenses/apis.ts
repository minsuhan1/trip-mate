import { db } from "../../services/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { IExpenseData, IExpenseList } from "../../store/expensesReducer";

class ExpensesAPI {
  // 여행경비 목록 가져오기
  static get = async (uid: string, tripId: string) => {
    const querySnapshot = await getDocs(
      collection(db, `users/${uid}/trips/${tripId}/expenses`)
    );

    const expenseList: IExpenseList = []; // 여행경비 목록

    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        expenseList.push({ id: doc.id, data: doc.data() as IExpenseData });
      });
      return expenseList;
    } else {
      return [];
    }
  };

  // 여행경비 추가하기
  static add = async (uid: string, data: IExpenseData) => {
    // Add a new document with a generated id.
    const newExpenseRef = doc(
      collection(db, `users/${uid}/trips/${data.trip_id}/expenses`)
    );
    await setDoc(newExpenseRef, data);
  };

  // 여행경비 수정하기
  static update = async (
    uid: string,
    tripId: string,
    id: string,
    data: { [key: string]: any }
  ) => {
    await updateDoc(
      doc(db, `users/${uid}/trips/${tripId}/expenses/${id}`),
      data
    );

    return { id: id, data: data };
  };

  // 여행경비 삭제하기
  static delete = async (uid: string, tripId: string, id: string) => {
    await deleteDoc(doc(db, `users/${uid}/trips/${tripId}/expenses/${id}`));

    return id;
  };
}

export default ExpensesAPI;
