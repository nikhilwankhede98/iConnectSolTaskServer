const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')


const app = express()

//Body Parser Middleware
app.use(express.json());

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

//Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//     //Set Static Folder
//     app.use(express.static('client/build'));
  
//     app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running at port ${PORT} !`))