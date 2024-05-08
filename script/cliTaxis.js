"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
console.log(process.argv);
var mainFile = process.argv.slice(2)[0];
console.log("main file", mainFile);
var fileTaxi = path.join(mainFile, 'fleet-management-software-data-part-1', 'taxis');
console.log("🚀 ~ fileTaxi:", fileTaxi);
// const files = fs.readdirSync(fileTaxi)
// console.log("🚀 ~ files:", files)
// files.forEach(element => {
//   const fileTax = path.join(fileTaxi, element);
//   const contentFile = fs.readFileSync(fileTax, 'utf-8');
//   console.log(`contenido del archivo ${element}: `, "jhf", contentFile)
// })
