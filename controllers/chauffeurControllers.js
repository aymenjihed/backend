'use strict';

const firebase = require('../db');
const Chauffeur = require('../models/chauffeur'); // Import de la classe Chauffeur
const firestore = firebase.firestore();

const addChauffeur = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('Chauffeurs').doc().set(data); // Utilisation de la collection 'chauffeurs'
        res.send('Record saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllChauffeurs = async (req, res, next) => {
    try {
        const chauffeurs = await firestore.collection('Chauffeurs');
        const data = await chauffeurs.get();
        const chauffeursArray = [];
        if (data.empty) {
            res.status(404).send('No chauffeur record found');
        } else {
            data.forEach(doc => {
                const chauffeur = new Chauffeur(
                  
                    doc.data().Série,
                    doc.data().compte,
                    doc.data().email,
                    doc.data().id,
                    doc.data().latitude,
                    doc.data().longitude,
                    doc.data().motdepasse,
                    doc.data().positionActuelle,
                    doc.data().txtFirstName,
                    doc.data().txtLastName,
                    doc.data().ville,
                    doc.data().NumeroDeTel,
                    doc.data().DateDeNaissance,
                    doc.data().Disponibilité
                );
                chauffeursArray.push(chauffeur);
            });
            res.send(chauffeursArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getChauffeur = async (req, res, next) => {
    try {
        const id = req.params.id;
        const chauffeur = await firestore.collection('Chauffeurs').doc(id);
        const data = await chauffeur.get();
        if (!data.exists) {
            res.status(404).send('Chauffeur with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateChauffeur = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const chauffeur = await firestore.collection('Chauffeurs').doc(id);
        await chauffeur.update(data);
        res.send('Chauffeur record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteChauffeur = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('Chauffeurs').doc(id).delete();
        res.send('Record deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addChauffeur,
    getAllChauffeurs,
    getChauffeur,
    updateChauffeur,
    deleteChauffeur
}
