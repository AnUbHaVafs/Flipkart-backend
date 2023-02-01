const express = require('express')
const env = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();
const path = require('path');
const cors = require('cors');

//Routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const initialDataRoutes = require('./routes/admin/initialData');

mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;

env.config();

// app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, 'uploads')));


mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.MONGO_DB_DATABASE}`, () => {
    console.log("Database connected")
})


app.use(cors());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT} `)
})




























/////////////////////////////////////


// mongoose
//     .connect(
//         `mongodb://127.0.0.1:27017/${process.env.MONGO_DB_DATABASE}`,
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//             // useCreateIndex: true,
//             // useFindAndModify: false,
//         }
//     )
//     .then(() => {
//         console.log("Database connected");
//     });

// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Hello from server'
//     });
// })

// app.post('/data', (req, res, next) => {
//     res.status(200).send({
//         message: req.body
//     })
// })