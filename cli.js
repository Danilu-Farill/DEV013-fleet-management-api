// console.log("hola");

// console.log(process.argv);
// console.log(process.argv[2]);
// console.log(process.argv[3]);


// node upload-gps-data.js <path-to-files>
// --type=taxis|trajectories
// --dbname=<dbname>
// --host=<hostname>
// --port=<port>
// --username=<username>

// node upload-gps-data.js 'C:\\Users\\danil\\laboratoria\\fleetManagement_0\\data --type=taxi --dbname==postgres'
// node cli.ts "C:\\Users\\danil\\laboratoria\\fleetManagement_0\\data" --type=taxi




/*
//pasos:

PROCESS.ARG PARA VER EL ARRAY CON PATH
CREAR CLI.JS
CARPETA CON ARCHIVO
PACKAGE.JSON cli: node cli.js
COPY PATH DE LA CARPETA CONTENEDORA (C:\Users\danil\laboratoria\DEV013-fleet-management-api\data)
NODE CLI.JS 'C:\\Users\\danil\\laboratoria\\DEV013-fleet-management-api\\data'   o    npm run cli "C:\Users\danil\laboratoria\DEV013-fleet-management-api\data"
([
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\danil\\laboratoria\\DEV013-fleet-management-api\\cli.js',
  'C:\\Users\\danil\\laboratoria\\DEV013-fleet-management-api\\data'
])
los primeros dos se omiten estan por defecto
console.log(process.argv[2]);TERCERO
console.log(process.argv[3]); ACCEDER A TIPO(TYPE)

node cli.js "C:\Users\danil\laboratoria\DEV013-fleet-management-api\data" --type=tax   PARA ACCEDER

LEER UNA CARPETA CON NODE:  
// import fs from 'node:fs';
// // const fs = require('node:fs');
// console.log(process.argv[2]);
// console.log(process.argv[3]);

// const files = fs.readFileSync(process.argv[2]);
// console.log("🚀 ~ files:", files);

node cli.js "C:\Users\danil\laboratoria\DEV013-fleet-management-api\data" --type=tax //correr en terminal
// node cli.js "C:\Users\danil\laboratoria\DEV013-fleet-management-api\fleet-management-software-data-part-1.zip"

//"C:\Users\danil\laboratoria\DEV013-fleet-management-api\data"

ACCEDER AL ARCHIVO

LEER UN ARCHIVO:
const readFile = fs.readFileSync("C:\\Users\\danil\\laboratoria\\DEV013-fleet-management-api\\data\\taxi\\tax.txt", 'utf-8');
console.log("🚀 ~ readFile:", readFile)



*/












// import fs from 'node:fs';
const fs = require('node:fs');
const path = require('node:path');

// const files = fs.readdirSync(process.argv[2]);//FALTA ACCEDER AL ARCHIVO DE TAXIS
// console.log("🚀 ~ files:", files); //~ files: [ 'taxi' ]

// const readFile = fs.readFileSync("C:\\Users\\danil\\laboratoria\\DEV013-fleet-management-api\\data\\taxi\\tax.txt", 'utf-8');
// console.log("🚀 ~ readFile:", readFile)






//LEER LO QUE LE VOY ENTREGANDO
// console.log(process.argv);
// console.log(process.argv[2]);
// console.log(process.argv[3]);


// const fs = require('node:fs')
// // ("C:\\Users\\danil\\laboratoria\\DEV013-fleet-management-api\\fleet-management-software-data-part-1.zip")
// console.log(process.argv);
// console.log("1", process.argv[0]);
// console.log("2", process.argv[2]);

// const files = fs.readdirSync("C:\\Users\\danil\\laboratoria\\DEV013-fleet-management-api\\fleet-management-software-data-part-1.zip")
// console.log("3", process.argv[3]);
// console.log("🚀 ~ files:", files)










const mainFile = process.argv[2];
console.log("main file",mainFile);

const fileTaxi = path.join(mainFile, 'taxi');
console.log("🚀 ~ fileTaxi:", fileTaxi);

// const files = fs.readdirSync(fileTaxi)
// console.log("🚀 ~ files:", files)

// files.forEach(element => {
//   const fileTax = path.join(fileTaxi, element);
//   const contentFile = fs.readFileSync(fileTax, 'utf-8');
//   console.log(`contenido del archivo ${element}: `, "jhf", contentFile)
// })





// const mainFile = process.argv[2];
// console.log("main file",mainFile);

// const fileTaxi = path.join(mainFile, 'taxi');
// console.log("🚀 ~ fileTaxi:", fileTaxi);

// const files = fs.readdirSync(fileTaxi)
// console.log("🚀 ~ files:", files)

// files.forEach(element => {
//   const fileTax = path.join(fileTaxi, element);
//   const contentFile = fs.readFileSync(fileTax, 'utf-8');
//   console.log(`contenido del archivo ${element}: `, "jhf", contentFile)
// })












///node cli.js "C:\Users\danil\laboratoria\DEV013-fleet-management-api\data" --type=tax   para correrlo






// // const mainFile =  "C:\\Users\\danil\\laboratoria\\DEV013-fleet-management-api\\data" //"C:\\Users\\danil\\laboratoria\\DEV013-fleet-management-api";
// const mainFile = process.argv[1];
// //"C:\Users\danil\laboratoria\DEV013-fleet-management-api"
// // const mainFile = "C:\Users\danil\laboratoria\DEV013-fleet-management-api\fleet-management-software-data-part-1.zip"
// console.log("main file", mainFile);
// const fileOne = 'fleet-management-software-data-part-1';
// // const fileTaxis = 'taxis'

// // // // const fileTaxi = path.join(mainFile, fileOne, fileTaxis);
// const fileTaxi = path.join("C:\\Users\\danil\\laboratoria\\DEV013-fleet-management-api", fileOne);
// console.log("🚀 ~ fileTaxi:", fileTaxi);

// // const files = fs.readdirSync(fileTaxi)
// const files = fs.readdirSync(fileTaxi)
// const files = fs.readdirSync("C:\\Users\\danil\\laboratoria\\DEV013-fleet-management-api")
// console.log("🚀 ~ files:", files)

// // // const readFile = fs.readFileSync(files, "utf-8")
// // // console.log("🚀 ~ readFile:", readFile)

// const directoryPath = "C:\\Users\\danil\\fleet-management-software-data-part-1";
// const fileTaxi = path.join(directoryPath, 'taxis');
// console.log("🚀 ~ fileTaxi:", fileTaxi);

// fs.readdirSync(fileTaxi).forEach(element => {
//   console.log("adios");
//   const fileTax = path.join(fileTaxi, element);
//   console.log("🚀 ~ fs.readdirSync ~ fileTax:", fileTax)
//   const contentFile = fs.readFileSync(fileTax, 'utf-8');
//   console.log(`contenido del archivo ${element}: `, "jhf", contentFile)
// })






// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`, "jcbjdbcjdbcjd");
// })