import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users"); // fetch from db, and specify what collection
  // userCollectionRef references whole !!! collection, not specific to a single document

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  // should be async as well
  const createUser = async () => {
    // add doc will take two params, a reference to the collection u wanna add data to and object/payload
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  // age param needed bc we need value of previous age before increment to increment
  const updateUser = async (id, age) => {
    // doc used to specify which document to update or in other words reference to the document u wanna update
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    // document, object
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    // reference to doc you wanna delete
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  return (
    <div>
      <input
        placeholder="Name..."
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      />
      <input
        placeholder="Age"
        type="number"
        onChange={(e) => {
          setNewAge(e.target.value);
        }}
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user, i) => {
        return (
          <div key={i}>
            <div>Name: {user.name}</div> <div>Age: {user.age}</div>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increment Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
