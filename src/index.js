import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/dbConnection.js"
dotenv.config()



const PORT =process.env.PORT  || 8001


const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected");

      app.listen(PORT, () => {
      console.log(`Server is listening at port: ${PORT}`);

    });
  } catch (error) {
    console.error("Server initialization error:", error);
    process.exit(1); 
  }
};

startServer();