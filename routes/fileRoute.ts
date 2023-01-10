import express from 'express';
import mongoose from 'mongoose';
import { fileUpload } from '../middleware/fileUploadMiddleware';
import { FileController } from '../controllers/fileController';

const fileController = new FileController();

const router = express.Router();
let gfs: any;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'photos',
  });
});

router.post('/upload', fileUpload.single('file'), fileController.uploadImage);
router.get('/:filename', fileController.getImage);

export default router;
