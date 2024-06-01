import mongoose from "mongoose";



const dbConnection = () =>{
    mongoose.connect( process.env.LOCAL_MONGO_URI,{
        dbName:'HUJAIFA_PORTFOLIO_DATABASE',

    }).then(()=>{
        console.log('connected to database')
    }).catch((error)=>{
        console.log(`error occured while connecting to DB.${error}`)
    })
}

export default dbConnection;
