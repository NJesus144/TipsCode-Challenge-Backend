import mongoose from "mongoose";

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions;

const connectDatabase = () => {
  console.log("Wait connecting to the database");

  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGODB_URL || "localhost:3000", mongoOptions)
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error));
};

export default connectDatabase;