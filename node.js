var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://petit-dejeuner-gourmand-default-rtdb.asia-southeast1.firebasedatabase.app"
});
