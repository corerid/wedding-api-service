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

      res.setHeader('Access-Control-Allow-Credentials', true)
      res.setHeader('Access-Control-Allow-Origin', '*')
      // another common pattern
      // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      )

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
