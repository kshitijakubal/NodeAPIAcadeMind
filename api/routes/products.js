const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller')

// For image upload
const multer = require('multer')
// Middleware to protect certain routes using jwt
const checkAuth = require('../middleware/checkAuth');
// detailed configuration of storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,'-')+ file.originalname)
    } 
});
const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }
    else{
        cb(new Error('Please upload only jpg/png files'),false);
    }
}
// destination of the image to be stored.
const upload = multer({storage:storage,limits:{
    fileSize: 1024 * 1024 * 5
},
fileFilter:fileFilter
});

router.get('/', productController.get_all_products);

// upload.single('productImage') will tell the route to parse the file data.
// 'productImage' is the name of field from which the image will be uploaded in postman.
router.post('/',checkAuth, upload.single('productImage'),productController.create_product);
// Get by ID
router.get('/:id',productController.get_product_details)
// Patch
router.patch('/:id',checkAuth,productController.patch_product);
// Delete
router.delete('/:id',checkAuth,productController.delete_product)

module.exports = router;