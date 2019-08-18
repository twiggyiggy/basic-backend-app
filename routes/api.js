'use strict';

const express = require('express');
const createError = require('http-errors'); // need this?

const router = express.Router();

const Photo = require('../models/Photo');
const User = require('../models/User');

const { validationNewPhoto } = require('../helpers/middlewares');

router.get('/photos', async (req, res, next) => {
  try {
    const allPhotos = await Photo.find();
    res.status(200).json(allPhotos);
  } catch (error) {
    next(error);
  }
});

// router.get('/photos/:userId', async (req, res, next) => {
//   const userId = req.params.userId;
//   try {
//     const user = await User.findById(userId);
//     const userPhotoIds = user.photos;
//     const userPhotos = [];

//     res.status(200).json(userPhotosIds);
//   } catch (error) {
//     next(error);
//   }
// });

router.post('/photos/add',
  validationNewPhoto(),
  async (req, res, next) => {
    const data = req.body;
    try {
    // 0. create photo in DB
      const newPhoto = await Photo.create(data);
      res.status(200).json(newPhoto);
      // 1. get the created photo's id - save in a var
      const photoId = newPhoto._id;
      // 2. get the current user's id - save in a var
      const userId = req.session.currentUser._id;
      // 3. update the user's document: add photo id to photos array
      const photoReferenced = await User.findByIdAndUpdate(userId, { $push: { photos: photoId } });
      res.status(200).json(photoReferenced);
    } catch (error) {
      next(error);
    }
  });

router.delete('/photos/:id/delete', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Photo.findByIdAndRemove(id);
    res.status(200).json({ message: 'Photo Deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/photos/:id/edit', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(updatedPhoto);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
