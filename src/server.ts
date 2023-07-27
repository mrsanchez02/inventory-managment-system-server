import 'dotenv/config';
import http from 'http';
import jwt from "jsonwebtoken";
import { Server, Socket } from "socket.io";
import app from "./app/app";

const PORT = process.env.PORT;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    }
});

io.use((socket, next) => {
  if (!socket.handshake.headers.cookie) {
    next(new Error)
  } else {
    try {
      const token = socket.handshake.headers.cookie || ''
      const payload = jwt.verify(token, process.env.TOKEN_SECRET as string)
      if(!token) throw new Error('Unathorized!')
      if(payload) next()

    } catch (error) {
      console.log('Non auth!')
      next(new Error)

    }
  }

})

io.on('connection', (socket: Socket) => {
  // Handle new user connections
  console.log('A new user has connected.');

  socket.on('joinCompany', (companyId: string) => {
    // Handle user listening a company changes
    socket.join(companyId);
    console.log(`User ${socket.id} joined company ${companyId}.`);
  });

  socket.on('leaveCompnay', (companyId: string) => {
    // Handle user ending listeing a company changes
    socket.leave(companyId);
    console.log(`User ${socket.id} left company ${companyId}.`);
  });

  // Add more event handlers as needed
  socket.on('sendMessage', (companyId: string, message: string) => {
    // Handle incoming messages and broadcast to the company
    socket.to(companyId).emit('message', { companyId, message, username: socket.id });
  });

});

app.get('/', (_, res) => {
  res.json({ msg: 'works!' })
})

export default server