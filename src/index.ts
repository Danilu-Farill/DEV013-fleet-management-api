import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
const prisma = new PrismaClient();

async function main() {
    // ... you will write your Prisma Client queries here

  //   const createPlate = await prisma.taxis.create({//crear placa
  //   data: {
  //     plate: "0001"
  //   }
  // });
  // console.log(createPlate);

    const allUsers = await prisma.taxis.findMany()//buscar
    console.log(allUsers)
  }
  
  main()
    // .then(async () => {
    //   await prisma.$disconnect()
    // })
    // .catch(async (e) => {
    //   console.error(e)
    //   await prisma.$disconnect()
    //   process.exit(1)
    // })
    //desconectar la base de datos

const app = express();
app.get("/", function(req: Request, resp: Response) {
  resp.send("taxis");
})
app.listen(3000, () => {
    console.log("servidor conectado 3000");
})