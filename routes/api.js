'use strict';

const express = require('express');
// const createError = require('http-errors'); // need this?

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

router.get('/photos/:userId', async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const userPhotoIds = user.photos;

    const userPhotos = [];
    for (let i = 0; i < userPhotoIds.length; i++) {
      const photo = await Photo.findById(userPhotoIds[i]);
      userPhotos.push(photo);
    } // refactor?

    res.status(200).json(userPhotos);
  } catch (error) {
    next(error);
  }
});

router.post('/photos/add',
  validationNewPhoto(),
  async (req, res, next) => {
    const data = req.body;
    console.log(data);
    try {
      // 0. create photo in DB
      const newPhoto = await Photo.create(data);
      const photoId = newPhoto._id;
      console.log('req.session', req.session);
      const userId = req.session.currentUser._id;
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
    // remove photo's objectID from photos array in user!
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { $pull: { photos: id } });
    const userId = req.session.currentUser._id;

    await User.findByIdAndUpdate(userId,
      {$pop: {photo: id}},
      {safe: true, upsert: true})

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
