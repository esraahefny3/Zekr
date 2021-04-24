// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


var firebaseConfig = {
  apiKey: "AIzaSyCZxOFqKRJTztluKFfQzt3CoVb5yakseJU",
  authDomain: "zekr-ee5ca.firebaseapp.com",
  projectId: "zekr-ee5ca",
  storageBucket: "zekr-ee5ca.appspot.com",
  messagingSenderId: "886181810994",
  appId: "1:886181810994:web:0c251b139834e53a48bd2b",
  measurementId: "G-GQRCC5DCL3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


function addToDb(collectionName, jsonData, callback) {
  db.collection(collectionName).add(jsonData)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      callback(docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

}

function updateDb(collection, refId, jsonData, callback) {
  db.collection(collection).doc(refId).update(jsonData).then(function() {
    if (callback) {
      callback(null);
    }
  });
}

function readFrombDb(collection, docRefId, callback) {
  db.collection(collection).doc(docRefId).get().then((doc) => {
    if (doc.exists) {
      callback(doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}