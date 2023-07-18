import mongoose from "mongoose"
require('dotenv')
const connect =async()=>{
    try {
        const response = await mongoose.connect(process.env.MONGODB_URL!);
        if(response){
            console.log("Database Connect Successfully");
        }
    } catch (error) {
        console.log("Failed DB Connectivity",error);

    }
}

export default connect;