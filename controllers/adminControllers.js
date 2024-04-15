'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Vérifiez si l'utilisateur existe dans la collection Firestore
      const adminSnapshot = await firestore.collection("admin").where("email", "==", email).get();
  
      // Si aucun utilisateur n'est trouvé, renvoyez une erreur
      if (adminSnapshot.empty) {
        return res.status(401).json({ error: "Email or password is incorrect" });
      }
  
      // Récupérez le premier utilisateur trouvé (en supposant que l'email est unique)
      const adminData = adminSnapshot.docs[0].data();
  
      // Vérifiez si le mot de passe correspond
      if (adminData.password !== password) {
        return res.status(401).json({ error: "Email or password is incorrect" });
      }
  
      
  
      res.status(200).json({ admin: adminData, message: "Login successful" });
    } catch (error) {
      // Si une erreur se produit, renvoyez une erreur avec le message
      res.status(500).json({ error: error.message });
    }
  };
  
const getAllAdmin = async (req, res, next) => {
  try {
    const adminCollection = await firestore.collection('admin');
    const data = await adminCollection.get();
    const adminsArray = [];

    if (data.empty) {
      res.status(404).send('No admin record found');
    } else {
      data.forEach(doc => {
        // Creating an admin object from Firestore data
        const admin = new Admin(doc.data().email, doc.data().password);
        adminsArray.push(admin);
      });
      res.send(adminsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  getAllAdmin,
  loginAdmin
}
