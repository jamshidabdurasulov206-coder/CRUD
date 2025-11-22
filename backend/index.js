const express = require('express')
const cors = require('cors')
const mongoose=require('mongoose');
 const Todo = require('./model.js'); 


const app = express();
const mongoURI = 'mongodb://127.0.0.1:27017/todo';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));


const port = 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {

    res.send('Hello, World!');
});

app.get('/todo-list', async (req, res) => {
  try {
    const items = await Todo.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => console.log("server running 3000-port"));