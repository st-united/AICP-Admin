import io from 'socket.io-client';

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log('Socket backend URL:', BACKEND_URL);
export const socket = io(BACKEND_URL);
