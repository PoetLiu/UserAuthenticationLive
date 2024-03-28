import mongoose from "mongoose";
import {} from "dotenv/config"

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB Successfully.");
}).catch((err) => {
    console.log(`Connection Failed due to errors: ${err}`);
});

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    pwd: {type: String, required: true}
});

const userModel = mongoose.model("GeneralUser", userSchema);

export default userModel;