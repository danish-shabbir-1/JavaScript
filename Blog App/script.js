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

// onAuthStateChanged((user) => {
//     if (user) {
//         // If the user is authenticated and not already on the dashboard page

//     } else {
//         // If the user is not authenticated and not already on the login page
//         if (window.location.pathname !== "/login.html") {
//             window.location.href = "login.html";
//         }
//     }
// });

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    if (window.location.pathname !== "/Dashboard.html") {
      window.location.href = "Dashboard.html";
    }
  } else {
    if (window.location.pathname !== "/login.html") {
      window.location.href = "login.html";
    }
  }
});

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
    const docRef = await addDoc(collection(db, "userAuthenticationData"), {
      firstName: firstName.value,
      LastName: LastName.value,
      Email: email.value,
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

BlogPublishBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  const docRef = await addDoc(collection(db, "Blogs"), {
    Title: BlogTitle.value,
    BlogDetail: BlogDetail.value,
  });
  console.log("Document written with ID: ", docRef.id);
});

let delBtn;
let DoocId;
async function GetAllData() {
  const querySnapshot = await getDocs(collection(db, "Blogs"));
  querySnapshot.forEach((doc) => {
    const data = doc.data(); // Get the data of the document
    console.log(doc.data());
    const div = document.createElement("div"); // Create a new div element
    div.className = "oneBlog";
    const heading = document.createElement("h3"); // Create a new h3 element for the title
    const text = document.createElement("p"); // Create a new p element for the blog detail
    delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";
    delBtn.id = "DeleteBtn";
    const updateBtn = document.createElement("button");
    updateBtn.innerHTML = "Delete";
    updateBtn.id = "updateBtn";
    DoocId = doc.id; // Set the data-id attribute to the document ID

    // Check if the document has Title and BlogDetail fields
    if (data.Title && data.BlogDetail) {
      heading.textContent = data.Title; // Set the title text content
      text.textContent = data.BlogDetail; // Set the blog detail text content

      div?.appendChild(heading); // Append the title to the div
      div?.appendChild(text); // Append the blog detail to the div
      div?.appendChild(delBtn); // Append the delete button to the div
      div?.appendChild(updateBtn); // Append the delete button to the div

      BlogPost?.appendChild(div); // Append the div to the BlogPost container in the DOM
    }
  });
}

// // Attach event listener to the delete button
delBtn?.addEventListener("click", async (e) => {
  try {
    await deleteDoc(doc(db, "Blogs", doc.id)); // Delete the blog post from Firestore using its ID
    alert("Blog deleted successfully!");
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
});

GetAllData();
