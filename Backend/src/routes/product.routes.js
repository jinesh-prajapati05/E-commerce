import express from 'express'
import { upload } from '../middleware/multer.middleware.js';
import productController from '../controllers/product.controller.js';
import authMiddleware from '../middleware/auth.middleware.js'
import { admin } from '../middleware/admin.middleware.js';

export const productRouter = express.Router();

productRouter.post('/product', upload.single('productImage'), authMiddleware.authUser , admin ,productController.createProduct)

productRouter.delete('/product/delete/:id', authMiddleware.authUser , admin ,productController.deleteProduct)
productRouter.put('/product/update/:id', upload.single('productImage'), authMiddleware.authUser , admin ,productController.updateProduct)

productRouter.get('/product', authMiddleware.authUser ,productController.getAllProducts)