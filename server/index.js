import express from "express";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));

const io = new Server(expressServer)

io.on('connection', socket => {

  console.log(`${socket.id.substring(0,5)} connected!`);
  
  socket.on('message', data => {
    console.log(`${socket.id.substring(0,5)}: ${data}`);
    socket.broadcast.emit("message", `${socket.id.substring(0,5)}: ${data}`);
  })

  socket.on('activity', (name) => console.log(`${name} typing...`));

  socket.on('disconnect', () => console.log(`${users[socket.id]} disconnected!`))
})

