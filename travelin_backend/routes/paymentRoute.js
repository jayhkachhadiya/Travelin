import  express  from 'express';
const router = express.Router()
import paymentController from '../controllers/paymentController.js';



router.post('/createOrder', paymentController.createOrder);
router.post('/paymentVerification', paymentController.paymentVerification);
router.get('/getKey', paymentController.getKey);

export default router