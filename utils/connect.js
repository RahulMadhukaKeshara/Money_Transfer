import mongoose from 'mongoose';

const connectMongo = async () => {
    // mongoose.connect(process.env.MONGO_URI);
    // console.log(process.env.MONGO_URI)

    const uri = process.env.MONGO_URI;
    mongoose.connect(uri);

    const connection = mongoose.connection;
    connection.once('open' , () => {
        console.log("MongoDB database connection established succesfully");
    })
}

export default connectMongo;
