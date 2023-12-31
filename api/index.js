const express= require('express');
const cors = require('cors');
const app=express();
app.use(express.json()); // para leer req.body midleware


var allowlist = ['http://localhost:3000','https://myapp.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}


app.use(cors(corsOptionsDelegate));

app.use('/api',express.static(__dirname + '/public'));
const {logErrors,errorHandler,boomErrorHandler}=require('./midlewares/error.handler');//importamos midleware
const routerApi=require('./routes/index');
const port=process.env.PORT || 3000;



routerApi(app);


app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.get('/api',(req,res)=>{
    res.render('./public');
});


app.get('/api/hola',(req,res)=>{
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from('<h2>Test String</h2>'));
});



//Agrego el puerto de escucha
app.listen(port,()=>{
    console.log(`Mi port${port}`);
});





