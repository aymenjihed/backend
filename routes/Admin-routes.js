const express = require('express');
const { 
    getAllAdmin, 
    loginAdmin
      
      } = require('../controllers/adminControllers');

const router = express.Router();


router.get('/admins', getAllAdmin);
router.post("/signin", loginAdmin);



module.exports = {
    routes: router
}