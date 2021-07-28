// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_KEY,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.SENDER_ID,
  appId: env.APP_ID,
  measurementId: env.MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


function addToDb(collectionName, jsonData, callback) {
  db.collection(collectionName).add(jsonData)
    .then((docRef) => {
      console.log("Firebase document written with ID: ", docRef.id);
      callback(docRef.id);
    })
    .catch((error) => {
      console.error("Firebase Error adding document: ", error);
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
      console.log("Firebase: No such document!");
    }
  }).catch((error) => {
    console.log("Firebase Error getting document:", error);
  });
}