import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

//TODO: dotenv this
const firebaseConfig = {
  // api config
};

const app = initializeApp(firebaseConfig);

// connect to db
// used to populate db var with app var above
// needs to be exported so can be used from other files
export const db = getFirestore(app);
