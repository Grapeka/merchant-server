const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req: any, file: any) => {
    const match = ['image/png', 'image/jpeg'];

    if (!match.includes(file.mimetype)) {
      const filename = `${Date.now()}-name-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: 'photos',
      filename: `${Date.now()}-name-${file.originalname}`,
    };
  },
});

export const fileUpload = multer({ storage });
