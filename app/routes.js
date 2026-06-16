//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const multer = require('multer')

// ✅ Configure Multer with CSV validation
const upload = multer({
  limits: {
    fileSize: 50 * 1024 * 1024 // 50 MB limit
  },
  fileFilter: (req, file, cb) => {
    const isCsvMime =
      file.mimetype === 'text/csv' ||
      file.mimetype === 'application/vnd.ms-excel'

    const isCsvExt = file.originalname.toLowerCase().endsWith('.csv')

    if (isCsvMime && isCsvExt) {
      cb(null, true)
    } else {
      // ✅ Mark invalid file type
      req.fileValidationError = true
      cb(null, false)
    }
  }
})

// ✅ Default route
router.get('/', (req, res) => {
  res.redirect('/start')
})

// ✅ File upload route
router.post(
  '/add-your-file',
  upload.single('file-upload-1'),
  (req, res) => {

    // ❌ Wrong file type (not CSV)
    if (req.fileValidationError) {
      return res.redirect('/add-your-file-file-type-error')
    }

    // ❌ No file uploaded
    if (!req.file) {
      return res.redirect('/add-your-file-error')
    }

    // ✅ Valid CSV
    return res.redirect('/file-added')
  }
)

module.exports = router