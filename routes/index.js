// const express = require('express')
// const router = express.Router()

// router.use('/post', require('./post'))

// module.exports = router

const express = require('express');
const router = express.Router();
const { processFileAndAnswer } = require('./langchainHandler');

router.post('/upload', async (req, res) => {
  try {
    const { file, question } = req.body;
    const answer = await processFileAndAnswer(file, question);
    res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while processing the file.' });
  }
});

module.exports = router;