// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, onSnapshot, addDoc, collection, query, where, deleteDoc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, getMetadata, deleteObject, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();

export async function getRootFolder(userId) {
  try {
    const docRef = doc(db, 'items', userId)
    // set
    await setDoc(docRef, { userId, type: 'root' }, { merge: true })
    // get
    const docSnap = await getDoc(docRef)
    
    return { id: docSnap.id, ...docSnap.data() }
  } catch (error) {
    console.error(error)
  }
}

export async function getFolder(folderId) {
  try {
    const docSnap = await getDoc(doc(db, 'items', folderId))
      
    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() }

    console.log('folder not found!')
    return null
  } catch (error) {
    console.error(error)
  }
}

export function getFolderChildren(folderId, setData) {
  const q = query(collection(db, "items"), where("parentId", "==", folderId));
  return onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setData(data)
  })
}

export async function addFolder(data) {
  try {
    await addDoc(collection(db, "items"), data);
  } catch (error) {
    console.error(error)
  }
}

export async function addFile(data, file, setProgress) {
  try {
    const storageRef = ref(storage, `files/${uuidv4()}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      setProgress(progress)
      switch (snapshot.state) {
        case 'paused':
          // console.log('Upload is paused');
          break;
        case 'running':
          // console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }

    setProgress(0)
  }, 
  async () => {
    // Upload completed successfully, now we can get the download URL
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

    await addDoc(collection(db, 'items'), {
      ...data,
      fileURL: downloadURL
    })
  })
  } catch (error) {
    console.error(error)
  }
}

export async function deleteItem(item) {
  try {
    await deleteDoc(doc(db, "items", item.id));
    
    if (item.type === 'file') await deleteObject(ref(storage, item.fileURL))
    
  } catch (error) {
    console.error(error)
  }
}