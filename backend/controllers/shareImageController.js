const SaveImage = require('../models/saveImage')
const cloudinary = require('cloudinary').v2;
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

const getShareImage = async(req,res)=>{
const data = await SaveImage.find();
res.send(data)
}

const shareImage = async(req,res)=>{
   
   try {
    const photoUrl = await cloudinary.uploader.upload(req.body.image , {
        overwrite: true,
        invalidate: true,
        // width: 810, height: 456, crop: "fill"
    },);
    const result = await SaveImage.create({
        name : req.body.name,
        prompt: req.body.prompt,
        image: photoUrl.url
    })
    res.send(result)
   } catch (err) {
    res.send(err)
   }
}

module.exports = { shareImage, getShareImage }