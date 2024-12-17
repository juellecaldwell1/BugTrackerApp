import mongoose from "mongoose";


const ConnectToDatabase = async () => {
    try{
     await mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to database")
     })
    }
    catch(error){
        console.log(error);

    }
}
export default ConnectToDatabase