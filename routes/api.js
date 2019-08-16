'use strict';

const express = require('express');
const createError = require('http-errors'); // need this?

const router = express.Router();

const Photo = require('../models/Photo');

router.get('/photos', async (req, res, next) => {
  try {
    const allPhotos = await Photo.find()
    res.status(200).json(allPhotos)
  }
  catch(error) {
    next(error);
  }
})

router.post('/photos/add', async (req, res, next) => {
  const data = req.body;
  try {
    const newPhoto = await Photo.create(data);
    res.status(200).json(newPhoto);
  }
  catch(error) {
    next(error)
  }
})

router.delete('/photos/:id/delete', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Photo.findByIdAndRemove(id);
    res.status(200).json({"message": "Photo Deleted"});
  }
  catch(error) {
    next(error);
  }
})

router.put('/photos/:id/edit', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, data, {new: true});
    res.status(200).json(updatedPhoto);
  }
  catch (error) {
    next(error);
  }
})

module.exports = router;