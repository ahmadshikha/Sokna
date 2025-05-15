import express from 'express' ;
import mongoose from "mongoose" ;
import dotenv from "dotenv" ;
import cors from "cors" ;

import authRoute from './routes/AuthRoute.js'
import chatRoute from './routes/ChatRoute.js'
import messageRoute from './routes/MessageRoute.js'
import userRoute from './routes/UserRoute.js'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT=process.env.PORT





app.use("/api/auth", authRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);







mongoose.connect(process.env.DATABASE)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));



 
app.listen(PORT, () => {
  console.log(`SERVER IS RUNING ON http://localhost:${PORT}`);
});

