const express = require('express')
const { chatWithDocs } = require('../controllers/post')
const router = express.Router()
let multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'documents/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file?.originalname)
    }
})

const upload = multer({ storage })

router.post('/chat-with-docs', upload.single('file'), chatWithDocs)

module.exports = router