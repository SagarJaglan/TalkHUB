import{app,server} from './socket/socket.js';
import express from 'express';
import {connectDB} from './db/connection1.db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL, // Adjust this to your client URL
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));

connectDB();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cookieParser());

//routes
import userRoutes from './routes/user.route.js';
import messageRoutes from './routes/message.route.js';

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/messages', messageRoutes);

//middlewares
import { errorMiddleware } from './middlewares/error.middleware.js';

app.use(errorMiddleware);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});