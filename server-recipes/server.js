const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
const port = 3000;
const userRouter = require('./routes/user');
const recipesRouter = require('./routes/recipes');

app.use(express.json());

app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);


app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
});