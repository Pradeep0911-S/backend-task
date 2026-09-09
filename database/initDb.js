import fs from "fs";
import path from "path";
import {__filename , __dirname } from "./dir-file-path.js"
import Database from "better-sqlite3";
import bcrypt from "bcrypt";


const DB_PATH = path.join(__dirname,"myDatabase.db");
const SCHEMA_PATH = path.join(__dirname,"schema.sql");

const db = new Database(DB_PATH);
const schema = fs.readFileSync(SCHEMA_PATH,"utf8");
db.exec(schema);

const users = [
    {
        email : "pradeepg3salesforce@gmail.com",
        password : "Pradeep@123"
    },
    {
        email : "demo01110911@gmail.com",
        password : "Demotest@123"
    }
]
const usersInsert = db.prepare("INSERT INTO users (email,hash_password) VALUES(?,?)");

users.forEach(user => {
    const hashPass = bcrypt.hashSync(user.password,10)
    usersInsert.run(user.email,hashPass);
});

console.log("Database initialized");

