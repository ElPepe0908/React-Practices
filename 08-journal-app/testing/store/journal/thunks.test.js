import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FireBaseDB } from "../../../src/firebase/config";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe("Pruebas en JournalThunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("startNewNote should create a new blank note", async () => {
    const uid = "TEST_UID";
    getState.mockReturnValue({ auth: { uid: uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        title: "",
        body: "",
        imageUrls: [],
        date: expect.any(Number),
        id: expect.any(String),
      })
    );

    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        title: "",
        body: "",
        imageUrls: [],
        date: expect.any(Number),
        id: expect.any(String),
      })
    );
    // Borrar de FireBase
    const collectionRef = collection(FireBaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);
  });
});
