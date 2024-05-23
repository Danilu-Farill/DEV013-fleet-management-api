// const xlsx = require('xlsx');
import XlsxPopulate from "xlsx-populate";

// XlsxPopulate.fromBlankAsync().then(workbook => {
//   workbook.sheet(0).cell("A1").value("hello word")//CELDA
//   return workbook.toFileAsync("./salida.xlsx")//NOMBRE DEL ARCHIVO QUE SE CREA CON node build/excel.js
// })

// async function excel() { //agregar el valor a la celda
//   const workbook = await XlsxPopulate.fromBlankAsync();
//   workbook.sheet(0).cell("A1").value("NOMBRE");
//   workbook.sheet(0).cell("B1").value("APELLIDO");
//   workbook.sheet(0).cell("C1").value("EDAD");
//   workbook.sheet(0).cell("D1").value("APODO");

//   workbook.sheet(0).cell("A2").value("DANI");
//   workbook.sheet(0).cell("B2").value("FARILL");
//   workbook.sheet(0).cell("C2").value("30");
//   workbook.sheet(0).cell("D2").value("KIKA");

//   workbook.sheet(0).cell("A3").value("PATRICIA  ");
//   workbook.sheet(0).cell("B3").value("FARILL");
//   workbook.sheet(0).cell("C3").value("32");
//   workbook.sheet(0).cell("D3").value("PATY");

//   workbook.toFileAsync("./excelTaxis.xlsx");
// }

// async function excel() {//OBTENER LOS VALORES DE LAS CELDAS
//   const workbook= await XlsxPopulate.fromFileAsync("./excelTaxis.xlsx");
//   const value1 = workbook.sheet('Sheet1').cell("A1").value();
//   const value2 = workbook.sheet('Sheet1').cell("B1").value();
//   const value3 = workbook.sheet('Sheet1').usedRange().value();//OBTENER TODO
//   const value4 = workbook.sheet('Sheet1').range('A1:B2').value();//[ [ 'NOMBRE', 'APELLIDO' ], [ 'DANI', 'FARILL' ] ]
//   console.log("🚀 ~ excel ~ value4:", value4)
//   console.log("🚀 ~ excel ~ value3:", value3)
//   console.log("🚀 ~ excel ~ value1:", value1)
//   console.log("🚀 ~ excel ~ value2:", value2)
// }

// async function excel() {
//   // // const workbook = await XlsxPopulate.fromBlankAsync();
//   // // workbook.sheet(0).cell("A1").value([//crear la celda completa
//   // //   [1, 2, 3, 4],
//   // //   [ 'NOMBRE', 'APELLIDO', 'EDAD', 'APODO' ],
//   // //   [ 'DANI', 'FARILL', 30, 'KIKA' ],
//   // //   [ 'PATRICIA  ', 'FARILL', 32, 'PATY' ]
//   // // ])
//   // // workbook.toFileAsync("./salida.xlsx")

//   // const workbook = await XlsxPopulate.fromBlankAsync();
//   // workbook.sheet(0).cell("A1").value([//crear la celda completa con fecha del día
//   //   [new Date().getDate(), new Date().getMonth()+1, new Date().getFullYear()],
//   //   [1, 2, 3, 4],
//   //   [ 'NOMBRE', 'APELLIDO', 'EDAD', 'APODO' ],
//   //   [ 'DANI', 'FARILL', 30, 'KIKA' ],
//   //   [ 'PATRICIA  ', 'FARILL', 32, 'PATY' ]
//   // ])
//   // workbook.toFileAsync("./salida.xlsx")

//   const workbook = await XlsxPopulate.fromFileAsync("./salida2.xlsx");
//   // // const sheet = workbook.sheet(0);
//   // // console.log("🚀 ~ excel ~ sheet:", sheet.name())//Sheet1

//   // // workbook.addSheet("hoja 2");
//   // // workbook.toFileAsync("./salida2.xlsx");
//   // // console.log(workbook.sheets().map((sheet) => sheet.name()));//[ 'Sheet1', 'hoja 2' ]
//   // workbook.deleteSheet("hoja 2");
//   // workbook.toFileAsync("./salida2.xlsx")
// }
// excel();

// import * as XLSX from 'xlsx';

// interface Location {
//     id: number;
//     plate: string;
//     latitude: number;
//     longitude: number;
//     date: string;
//   }
  
// export function generateExcel(data: Location[]): Buffer {
//   const ws = XLSX.utils.json_to_sheet(data);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Locations");
//   return XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
// }

interface TaxisData{
  id: number,
  plate: string
}

// async function createExcel(data: TaxisData[]) {
//   const workbook = await XlsxPopulate.fromBlankAsync();
//   workbook.sheet(0).cell("A1").value([//crear la celda completa
//     [1, 2],
//     [ data],
//     [ '1', 'FARILL'],
//     [ '2', 'FARILL']
//   ])
//   workbook.toFileAsync("./excelTaxis.xlsx")
// }

export async function createExcel(/*data:TaxisData[]*/) {
  const workbook = await XlsxPopulate.fromBlankAsync();
  workbook.sheet(0).cell("A1").value([//crear la celda completa
    [1, 2],
    ['ID','PLATE'],
    [ 1, 'dyfu'],
    [ 2, 'adios']
  ])
  workbook.toFileAsync("./excelTaxis.xlsx")
}

createExcel();

