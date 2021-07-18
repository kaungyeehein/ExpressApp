const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const upload = multer();

router.post('/upload', upload.single('my-file'), async (req, res) => {
  await fs.promises.writeFile('./static/' + req.file.originalname, req.file.buffer);
  res.send();
});

module.exports = router;