import storage from "./firebase-config";
import { ref, deleteObject } from "firebase/storage";

// Delete the file

const handleDelete = ({ firebaseFolderName, fileName }) => {
  const desertRef = ref(storage, `${firebaseFolderName}/${fileName}`);
  deleteObject(desertRef) // .child);
    .then(() => {
      console.log("delete file on firebase successfully");
    })
    .catch((error) => {
      console.log("delete file on firebase error", error);
    });
};

export default handleDelete;
