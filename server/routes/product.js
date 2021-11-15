const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

  //가져온 이미지를 저장해주면 된다.
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
  })

})

router.post('/', (req, res) => {

  //받아온 정보들을 DB에 넣어준다.
  const product = new Product(req.body)
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })

})

router.post("/products/list", (req, res) => {

  //받아온 정보들을 DB에 넣어준다.
  Product.find()
    .populate('writer')
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, productInfo })
    })

})

router.post('/products', (req, res) => {

  //product collect에 있는 상품을 모두 가져오기.

  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm

  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {

      if (key === "price") { //key가 price일 때 
        findArgs[key] = {
          //Greater than equal
          $gte: req.body.filters[key][0],
          //Less than equal
          $lte: req.body.filters[key][1]
        }
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (term) {
    Product.find(findArgs)
      .find(
        { title: { $regex: `^${term}`, $options: 'i' } }, //options는 대소문자 구분 X
        { destination: { $regex: `^${term}`, $options: 'i' } }
      )
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
          success: true, productInfo,
          postSize: productInfo.length
        })
      })

  } else {

    Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
          success: true, productInfo,
          postSize: productInfo.length
        })
      })
  }
})

router.get('/products_by_id', (req, res) => {
  let type = req.query.type
  let productIds = req.query.id

  if (type === "array") {
    let ids = req.query.id.split(',')
    productIds = ids.map(item => {
      return item
    })
  }

  //productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다.

  Product.find({ _id: { $in: productIds } })
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send(product)
    })
})

router.post('/update', (req, res) => {
  Product.findByIdAndUpdate(
    req.body._id,
    { $set: req.body },
    { new: true },
    ((err, result) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, result })
    })
  )
})

router.post('/delete', (req, res) => {
  // 먼저 카트안에 내가 지우려고한 상품 지워주기
  Product.findByIdAndDelete(
    req.body._id,
    (err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true })

    }
  )
})



module.exports = router;
