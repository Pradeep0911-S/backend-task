import path from "path";
import {__filename , __dirname } from "./dir-file-path.js"
import Database from "better-sqlite3";

const DB_PATH = path.join(__dirname,"myDatabase.db");


export const db = new Database(DB_PATH);

export function getUserByEmail(email){
    const getData = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    
    return getData;
}


