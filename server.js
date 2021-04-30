const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')
const cors = require ('cors')


const app = express()

//Body Parser Middleware
app.use(express.json());
app.use(cors());
//DB Config
const db = config.get('mongoURI')

//DB Connection
mongoose
    .connect(db, 
        {   useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true 
        })
    .then(() => console.log('MongoDB Connected !'))
    .catch(err => console.log(err))

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 80

app.listen(PORT, () => console.log(`Server running at port ${PORT} !`))