var { getAllImages } = require('../db/operation')

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const query = req.query;
      const { limit, page } = query;
      if (!limit) {
          res.status(400).json({ result: null, hasNextPage: null, error: "limit must be provided" })
          return
      }

      if (!page) {
          res.status(400).json({ result: null, hasNextPage: null, error: "page must be provided" })
          return
      }
      const offset = (+limit * +page)-(+limit)
      const result = await getAllImages(limit, offset)
      const totalPage = Math.ceil(+result[0].count / +limit)
      let hasNextPage = true;
      if (+page >= totalPage) {
          hasNextPage = false
      }

        res.status(200).json({ result: result, hasNextPage, error: null })
    } catch(err) {
      console.log("AAAA", err)
        res.status(400).json({ result: null, hasNextPage: null, error: err })
    }
});

module.exports = router;
