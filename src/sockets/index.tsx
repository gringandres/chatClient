import { io } from "socket.io-client";

const socket = io("https://chat-server-ruddy.vercel.app");

export default socket;
