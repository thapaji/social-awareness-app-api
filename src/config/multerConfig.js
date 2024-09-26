import multer from 'multer';

// const imageFolderPath = 'public/img/product';

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, imageFolderPath);
    // },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const limits = {
    fileSize: 1 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    limits,
    fileFilter
});

export default upload;
