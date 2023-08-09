import mongoose from "mongoose"
require('dotenv')
const connect =async()=>{
    try {
        const options:any = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // ... other options related to your application's needs
          };
        const response = await mongoose.connect(process.env.MONGODB_URL!,options);
        if(response){
            console.log("Database Connect Successfully");
        }
    } catch (error) {
        console.log("Failed DB Connectivity",error);

    }
}

export default connect;