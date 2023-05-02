import express,  {Express,Request,Response} from  'express'


import dotenv from 'dotenv';
import cors from "cors";

var corsOptions = {
    origin: "http://localhost:8081"
  };

  dotenv.config();
  const app:Express=express();
  app.use(cors(corsOptions));
const port =process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const db=require('./app/models');
db.mongoose.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedToplogy:true
}).then(()=>{
    console.log("Connected to the database");
    
}).catch((err: any)=>{
    console.log("Cannot connect to the databse",err);
    process.exit();
})
app.get('/',(req:Request,res:Response)=>{
    res.send('Express +Typescript Server');
});

app.listen(port,()=>{
    console.log((`Server is running at http://localhost:${port}`));
})