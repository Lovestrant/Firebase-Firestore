const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Create Inventory Endpoint
exports.createInventory = functions.https.onRequest((req, res) => {
//   const { itemName, itemQuantity } = req.body;
  let itemName = "Tomato";
  let itemQuantity = "50";

  const inventoryRef = admin.firestore().collection("inventory");
  inventoryRef
    .add({ itemName, itemQuantity })
    .then((docRef) => {
      return res.json({ message: "Inventory item added successfully." });
    })
    .catch((error) => {
      return res.status(500).json({ error: "Error adding inventory item." });
    });
});


// Update Inventory Endpoint
exports.updateInventory = functions.https.onRequest((req, res) => {
    // const { itemId, itemName, itemQuantity } = req.body;
    let itemId = "7YglDloTeZdJj1zzNMZh";
    let itemName = "Mango";
    let itemQuantity = "100";
  
    const inventoryRef = admin.firestore().collection("inventory").doc(itemId);
    inventoryRef
      .update({ itemName, itemQuantity })
      .then(() => {
        return res.json({ message: "Inventory item updated successfully." });
      })
      .catch((error) => {
        return res.status(500).json({ error: "Error updating inventory item." });
      });
  });

  // Get Inventory Endpoint
exports.getInventory = functions.https.onRequest((req, res) => {
    const inventoryRef = admin.firestore().collection("inventory");
    inventoryRef
      .get()
      .then((snapshot) => {
        const inventory = [];
        snapshot.forEach((doc) => {
          inventory.push({ id: doc.id, ...doc.data() });
        });
        return res.json({ inventory });
      })
      .catch((error) => {
        return res.status(500).json({ error: "Error retrieving inventory items." });
      });
  });

  // Delete Inventory Endpoint
exports.deleteInventory = functions.https.onRequest((req, res) => {
    // const { itemId } = req.body;
    let itemId = "1";
  
    const inventoryRef = admin.firestore().collection("inventory").doc(itemId);
    inventoryRef
      .delete()
      .then(() => {
        return res.json({ message: "Inventory item deleted successfully." });
      })
      .catch((error) => {
        return res.status(500).json({ error: "Error deleting inventory item." });
      });
  });




  
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.helloworld = functions.https.onRequest((req, res) => {
//     res.send("Hello From a firebase function...");
// });

// exports.api = functions.https.onRequest((req, res) => {
//     switch (req.method) {
//         case 'GET':
//             res.send("It was a GET Request");
//             break;
//         case 'POST':
//             res.send("It was a POST Request");
//             break;      
//         case 'DELETE':
//             res.send("It was a DELETE Request");
//             break;
//         default:
//             res.send("It was a default request");
//     }
// });