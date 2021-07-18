const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const upload = multer({
  limits: { fileSize: 1024 }
}).single('my-file');

router.post('/upload', async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res.status(400).send({ message: "Size is too big" });
    }
    await fs.promises.writeFile('./static/' + req.file.originalname, req.file.buffer);
    res.send({ message: "Upload success" });
  });

});

module.exports = router;