"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
// https://vitejs.dev/config/
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [(0, plugin_react_1.default)()],
    server: {
        host: true, // This will expose the server to your network
        port: 3000 // Optional: specify a port
    }
});
