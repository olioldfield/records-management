//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

const multer = require('multer')
const upload = multer()

router.post('/add-your-file', upload.single('fileUpload1'), (req, res) => {
  if (!req.file) {
    res.redirect('/add-your-file-error')
  } else {
    res.redirect('/file-added')
  }
})