import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { transporter } from '../mail';
import { getAllTrajectories, getQueryTrajectories,} from "../models/trajectories.models"

const prisma = new PrismaClient().trajectories;
const query = new PrismaClient();

const getAll = async (req: Request, resp: Response) => {//: Promise<void>
  try {
    const skip : number = parseInt(req.query.skip as string)??0;
    const take : number = parseInt(req.query.take as string)??10;
    const trajectories = await getAllTrajectories(take, skip)
    return resp.json(trajectories); 
  } catch (error) {
    resp.status(404).json("No encontrado")
  }
};

const getTrajectories = async(req: Request, resp: Response) => {
  try { 
    const skip : number = parseInt(req.query.skip as string)??0;
    const take : number = parseInt(req.query.take as string)??10;
    const taxi_id = req.query.taxi_id as string;
    const date = req.query.date as string;
    const endDate = new Date(date) as any;
    const startDate = new Date(date) as any;
    endDate.setDate(endDate.getDate() + 1);
    if(!skip || !take || !taxi_id || !date) {
      return resp.status(404).json("Faltan querys");
    }
    const findAllPlate = await getQueryTrajectories(taxi_id, startDate, endDate, skip, take);
    return resp.status(200).json(findAllPlate);    
  } catch (error) {
    resp.status(400).send("data y id no encontrado");
  }
};

const getLocation = async (req: Request, resp: Response) => {
  try { 
    const skip : number = parseInt(req.query.skip as string)??0;
    const take : number = parseInt(req.query.take as string)??10;
    if(!skip || !take){
      return resp.status(404).json("Falta especificar páginas")
    }
    const findLocation = await query.$queryRaw`
        -- SELECT t.taxi_id, t."date", t.latitude, t.longitude
        -- FROM "Trajectories" as t
        -- INNER JOIN (
        --     SELECT tj.taxi_id, MAX(tj."date") AS max_date
        --     FROM "Trajectories" AS tj
        --     GROUP BY tj.taxi_id) as t2
        --     ON t.taxi_id = t2.taxi_id AND t."date" = t2.max_date
        --     INNER JOIN "Taxis" AS tx 
        --     ON t.taxi_id = tx.id
        --     GROUP BY t.taxi_id, t."date", t.latitude, t.longitude
        --     OFFSET ${skip} LIMIT ${take}
         SELECT t.*, tx.plate
         FROM "Trajectories" t
          JOIN "Taxis" tx ON tx.id = t.taxi_id
          WHERE t.id IN (SELECT max(id) FROM "Trajectories" t GROUP BY taxi_id)
          OFFSET ${skip} LIMIT ${take}
           `
    resp.status(200).json(findLocation);     
  } catch (error) {
    resp.status(400).json("location no encontrado")
  }
};

const createTrajectories = async (req: Request, resp: Response) => {
  try {
    const {taxi_id, date, latitude, longitude } = req.body;
    const newDate = new Date(date);
    const create = await prisma.create({ 
      data:{
        taxi_id: taxi_id,
        date: newDate, 
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }
    });
    resp.status(201).json(create);  
  } catch (error: any) {
    resp.status(500).send("No creado");
  }
};

const deleteTrajectories = async (req: Request, resp: Response) => {
  try {
    const id: string = req.params.id;
    const deleteTrajectories = await prisma.delete({
      where: {
        id: parseInt(id)
      }
    });
    resp.status(200).json(deleteTrajectories)
        
  } catch (error) {
    resp.status(500).send("No borrado")
  }
}

const getBody = async (req: Request, resp: Response) => {
  try { 
    const skip : number = parseInt(req.query.skip as string)??0;
    const take : number = parseInt(req.query.take as string)??10;
    const { taxi_id, date } = req.body;

    const findAllPlate = await prisma.findMany({
      skip: skip,
      take: take,
      where: {
        OR:[
          {taxi_id: parseInt(taxi_id)},
          {date: new Date(date)}
        ]
      },
      select: {
        date: true,
        latitude: true,
        longitude: true
      }
    });
    resp.status(200).json({findAllPlate});   
  } catch (error) {
    resp.status(404).send("Body no encontado")
  }
};

const getDate = async (req: Request, resp: Response) => {
  try { 
    const skip : number = parseInt(req.query.skip as string)??0;
    const take : number = parseInt(req.query.take as string)??10;
    const { date } = req.params;
    const endDate = new Date(date);
    const StartDate = new Date(date);
    endDate.setDate(endDate.getDate()+1);
    const findAllPlate = await prisma.findMany({
      skip: skip,
      take: take,
      where: {
        date: {
          gte: StartDate,
          lt: endDate
        }
      },
      select: {
        date: true,
        latitude: true,
        longitude: true
      }
    });  
    resp.status(200).json({findAllPlate});     
  } catch (error) {
    resp.status(404).send("Date no encontado")
  }
};

const getID = async (req: Request, resp: Response) => {
  try { 
    const skip : number = parseInt(req.query.skip as string)??0;
    const take : number = parseInt(req.query.take as string)??10;
    const { taxi_id } = req.params;
    const findAllPlate = await prisma.findMany({
      skip: skip,
      take: take,
      where: {
        taxi_id: parseInt(taxi_id),
      },
      select: {
        latitude: true,
        longitude: true,
        taxi_id: true,
        date: true  
      }
    });
    resp.json({findAllPlate});   
  } catch (error) {
    resp.status(404).send("datos no encontrados(i)");
  }
};

const getEmail = async (req: Request, resp: Response) => {
  try {
    await transporter.sendMail({
      from: `email Dani 👻 ${process.env.EMAIL}`, 
      to: process.env.EMAIL_USER, 
      subject: "Bye ✔",
      text: "Hello world????", 
      html: "<b>Hello world?</b>",
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

export {getAll, getBody, createTrajectories, getID, getDate, getTrajectories, getLocation, deleteTrajectories, getEmail /*lastTrajectory*/}