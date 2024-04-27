import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

let firstName = document.getElementById("FirstName");
let LastName = document.getElementById("LastName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let SignUpBtn = document.getElementById("SignUp-Btn");
let loginButton = document.getElementById("login-Button");
let loginEmail = document.getElementById("login-email");
let loginPass = document.getElementById("login-pass");
let BlogTitle = document.getElementById("blog-title");
let BlogDetail = document.getElementById("blog-detail");
let BlogPublishBtn = document.getElementById("blog-publish");
let BlogPost = document.getElementById("Blog-post");
let DelBtn = document.getElementById("DeleteBtn");
let logoutBtn = document.getElementById("logoutBtn");
let blogUpdate = document.getElementById("blog-update");

let userId = "";

const firebaseConfig = {
  apiKey: "AIzaSyAh7yD-UU6XQrLBtIEzkMSCE9AnCoD2drk",
  authDomain: "new-blog-app-1d4de.firebaseapp.com",
  projectId: "new-blog-app-1d4de",
  storageBucket: "new-blog-app-1d4de.appspot.com",
  messagingSenderId: "584559614404",
  appId: "1:584559614404:web:5ccc5af3ed51195cc62c91",
  measurementId: "G-BN4E3DV5GN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // if (!window.location.href.includes("dashboard")) {
    //   window.location.href = "dashboard.html";
    //   window.location = "dashboard.html";
    // } else {
    //   window.location.href = "login.html";
    // }
  }
});

console.log(userId);

logoutBtn?.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert(error.massage);
    });
});

SignUpBtn?.addEventListener("click", async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;
    const docRef = await setDoc(doc(db, "userAuthenticationData", userId), {
      firstName: firstName.value,
      LastName: LastName.value,
      Email: email.value,
      UserUId: userId,
    });
    alert("User signed up successfully!");
    window.location.href = "login.html";
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  }
});

loginButton?.addEventListener("click", (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, loginEmail?.value, loginPass?.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("User logged in successfully!");
      window.location.href = "Dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle authentication errors
      console.error(errorCode, errorMessage);
      alert(errorMessage); // Display error message to the user
    });
});
let doco = doc;
let newId;

BlogPublishBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  const docRef = await addDoc(collection(db, "Blogs"), {
    Title: BlogTitle.value,
    BlogDetail: BlogDetail.value,
  });
  BlogTitle.value = "";
  BlogDetail.value = "";
  newId = docRef.id;
  console.log("Document written with ID: ", newId);
  // Call GetSingalDoc with the newId to display the newly added document
  GetSingalDoc(newId);
});

async function GetSingalDoc(docId) {
  const docRef = doc(db, "Blogs", docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    // Create elements to display the document data
    const div = document.createElement("div");
    div.className = "oneBlog";
    const heading = document.createElement("h3");
    heading.textContent = data.Title;
    const text = document.createElement("p");
    text.textContent = data.BlogDetail;
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";
    delBtn.id = "deleteBtn";
    const updateBtn = document.createElement("button");
    updateBtn.innerHTML = "Update";
    updateBtn.id = "updateBtn";

    div.appendChild(heading);
    div.appendChild(text);
    div.appendChild(delBtn);
    div.appendChild(updateBtn);

    BlogPost.appendChild(div);
  } else {
    console.log("No such document!");
  }
}

// async function UpdateData(docId) {
//   const washingtonRef = doc(db, "Blogs", docId);

//   // Set the "capital" field of the city 'DC'
//   await updateDoc({
//     BlogTitle: BlogTitle.value,
//     BlogDetail: BlogTitle.value,
//   });
// }

// Call GetAllData to display all existing documents
async function GetAllData() {
  const querySnapshot = await getDocs(collection(db, "Blogs"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log(doc.data());
    const div = document.createElement("div");
    div.className = "oneBlog";
    const heading = document.createElement("h3");
    const text = document.createElement("p");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";
    delBtn.id = "deleteBtn";
    const updateBtn = document.createElement("button");
    updateBtn.innerHTML = "Update";
    updateBtn.id = "updateBtn";
    let docId = doc.id;

    if (data.Title && data.BlogDetail) {
      heading.textContent = data.Title;
      text.textContent = data.BlogDetail;

      div.appendChild(heading);
      div.appendChild(text);
      div.appendChild(delBtn);
      div.appendChild(updateBtn);

      BlogPost.appendChild(div);

      delBtn.addEventListener("click", async () => {
        try {
          await deleteDoc(doco(db, "Blogs", docId));
          alert("Blog deleted successfully!");
          div.remove();
        } catch (error) {
          console.error("Error deleting blog:", error);
        }
      });

      updateBtn.addEventListener("click", async () => {
        const docRef = doco(db, "Blogs", docId);
    
        try {
            // Retrieve the current document data
            const docSnapshot = await getDoc(docRef);
            const docData = docSnapshot.data();
    
            // Populate the input fields with the current values
            BlogTitle.value = docData.Title;
            BlogDetail.value = docData.BlogDetail;
    
            alert("Fields updated with current values!");
    
            // Add real-time listener for the document
            const unsubscribe = onSnapshot(docRef, (doc) => {
                const updatedDocData = doc.data();
    
                // Update the input fields with the updated values
                BlogTitle.value = updatedDocData.Title;
                BlogDetail.value = updatedDocData.BlogDetail;
    
                alert("Blog updated in real time!");
            });
    
            // Add event listener for updating the document
            blogUpdate.addEventListener("click", async (e) => {
                e.preventDefault();
    
                try {
                    // Update the document with new values
                    await updateDoc(docRef, {
                        Title: BlogTitle.value,
                        BlogDetail: BlogDetail.value,
                    });
    
                    alert("Blog updated successfully!");
                } catch (error) {
                    console.error("Error updating blog:", error);
                }
            });
    
            // Unsubscribe from the real-time listener when not needed
            // For example, when the user navigates away from the page
            // unsubscribe();
        } catch (error) {
            console.error("Error updating fields:", error);
        }
    });
    
    
    
    
    
    }
  });
}

GetAllData();
