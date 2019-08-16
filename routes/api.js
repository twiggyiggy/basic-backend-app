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

module.exports = router;