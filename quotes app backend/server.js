const express=require('express');
const mongoose=require('mongoose');
const app=express();
const path = require('path');
const items=require('./routes/api/items');
const config=require('./config/config');
const db=config.mongoURI;

mongoose.connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true,useUnifiedTopology: true 
  }).then(()=>console.log("connected"))
.catch((err)=>console.log(err))
app.use(express.json());
app.use('/api/items',require('./routes/api/items'));
app.use('/api/user',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'build', 'index.html'));
  });
}


const port=process.env.PORT||5000;

app.listen(port,()=>console.log(`server started on port ${port}`))