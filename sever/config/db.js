import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://gauripawan77:orderease@cluster0.j4qm6uk.mongodb.net/digital-menu").then(()=>console.log("DB connected"));

}