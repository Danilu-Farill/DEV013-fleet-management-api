"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("node:fs");
var path = require("node:path");
// console.log(process.argv); //ME MUESTRA LOS 3 EL NODE(EJECUTAR), EL ARCHIVO QUE EJECUTO(CLITAXIS), EL PARAMETRO(PATH) QUE LE PASO
// const mainFile: string = process.argv.slice(2)[0];//CORTO Y MUESTRO DESDE LA SEGUNDA POSICIÓN
// console.log("main file",mainFile);
// const fileTaxi: string = path.join(mainFile, 'fleet-management-software-data-part-1');//CONCATENO EL NOMBRE DE LA CARPETA (C:\Users\danil\taxis-y-trajectorias\fleet-management-software-data-part-1\fleet-management-software-data-part-1)
// console.log("🚀 ~ fileTaxi:", fileTaxi);
// // const files3 = fs.readdirSync(fileTaxi) //esta no se muestra
// // console.log("🚀 ~ files example 3:", files3)
// // //leer sincrónicamente el contenido de un directorio determinado
// // const files = fs.readdirSync('C:\\Users\\danil\\Downloads\\taxis\\fleet-management-software-data-part-1') //npm run clits
// // console.log("🚀 ~ files:", files)
// // const files2 = fs.readdirSync(fileTaxi) //como no le paso nombre de ruta //npm run clits "C:\Users\danil\taxis-y-trajectorias" error
// // console.log("🚀 ~ files example:", files2)
// const files2 = fs.readdirSync(mainFile) //como no le paso nombre de ruta //npm run clits "C:\Users\danil\taxis-y-trajectorias" 
// console.log("🚀 ~ files example:", files2)
// files2.forEach(file => {
//   const fileTaxis = path.join(mainFile, file)
//   const contentFile = fs.readFileSync(fileTaxis, 'utf-8');
//   console.log("🚀 ~ contentFile:", contentFile)
// })
// // const selectedFile = files.find(file => file.endsWith('.zip')); // Selecciona solo archivos .zip
// // if (selectedFile) {
// //   console.log("Selected file:", selectedFile);
// //   const filePath = path.join(mainFile, selectedFile);
// //   console.log("🚀 File path:", filePath);
// //   // Obtener la lista de archivos en la carpeta interna
// //   const innerFolder = path.join(mainFile, selectedFile.replace('.zip', ''));
// //   const innerFiles = fs.readdirSync(innerFolder);
// //   console.log("📁 Files in inner folder:", innerFiles);
// //   // Ahora puedes trabajar con el archivo seleccionado
// // } else {
// //   console.log("No ZIP files found in the directory.");
// // }
// console.log(process.argv[2])
// console.log(process.argv[3])//undefined
// // const mainFile: string = process.argv.slice(2)[0];
// // console.log("main file",mainFile);
// // const fileTaxi: string = path.join(mainFile, 'fleet-management-software-data-part-1', 'taxis');
// // console.log("🚀 ~ fileTaxi:", fileTaxi);
// // // const files = fs.readdirSync(fileTaxi)
// // // console.log("🚀 ~ files:", files)
// // // files.forEach(element => {
// // //   const fileTax = path.join(fileTaxi, element);
// // //   const contentFile = fs.readFileSync(fileTax, 'utf-8');
// // //   console.log(`contenido del archivo ${element}: `, "jhf", contentFile)
// // // })
var mainFile = process.argv.slice(2)[0]; //CORTO Y MUESTRO DESDE LA SEGUNDA POSICIÓN
console.log("main file", mainFile);
var type = process.argv[1];
console.log("🚀 ~ type:", type);
var type1 = process.argv[0];
console.log("🚀 ~ type2:", type1);
var type2 = process.argv[2];
console.log("🚀 ~ type2:", type2);
var type3 = process.argv[3];
console.log("🚀 ~ type2:", type3);
var proc = process.argv;
console.log("🚀 ~ proc:", proc);
// const zip: string = 'fleet-management-software-data-part-1';
var fileTaxi = path.join(mainFile, type2); //CONCATENO EL NOMBRE DE LA CARPETA (C:\Users\danil\taxis-y-trajectorias\fleet-management-software-data-part-1\fleet-management-software-data-part-1)
console.log("🚀 ~ fileTaxi:", fileTaxi);
var files2 = fs.readdirSync(mainFile); //como no le paso nombre de ruta //npm run clits "C:\Users\danil\taxis-y-trajectorias" 
console.log("🚀 ~ files example:", files2); //"C:\Users\danil\Downloads\taxis" --type=fleet-management-software-data-part-1
var proc2 = process.argv;
console.log("🚀 ~ proc:", proc2);
var files3 = fs.readdirSync(fileTaxi);
console.log("🚀 ~ files3:", files3);
files2.forEach(function (file) {
    console.log("🚀 ~ file:", file);
    var fileTaxis = path.join(mainFile, file);
    console.log("🚀 ~ fileTaxis:", fileTaxis);
    //   const contentFile = fs.readFileSync(fileTaxis, 'utf-8');
    //   console.log("🚀 ~ contentFile:", contentFile)
});
