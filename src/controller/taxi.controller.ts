import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { transporter } from '../mail';
import {createExcel} from '../excel';

const prisma = new PrismaClient().taxis;

export const getAllPlate = async (req: Request, resp: Response) => {
  try {
    const skip : number = parseInt(req.query.skip as string)??0;
    const take : number = parseInt(req.query.take as string)??10;
    const findAllPlate = await prisma.findMany({
      skip: skip,
      take: take
    });
    resp.status(200).json(findAllPlate); 
  } catch (error) {
    resp.status(404).json("No encontrado");
  } 
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
  } catch (error) {
    resp.status(404).json("Id no encontado");
  }
};

export const getEmail = async (req: Request, resp: Response) => {
  try {
    const { id, plate } = req.body;
    const excel = await createExcel();
    transporter.sendMail({
      from: `email Dani 👻 ${process.env.EMAIL}`, 
      to: process.env.EMAIL_USER,
      subject: "Hello ✔", 
      text: "Hello world 2?", 
      html: "<b>Hello world???</b>", 
      attachments: [{   
        filename: `locations-${id}-${plate}.xlsx`,     
        content: `${excel}`,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }]
    });
    resp.send("email send");
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }  
};

export const createPlate = async (req: Request, resp: Response) => {
  try {
    const {id, plate} = req.body;
    if (!id && !plate) {
      return resp.status(400).json("No hay nada que agregar");  
    }
    const create = await prisma.create({data:{id: id, plate: plate,}});
    resp.status(201).json(create);  
  } catch (error: any) {
    resp.status(500).send("No creado");
  }
};

export const updatePlate = async (req: Request, resp: Response) => {
  try {
    const findId = req.params.id;
    const idNumber = parseInt(findId);
    const body = req.body;
    const update = await prisma.update({
      where: {
        id: idNumber,
      },
      data: body
    });
    resp.status(200).json(update);
  } catch (error) {
    resp.status(404).send("No actualizado");
  }
};

export const deletePlate = async (req: Request, resp: Response) => {
  try {
    const id : string = req.params.id;
    const idNumber : number = parseInt(id);
    const deleteUid = await prisma.delete({
      where: {
        id: idNumber
      }
    })
    resp.status(200).json(deleteUid);     
  } catch (error) {
    resp.status(404).send("No encontado");
  }
};