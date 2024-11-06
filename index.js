const express=require('express');
const app = express();
const db=require('./db');
const MenuItem = require('./models/MenuItem')

const bodyParser=require('body-parser')
app.use(bodyParser.json()) // req.body

require('dotenv').config();
const PORT=process.env.PORT ||3000

// trying different methods
app.get('/', function (req, res) {
    res.send('Welcome to my hotel. How may i help u?')
  })

app.get('/chicken', function (req, res) {
    res.send('Id loveasd to have chicken')
  })

app.get('/nepal',function(req,res){
    const random={
        name:'rojan',
        age:22,
        hobby:['gym','music'],
        isStudent:true
    }
    res.send(random)
})
app.post('/items',(req,res)=>{
    res.send('Data is saved')
})


//routes managed on different routes folder
const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes=require('./routes/menuRoutes');
app.use('/menuitem',menuRoutes);



//showing that the connection between backend and database
//being done
app.listen(PORT,()=>{
    console.log('Server listining to port 3000...')
})



