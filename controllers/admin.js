const product = require('../models/product');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    isLoggedIn:req.session.isLoggedIn
  });
}; 

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title
  const image = req.file
  const description = req.body.description
  const price = req.body.price
  const userId = req.user._id
  const imageUrl = image.path
  const product = new Product({title,imageUrl,description,price,userId})
  try{
    await product.save()
    res.redirect('/admin/products')
  }catch(e){
    res.render('admin/error-page',{
      pageTitle:'Image Upload Store',
      error: e ? e : 'If you not seeing any error'
    })
  }
};
exports.getProducts = (req,res) =>{
    Product.find()
    .populate('userId')
    .then(products=>{
      res.render('admin/products',{
        products,
        pageTitle:'Admin Product',
        isLoggedIn:req.session.isLoggedIn
      })
    })
    .catch(e=>{
      console.log(e);
    })
}

exports.getEditProduct = (req, res, next) => {
  const mode = req.query.edit;
  if(!mode) {
    return redirect('/')
  }
  const productId = req.params.productId;
  Product.findById(productId)
  .then(product=>{
    if(!product) return redirect('/')
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/add-product',
      prod:product,
      isLoggedIn:req.session.isLoggedIn
    });
  })
  .catch(e=>{
    console.log(e)
  })
};
exports.postEditProduct = (req,res,next) =>{
  const id = req.body.productId
  const title = req.body.title
  const image = req.file
  const description = req.body.description
  const price = req.body.price
  Product.findById(id).then(product=>{
    let url = image ? image.path : product.imageUrl
    product.title = title;
    product.imageUrl = url
    product.description = description,
    product.price = price
    return product.save()
  })
  .then(r=>{
    console.log('Products updated')
    res.redirect('/admin/products')
  })
  .catch(e=>{
    console.log(e)
  })
}

exports.getdeleteProduct = (req,res,next) =>{
  const id = req.params.productId;
  Product.findByIdAndDelete(id)
  .then(()=>{
    res.redirect('/admin/products')
  })
  .catch(e=>{
    console.log(e)
  })
}