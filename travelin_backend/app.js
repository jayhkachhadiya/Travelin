import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import cors from 'cors'
import connectdb from './config/connectdb.js'
import userRoute from './routes/userRoute.js'
import destiRoute from './routes/destiRoute.js'
import packRoute from './routes/packRoute.js'
import contactRouter from './routes/contactRoute.js'
import bookingRouter from './routes/bookingRoute.js'
import adminRouter from './routes/adminRoute.js'
import detailDestRoute from './routes/detailDestRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import subscribeRoute from './routes/subscribeRoute.js'
import sliderRoute from './routes/sliderRoute.js'
import guideRoute from './routes/guideRoute.js'
import googleRoute from './routes/googleRoute.js'
const app = express()
const port = process.env.PORT 
const DATABASE_URL = process.env.DATABASE_URL


// Use import.meta.url to get the current file URL
const __filename = fileURLToPath(import.meta.url);
// Use dirname to get the directory name
const __dirname = dirname(__filename);

app.use(cors())


// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, "../travelin_react", 'src/component/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));

app.use('/api/user', userRoute)
app.use('/api/destination', destiRoute)
app.use('/api/package', packRoute)
app.use('/api/contact', contactRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/admin', adminRouter)
app.use('/api/detailDest', detailDestRoute)
app.use('/api/payment', paymentRoute)
app.use('/api/subscribe', subscribeRoute)
app.use('/api/slider', sliderRoute)
app.use('/api/guide', guideRoute)
app.use('/auth/google', googleRoute)

app.use('/uploads', express.static('uploads'))

app.listen(port, () => {
    connectdb(DATABASE_URL)
    console.log("server is running")
})