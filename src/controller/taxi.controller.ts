import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { transporter } from '../mail';
import {createExcel} from '../excel';

const prisma = new PrismaClient().taxis;

export const getAllPlate = async (req: Request, resp: Response) => {//: Promise<void>
  try {
    const skip : number = parseInt(req.query.skip as string)??0;
    const take : number = parseInt(req.query.take as string)??10;
    const findAllPlate = await prisma.findMany({
      skip: skip,
      take: take
    });
    resp.status(200).json(findAllPlate); 
  } catch (error) {
    resp.status(404).json("No encontrado")
  }
  // try {
  //   await transporter.sendMail({
  //     from: `email Dani 👻 ${process.env.EMAIL}`, // correo que manda, el que puse en mail.ts
  //     to: "kikadan08@gmail.com", // quien recibe
  //     subject: "Hello ✔", // asunto
  //     text: "Hello world 2?", // plain text body
  //     html: "<b>Hello world???</b>", // html body
  //   });
  // } catch (error) {
  //   console.log("🚀 ~ error:", error)
  // }  
};

export const getIdTaxis = async (req: Request, resp: Response) => {
  try { 
    const idTaxi = req.params.id;
    const idNumber = parseInt(idTaxi);
        
    const findAllPlate = await prisma.findUnique({
      where: {
        id: idNumber,
      }
    });
    resp.json(findAllPlate);
    // const plate = req.params.plate;
    // const findAllPlate = await prismaTaxi.findMany({
    //     where: {
    //         id: idNumber,
    //         plate: plate
    //     }
    // });    
  } catch (error) {
    resp.status(404).json("Id no encontado")
  }
}

export const getEmail = async (req: Request, resp: Response) => {//: Promise<void>
  // try {
  //   // const skip : number = parseInt(req.query.skip as string)??0;
  //   // const take : number = parseInt(req.query.take as string)??10;
  //   const findAllPlate = await prisma.findMany({
  //     // skip: skip,
  //     // take: take
  //   });
  //   resp.status(200).json(findAllPlate); 
  // } catch (error) {
  //   resp.status(404).json("No encontrado")
  // }
  try {
    const { id, plate } = req.body;
    const excel = createExcel()
    await transporter.sendMail({
      from: `email Dani 👻 ${process.env.EMAIL}`, // correo que manda, el que puse en mail.ts
      to: process.env.EMAIL_USER,// quien recibe
      subject: "Hello ✔", // asunto
      text: "Hello world 2?", // plain text body
      html: "<b>Hello world???</b>", // html body
      attachments: [{   
        filename: `locations-${id}-${plate}.xlsx`,     
        content: `${excel}`,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }]
    });
    resp.send("email send")
  } catch (error) {
    console.log("🚀 ~ error:", error)
  }  
}

export const createPlate = async (req: Request, resp: Response) => {
  try {
    const {id, plate} = req.body;
    if (!id && !plate) {
      return resp.status(400).json("No hay nada que agregar");  
    }
    const create = await prisma.create({data:{id: id, plate: plate,}});
    resp.status(201).json(create);  
  } catch (error: any) {
    resp.status(500).send("No creado")
  }
}

export const updatePlate = async (req: Request, resp: Response) => {
  try {
    const findId = req.params.id;
    const idNumber = parseInt(findId)
    const body = req.body;
    // if(!findId && !body){
    //   return resp.status(400).json("No hay nada que actualizar"); 
    // }
    const update = await prisma.update({
      where: {
        id: idNumber,
      },
      data: body
    });
    resp.status(200).json(update);
  } catch (error) {
    resp.status(404).send("No actualizado")
  }
};

export const deletePlate = async (req: Request, resp: Response) => {
  try {
    const id : string = req.params.id;
    const idNumber : number = parseInt(id);
    // if(!idNumber){
    //   return resp.status(400).json("No hay nada que borrar"); 
    // }
    // if (!id) {
    //     return resp.status(400).send('Debe proporcionar un id o una placa');
    // };
    // const findId = await prisma.findUnique({
    //         where: {
    //             id: idNumber 
    //         }
    //     });
    const deleteUid = await prisma.delete({
      where: {
        id: idNumber
      }
    })
    resp.status(200).json(deleteUid);     
  } catch (error) {
    resp.status(404).send("No encontado")
  }
}

















/*
EJEMPLO DE delete CON DOS REVISAR:
const { uid } = req.params;
        console.log("🚀 ~ deletePlate ~ uid:", uid, req.params, req.body.id, req.body.plate)
        // const findId: string = req.params.id;
        // const plate: string = req.params.plate;
        // // const { id, plate} = req.params
        // if (!findId && !plate) {
        //     return resp.status(400).send('Debe proporcionar un id o una placa');
        // };

        let identifier;
        if(!isNaN(Number(uid))) {
            identifier = await prisma.findUnique({
                where: {
                    id: parseInt(uid)
                }
            });
        }
        const deleteUid = await prisma.delete({
            where: {
                id: identifier
            }
        })

        // if(uid) {
        //     identifier = await prisma.deleteMany({
        //         where: {
        //             id: parseInt(uid)
        //         }
        //     });
        // } else {
        //     identifier = await prisma.deleteMany({
        //         where: {
        //             plate: uid
        //         }
        //     });
        // }





        // if(findId) {
        //     const idNumber: number = parseInt(findId)
        //     identifier = await prisma.deleteMany({
        //         where: {
        //             id: idNumber
        //         }
        //     });
        // } else if(plate){
        //     identifier = await prisma.deleteMany({
        //         where: {
        //             plate: plate
        //         }
        //     });
        // }


        // if(id){
        //     identifier = id;
        //     parseInt(identifier)
        // } else {
        //     identifier = plate;
        // };
        // const findTaxis = await prisma.findUnique({
        //     where: {
        //         identifier
        //     },
        // })

        // if(findId) {
        //     const idNumber: number = parseInt(findId)
        //     identifier = idNumber;
        // } else if(plate){
        //     identifier = plate;
        // }

        //  const create = await prisma.delete({
        //     where: {
        //         id: identifier
        //     }
        // });
*/