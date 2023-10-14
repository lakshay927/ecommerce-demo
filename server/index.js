require('dotenv').config()
const express = require('express')

const app = express()
const port = 5000
const connectToDB = require('./db/connection')
const routes = require('./routes/routes')
const cors = require('cors')
app.use(express.json())
app.use(express.static('public'))
// localhost:5000/images/1697207316391.png

app.use(cors())

app.use('/api', routes)


app.get('/', (req, res) => res.send('Hello World!'))

const startConnection = async () => {
    try {
        await connectToDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    }
    catch (err) {
        console.log(err)

    }
}
startConnection()

