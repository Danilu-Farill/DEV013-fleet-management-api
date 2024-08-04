import * as fs from 'node:fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';
// import { Readline } from 'node:readline/promises';

const prismaTaxis = new PrismaClient().taxis;
const prismaTrajectories = new PrismaClient().trajectories;

//UNA INTERFACE define la estructura de un objeto, especificando qué propiedades debe tener y cuáles son sus tipos.
//TaxiData[] acepta un parámetro params que es un array de objetos, y cada objeto en ese array debe tener la estructura definida por TaxiData

interface TaxiData {//
  id: number;
  plate: string;
}

interface TrajectoryData {
  taxi_id: number;
  date: Date;
  latitude: number;
  longitude: number;
}
//Promesa que devuelve un booleano: La función devuelve una promesa que resuelve a un valor booleano (true o false). La definición Promise<boolean> indica que la función es asíncrona y que su resultado será un booleano.
//La función devuelve true si se encuentra un registro (es decir, record no es null) y false si no se encuentra ningún registro (es decir, record es null). Esto indica si un registro con esos valores ya existe en la base de datos.

async function filesExists(data: TrajectoryData): Promise<boolean> {
  const record = await prismaTrajectories.findFirst({
    where: {
      taxi_id: data.taxi_id,
      date: data.date,
      latitude: data.latitude,
      longitude: data.longitude
    }
  });
  return record !== null;
}

//PARAMS es un arreglo que puede contener objetos de tipo TaxiData o TrajectoryData
//model es un string literal que puede ser "taxis" o "trajectories"
//MODEL-TAXIS: params se fuerza a ser del tipo TaxiData[]. skipDuplicates: true evita la inserción de registros duplicados.
/*
Si model es "trajectories":
Se crea un arreglo vacío fileUnique.
Se itera sobre cada elemento en params.
Se verifica si el registro ya existe usando la función filesExists.
Si no existe, se añade a fileUnique.
Si existe, se imprime un mensaje de registro duplicado ignorado.
Si fileUnique tiene elementos (es decir, se encontraron registros no duplicados):
Se usa prismaTrajectories.createMany para insertar los datos en la base de datos.
fileUnique se fuerza a ser del tipo TrajectoryData[].
skipDuplicates: true evita la inserción de registros duplicados.
*/
async function createFilesPrisma(params: TaxiData[] | TrajectoryData[], model: "taxis" | "trajectories") {
  try {
    if(model === "taxis") {
      await prismaTaxis.createMany({
        data: params as TaxiData[],
        skipDuplicates: true
      })
    } else if(model === "trajectories") {
      const fileUnique: TrajectoryData[] = [];
      for (const param of params as TrajectoryData[]) {
        if(!(await filesExists(param))) {
          fileUnique.push(param)
        } else {
          console.log(`Registro duplicado ignorado: ${JSON.stringify(param)}`);
        }
      }
      if(fileUnique.length > 0) {
        await prismaTrajectories.createMany({
          data: params as TrajectoryData[],
          skipDuplicates: true
        })
      }
    }
  } catch (error) { 
    console.log("🚀 ~ createFilesPrisma ~ error:", error)
    if(error.code === "P2002") {
      console.log(`Registro duplicado ignorado`);
    } else {
      console.log("error");
      throw error;
    }
  } 
}

async function main() {
  const fileMain: string = process.argv.slice(2)[0];
  const type: "taxis" | "trajectories" = process.argv[3].split("=")[1] as "taxis" | "trajectories";//Usa as para indicar que este valor será uno de esos dos tipos. AS es una aserción de tipo en TypeScript, que le dice al compilador que trates este valor como uno de esos dos tipos específicos.
  let fileJoin: string;
  let fileExplore: string[]; 
  // let fileCreate: (TaxiData | TrajectoryData)[] = [];//es un array que almacenará los datos leídos de los archivos, que serán del tipo TaxiData o TrajectoryData
  let fileCreateTaxis: TaxiData[] = [];
  let fileCreateTrajectories: TrajectoryData[] = [];

  fileJoin = path.join(fileMain, type);
  fileExplore = fs.readdirSync(fileJoin);//Lee todos los nombres de archivos en ese directorio y los almacena en fileExplore
  const batchSize = 10000; // Tamaño del lote //Define el tamaño del lote para la inserción de datos en la base de datos.

  for (let index = 0; index < fileExplore.length; index++) {
    const element : string = fileExplore[index];
    const fileJoinTxt: string = path.join(fileJoin, element)//Construye la ruta completa a cada archivo (fileJoinTxt).
    const fileRead: string = fs.readFileSync(fileJoinTxt, "utf-8")//Lee el contenido del archivo
    const fileSpace: string[] = fileRead.split(/\r?\n/)//Divide el contenido del archivo en líneas 
    // const rows = fileRead.split(/\r?\n/).filter(Boolean);// DIFERENCIA??????
    // console.log("🚀 ~ main ~ rows:", rows)
    
    for (const files of fileSpace) {
      const filesSplit: string[] = files.split(",");
      if(type === "taxis" && filesSplit.length === 2) {
        const id: number = parseInt(filesSplit[0]); 
        const plate: string = filesSplit[1];
        fileCreateTaxis.push({id: id, plate: plate});
        // await createFilesPrisma(fileCreate, type)
        // fileCreate = [];
      } else if(type === "trajectories" && filesSplit.length === 4) {
        const spaces: string[] = files.split(/\s*,\s*/);
        if(spaces.length === 0) {//Verifica si spaces tiene elementos; si no, retorna.
          return;
        }
        // const dateString = filesSplit[1].replace(" ", "T");
        // console.log("🚀 ~ main ~ dateString:", dateString)
        const taxi_id: number = parseInt(filesSplit[0]); 
        // const date: Date = new Date(dateString);
        // console.log("🚀 ~ main ~ date:", date)
        const date: Date = new Date(filesSplit[1]);
        const latitude: number = parseFloat(filesSplit[2]);
        const longitude: number = parseFloat(filesSplit[3]);
        fileCreateTrajectories.push({taxi_id: taxi_id, date: date, latitude: latitude, longitude: longitude})    
        
        if (fileCreateTrajectories.length === batchSize) {
          await createFilesPrisma(fileCreateTrajectories, type);
          fileCreateTrajectories = [];
        } 
      }
      // if (fileCreate.length > 0) {
      //   await createFilesPrisma(fileCreate, type);
      // }
      // await createFilesPrisma(fileCreate, type)
      // fileCreate = [];
    }
    if (type === "taxis" && fileCreateTaxis.length > 0) {
      await createFilesPrisma(fileCreateTaxis, type);
      console.log("🚀 ~ main ~ type:", type)
      fileCreateTaxis = [];
    } else if (type === "trajectories" && fileCreateTrajectories.length > 0) {
      await createFilesPrisma(fileCreateTrajectories, type);
      console.log("🚀 ~ main ~ type:", type)
      fileCreateTrajectories = [];
    }
  }

  // if()
  // fileCreate.push({id:id, plate: plate}
    // prismaTaxis.create({
    //   data: {
    //     id: id,
    //     plate: plate
    //   }
    // }).catch(e => {
    //   if(e.code === "P2002") {
    //     console.log(`Registro duplicado ignorado: id: ${id}, plate: ${plate}`);
    //   } else {
    //     console.log("error");
    //     throw Error;
    //   }
    // })
  // )
  // const insertTaxis = await createFilesPrisma(fileCreate)
  // console.log("🚀 ~ main ~ insertTaxis:", insertTaxis)
}
main();


//8-02-06T22:15:29.000Z","latitude":116.98686,"longitude":40.4578} checar este archivo



//CÓDIGO DE AYLIN

// async function createModel() {
//     const prisma = new PrismaClient();
//     const args = process.argv.slice(2);

//     let folderPath, type;
//     for (const arg of args) {
//         if (arg.startsWith('--type=')) {
//             type = arg.split('=')[1]; // Extraer solo el valor del tipo
//         } else {
//             folderPath = arg;
//         }
//     }

//     const folderToProcess = path.join(folderPath, type);
//     console.log("🚀 ~ createModel ~ folderToProcess:", folderToProcess)
//     const files = fs.readdirSync(folderToProcess);
//     console.log("🚀 ~ createModel ~ files:", files)
//     for (const file of files) {
//         console.log("🚀 ~ createModel ~ file:", file)
//         if (!file.endsWith('.txt')) {
//             continue;
//         }
//         const filePath = path.join(folderToProcess, file);
//         console.log("🚀 ~ createModel ~ filePath:", filePath)

//         const readFiles = fs.readFileSync(filePath, 'utf-8');
//         const lines = readFiles.split('\n').map(line => line.trim()).filter(Boolean);
//         for (const line of lines) {
//             const [field1, field2, field3, field4] = line.split(',');

//             if (type === 'taxis') {
//                 await prisma.taxis.create({
//                     data: {
//                         id: parseInt(field1),
//                         plate: field2
//                     }
//                 });
//             } else if (type === 'trajectories') {
//                 await prisma.trajectories.create({
//                     data: {
//                         taxiId: parseInt(field1),
//                         date: new Date(field2),
//                         latitude: parseFloat(field3),
//                         longitude: parseFloat(field4)
//                     }
//                 });
//             }
//         }

//     }
//     console.log("All lines processed successfully.");
// }


// createModel()
