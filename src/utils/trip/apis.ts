import { db } from "../../services/firebase";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
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
  static update = async (
    uid: string,
    id: string,
    data: { [key: string]: any }
  ) => {
    await updateDoc(doc(db, `users/${uid}/trips/${id}`), data);

    return { id: id, data: data };
  };

  // 여행 삭제하기
  static delete = async (uid: string, id: string) => {
    // 1. 하위 컬렉션의 문서들 모두 삭제

    // 삭제한 컬렉션들
    const collectionNames = ["schedule", "checklist", "expenses"];
    // 삭제할 문서들을 가져오는 프로미스들의 배열
    let getDocsPromises: Array<
      Promise<QuerySnapshot<DocumentData, DocumentData>>
    > = [];
    // 문서들을 삭제하는 프로미스들의 배열
    let deletePromises: Array<Promise<void>> = [];
    // 삭제할 문서들의 path
    let refs: Array<string> = [];

    // 삭제할 컬렉션들에서 각각의 문서 집합을 가져오기
    collectionNames.forEach((name) => {
      getDocsPromises.push(
        getDocs(collection(db, `users/${uid}/trips/${id}/${name}`))
      );
    });
    // 각 컬렉션에서 삭제할 문서들
    // ex) [[스케줄1, 스케줄2, ...], [지출1, 지출2, ...], ...]
    const res = await Promise.all(getDocsPromises);

    // 삭제할 문서들의 path들을 배열에 추가
    res.forEach((querySnaps) => {
      if (querySnaps.docs.length > 0) {
        querySnaps.docs.forEach((docs) => {
          refs.push(docs.ref.path);
        });
      }
    });

    // 배열 안의 문서들을 동시에 삭제
    refs.forEach((ref) => {
      deletePromises.push(deleteDoc(doc(db, ref)));
    });
    await Promise.all(deletePromises);

    // 여행 문서 삭제
    await deleteDoc(doc(db, `users/${uid}/trips/${id}`));

    return id;
  };
}

export default TripAPI;
