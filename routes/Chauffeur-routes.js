const express = require('express');
const {addChauffeur, 
       getAllChauffeurs, 
       getChauffeur,
       updateChauffeur,
       deleteChauffeur
      } = require('../controllers/chauffeurControllers');

const router = express.Router();

router.post('/chauffeur', addChauffeur);
router.get('/chauffeurs', getAllChauffeurs);
router.get('/chauffeur/:id',getChauffeur);
router.put('/chauffeur/:id', updateChauffeur);
router.delete('/chauffeur/:id',deleteChauffeur);


module.exports = {
    routes: router
}