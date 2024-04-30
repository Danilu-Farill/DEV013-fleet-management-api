"use strict";
// import pg from 'pg'
// const { Client } = pg
//METERLO A UNA FUNCIÓN ASYNC
//CONFIGURAR A QUE BASE DE DATOS SE VA A CONECTAR A QUE SERVIDOR SE VA A CONECTAR(LOCALHOST)
// const client = new Client()
// await client.connect()
Object.defineProperty(exports, "__esModule", { value: true });
// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
// await client.end()
const client_1 = require("@prisma/client");
const prisma2 = new client_1.PrismaClient();
exports.default = prisma2;
