import io from "socket.io-client";
export const createSocket = (url: string) => io(url);