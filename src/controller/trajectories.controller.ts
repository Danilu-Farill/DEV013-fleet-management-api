import { PrismaClient } from '@prisma/client'
import express, { Request, Response } from 'express';

const prisma = new PrismaClient().trajectories;

const getAllTrajectories = async (req: Request, resp: Response) => {//: Promise<void>
    
    try {
        const skip : number = parseInt(req.query.skip as string)??0;
        const take : number = parseInt(req.query.take as string)??10;

        const findAllPlate = await prisma.findMany({
            skip: skip,
            take: take
        });
        resp.json({findAllPlate}); 
    } catch (error) {
        resp.status(404).send("No encontado")
    }
};

const getIdTrajectories = async (req: Request, resp: Response) => {
    try { 
        const idTaxi: string = req.params.id;
        const idNumber: number = parseInt(idTaxi)
        
        const findAllPlate = await prisma.findUnique({
            where: {
                id: idNumber,
            }
        });
        resp.json({findAllPlate});
        // const plate = req.params.plate;
        // const findAllPlate = await prismaTaxi.findMany({
        //     where: {
        //         id: idNumber,
        //         plate: plate
        //     }
        // });
        
    } catch (error) {
        resp.status(404).send("Id no encontado")
    }
}

// export const createTrajectories = async (req: Request, resp: Response) => {
//     try {
//         const {id, plate} = req.body;
//         const create = await prisma.create({data:{id: id, plate: plate,}});
//         resp.status(201).json({data: create});  
//     } catch (error: any) {
//         resp.status(500).send("No creado")
//     }
// }




// export const updatePlate = async (req: Request, resp: Response) => {
//     try {
//         const findId = req.params.id;
//         const idNumber = parseInt(findId)
//         const body = req.body;
//         const create = await prismaTaxi.update({where: idNumber }, {data: body});
//         resp.status(201).json({create});
        
//     } catch (error) {
//         resp.status(404).send("No encontado")
//     }
// }
export {getAllTrajectories, getIdTrajectories}