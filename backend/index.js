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

app.post('/todo-list', async (req, res) => {
  try {
    const { todo } = req.body;
    const newTodo = await Todo.create({ todo });
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
});
app.delete('/todo-list/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/todo-list/:id', async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { todo: req.body.todo },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => console.log("server running 3000-port"));