import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/blogs')
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now()
        cb(null, uniquePrefix + file.originalname)
    }
})

export const upload = multer({ storage: storage })