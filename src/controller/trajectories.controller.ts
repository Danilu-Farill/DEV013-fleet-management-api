import { PrismaClient } from '@prisma/client'
import express, { Request, Response } from 'express';

const prisma = new PrismaClient().trajectories;

//skip: APARTIR DE QUE NÚMERO DE PÁGINA SE MUESTRA
const getAll = async (req: Request, resp: Response) => {//: Promise<void>
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

const getBody = async (req: Request, resp: Response) => {
    try { 
        const skip : number = parseInt(req.query.skip as string)??0;
        const take : number = parseInt(req.query.take as string)??10;
        const { taxi_id, date, longitude, latitude } = req.body;
        console.log("🚀 ~ getTrajectories ~ date:", date, date.toString())

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
        // const plate = req.params.plate;
        // const findAllPlate = await prismaTaxi.findMany({
        //     where: {
        //         id: idNumber,
        //         plate: plate
        //     }
        // });     
    } catch (error) {
        console.log("🚀 ~ getIdTrajectories ~ error:", error)
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
                // date: new Date(date),
                date: {
                gte: StartDate,//MAYOR IGUAL QUE
                lt: endDate//menor que
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
        console.log("🚀 ~ getIdTrajectories ~ error:", error)
        resp.status(404).send("Date no encontado")
    }
};

const getID = async (req: Request, resp: Response) => {
    try { 
        const skip : number = parseInt(req.query.skip as string)??0;
        const take : number = parseInt(req.query.take as string)??10;
        // const { taxi_id, date} = req.body;
        // // const { taxi_id, date} = req.params;
        // // const { taxi_id, date} = req.query;
        // console.log("🚀 ~ getTrajectoriesAll ~ taxi_id:", taxi_id)

        // const findAllPlate = await prisma.findMany({
        //     // skip: skip,
        //     // take: take,
        //     where: {
        //         taxi_id: taxi_id,
        //         // date: date,
        //         // longitude: parseFloat(longitude),
        //         // latitude: parseFloat(latitude)
        //     }
        // });
/*
        //ESTO SI ME REGRESA PERO SOLO UN ARCHIVO ID
        // const { id } = req.params;
        // console.log("🚀 ~ getTrajectoriesAll ~ taxi_id:", req.params)
        // const findAllPlate = await prisma.findUnique({
        //     // skip: skip,
        //     // take: take,
        //     where: {
        //         id: parseInt(id),
        //     }
        // });*/

        const { taxi_id } = req.params;
        console.log("🚀 ~ getTrajectoriesAll ~ taxi_id:", req.params)
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
        console.log("🚀 ~ getTrajectoriesAllID ~ findAllPlate:", findAllPlate)
        resp.json({findAllPlate});   
    } catch (error) {
        console.log("🚀 ~ getIdTrajectories ~ error:", error)
        resp.status(404).send("datos no encontados(i)");
    }
};

const getTrajectories = async (req: Request, resp: Response) => {
    try { 
        // const skip : number = parseInt(req.query.skip as string)??0;
        // const take : number = parseInt(req.query.take as string)??10;
        const taxi_id = req.params.taxi_id;
        const date = req.query.date as string;
        const endDate = new Date(date);
        const StartDate = new Date(date);
        endDate.setDate(endDate.getDate()+1);

        const findAllPlate = await prisma.findMany({
            // skip: skip,
            // take: take,
            where: {
                taxi_id: parseInt(taxi_id),
                date: {
                    gte: StartDate,//MAYOR IGUAL QUE
                    lt: endDate//menor que
                }
            },
            select: {
                date: true,
                taxi_id: true,
                latitude: true,
                longitude: true
            }
        });
        resp.status(200).json({findAllPlate});    
    } catch (error) {
        console.log("🚀 ~ getIdTrajectories ~ error:", error)
        resp.status(404).send("data y id no encontado")
    }
};

const getLocation = async (req: Request, resp: Response) => {
    try { 
        // const skip : number = parseInt(req.query.skip as string)??0;
        // const take : number = parseInt(req.query.take as string)??10;
        const taxi_id = req.params.taxi_id;
        const date = req.query.date as string;
        const latitude = req.query.latitude as string;
        const longitude = req.query.longitude as string;


        // const { date, longitude, latitude } = req.query as any;
        const endDate = new Date(date);
        const StartDate = new Date(date);
        endDate.setDate(endDate.getDate()+1);

        const findAllPlate = await prisma.findMany({
            // skip: skip,
            // take: take,
            where: {
                taxi_id: parseInt(taxi_id),
                date: {
                    gte: StartDate,//MAYOR IGUAL QUE
                    lt: endDate//menor que
                },
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            },
            select: {
                date: true,
                taxi_id: true,
                latitude: true,
                longitude: true
            }
        });
        resp.status(200).json({findAllPlate});     
    } catch (error) {
        console.log("🚀 ~ getIdTrajectories ~ error:", error)
        resp.status(404).send("location no encontado")
    }
};

const createTrajectories = async (req: Request, resp: Response) => {
    /*
    SELECT * 
FROM public."Trajectories"
WHERE taxi_id = 5; 	
    */
    try {
        const {taxi_id, date, latitude, longitude} = req.body;
        const newDate = new Date();
        const create = await prisma.create({            
           data:{
                taxi_id: taxi_id,//PRIMERO SE CREA LA PLACA DEL TAXI Y DE AHI SE AGREGA O SE CREA ESTO NUEVO SOBRE LO CREADO
                date: newDate, 
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
           }
        });
        console.log("🚀 ~ createTrajectories ~ create:", create)
        resp.status(201).json({data: create});  
    } catch (error: any) {
        console.log("🚀 ~ createTrajectories ~ error:", error)
        resp.status(500).send("No creado")
    }
}

export {getAll, getBody, createTrajectories, getID, getDate, getTrajectories, getLocation}




// const getTrajectoriesAllID = async (req: Request, resp: Response) => {
//     try { 
//         const { taxi_id, date } = req.params;
//         console.log("🚀 ~ getTrajectoriesAll ~ taxi_id:", req.params)
//         const findAllPlate = await prisma.findMany({
//              where: {
//                 taxi_id: parseInt(taxi_id),
//                 date: new Date(date),
//             }
//         });
//         console.log("🚀 ~ getTrajectoriesAllID ~ findAllPlate:", findAllPlate)
//         resp.json({findAllPlate});   
//     } catch (error) {
//         console.log("🚀 ~ getIdTrajectories ~ error:", error)
//         resp.status(404).send("datos no encontados(i)");
//     }
// };

// const getTrajectoriesAllID = async (req: Request, resp: Response) => {
//     try { 
//         const { taxi_id } = req.params;
//         console.log("🚀 ~ getTrajectoriesAll ~ taxi_id:", req.params)
//         const findAllPlate = await prisma.findMany({
//              where: {
//                 taxi_id: parseInt(taxi_id),
//             }
//         });

//         console.log("🚀 ~ getTrajectoriesAllID ~ findAllPlate:", findAllPlate)
//         resp.json({findAllPlate});   
//     } catch (error) {
//         console.log("🚀 ~ getIdTrajectories ~ error:", error)
//         resp.status(404).send("datos no encontados(i)");
//     }
// };













/*
equals: Int | IntFieldRefInput,
      +     in: Int[] | ListIntFieldRefInput,
      +     notIn: Int[] | ListIntFieldRefInput,
      +     lt: Int | IntFieldRefInput,
      +     lte: Int | IntFieldRefInput,
      +     gt: Int | IntFieldRefInput,
      +     gte: Int | IntFieldRefInput,
      +     not: Int | NestedIntFilter
*/


/*
const getTrajectories = async (req: Request, resp: Response) => {
    try { 
        const skip : number = parseInt(req.query.skip as string)??0;
        const take : number = parseInt(req.query.take as string)??10;
        const { taxi_id, date, longitude, latitude } = req.body;

        const findAllPlate = await prisma.findMany({
            skip: skip,
            take: take,
            where: {
                OR:[
                {taxi_id: parseInt(taxi_id)},
                {date: date}
                ]
            },
            select: {
                date: true,
                latitude: true,
                longitude: true
            }
        });
        /*
          const findAllPlate = await prisma.findMany({
            skip: skip,
            take: take,
            where: {
                OR:[
                {taxi_id: parseInt(taxi_id)},
                {date: date}
                ]
            },
            select: {
                date: true,
                latitude: true,
                longitude: true
            }
        });
         *
        resp.status(200).json({findAllPlate});
        // const plate = req.params.plate;
        // const findAllPlate = await prismaTaxi.findMany({
        //     where: {
        //         id: idNumber,
        //         plate: plate
        //     }
        // });     
    } catch (error) {
        console.log("🚀 ~ getIdTrajectories ~ error:", error)
        resp.status(404).send("Id no encontado")
    }
};
*/








// // const getIdTrajectories = async (req: Request, resp: Response) => {
// //     try { 
// //         const { taxi_id, date } = req.body;
// //         console.log("🚀 ~ getIdTrajectories ~ taxi_id, date:", taxi_id, date)

// //         const findAllPlate = await prisma.findMany({
// //             where: {
// //                 OR:[
// //                 {taxi_id: parseInt(taxi_id)},
// //                 {date: date}
// //                 ]
// //             }
// //         });
// //         resp.json({findAllPlate});
// //         // const plate = req.params.plate;
// //         // const findAllPlate = await prismaTaxi.findMany({
// //         //     where: {
// //         //         id: idNumber,
// //         //         plate: plate
// //         //     }
// //         // });     
// //     } catch (error) {
// //         console.log("🚀 ~ getIdTrajectories ~ error:", error)
// //         resp.status(404).send("Id no encontado")
// //     }
// // };











// const getAll = async (req: Request, resp: Response) => {//: Promise<void>
//     try {
//         const skip : number = parseInt(req.query.skip as string)??0;
//         const take : number = parseInt(req.query.take as string)??10;

//         const findAllPlate = await prisma.findMany({
//             skip: skip,
//             take: take
//         });
//         resp.json({findAllPlate}); 
//     } catch (error) {
//         resp.status(404).send("No encontado")
//     }
// };

// // const getIdTrajectories = async (req: Request, resp: Response) => {
// //     try { 
// //         const idTaxi: string = req.params.id;
// //         const idNumber: number = parseInt(idTaxi);
// //         const date: string = req.params.date;
        
// //         const findAllPlate = await prisma.findUnique({
// //             where: {
// //                 id: idNumber,
// //             }
// //         });
// //         resp.json({findAllPlate});
// //         // const plate = req.params.plate;
// //         // const findAllPlate = await prismaTaxi.findMany({
// //         //     where: {
// //         //         id: idNumber,
// //         //         plate: plate
// //         //     }
// //         // });     
// //     } catch (error) {
// //         resp.status(404).send("Id no encontado")
// //     }
// // };

// const getTrajectories = async (req: Request, resp: Response) => {
//     try { 
//         const skip : number = parseInt(req.query.skip as string)??0;
//         const take : number = parseInt(req.query.take as string)??10;
//         const { taxi_id, date } = req.body;

//         const findAllPlate = await prisma.findMany({
//             skip: skip,
//             take: take,
//             where: {
//                 OR:[
//                 {taxi_id: parseInt(taxi_id)},
//                 {date: date}
//                 ]
//             }
//         });
//         resp.json({findAllPlate});
//         // const plate = req.params.plate;
//         // const findAllPlate = await prismaTaxi.findMany({
//         //     where: {
//         //         id: idNumber,
//         //         plate: plate
//         //     }
//         // });     
//     } catch (error) {
//         console.log("🚀 ~ getIdTrajectories ~ error:", error)
//         resp.status(404).send("Id no encontado")
//     }
// };

// // const getDateTrajectories = async (req: Request, resp: Response) => {
// //     try { 
// //         const date: string = req.params.date;
// //         console.log("🚀 ~ getDateTrajectories ~ date:", date)
// //         // const idNumber: number = parseInt(date)
        
// //         const findAllPlate = await prisma.findUnique({
// //             where: {
// //                 OR:[
// //                 {date: date}
// //                 ]
// //             }
// //         });
// //         resp.json({findAllPlate});
// //         // const plate = req.params.plate;
// //         // const findAllPlate = await prismaTaxi.findMany({
// //         //     where: {
// //         //         id: idNumber,
// //         //         plate: plate
// //         //     }
// //         // });     
// //     } catch (error) {
// //         console.log("🚀 ~ getDateTrajectories ~ error:", error)
// //         resp.status(404).send("Id no encontado")
// //     }
// // }
// // const getTrajectories = async (req: Request, resp: Response) => {
// //     //USAR AND PARA BUSCAR POR VARIAS COSAS
// //     try { 
// //         const date: string = req.params.date;
// //         // const idNumber: number = parseInt(date)
        
// //         // const findAllPlate = await prisma.findUnique({
// //         //     where: {
// //         //         date: date,
// //         //     }
// //         // });
// //         resp.json({date});;     
// //     } catch (error) {
// //         console.log("🚀 ~ getDateTrajectories ~ error:", error)
// //         resp.status(404).send("Id no encontado")
// //     }
// // }

// const createTrajectories = async (req: Request, resp: Response) => {
//     /*
//     SELECT * 
// FROM public."Trajectories"
// WHERE taxi_id = 5; 	
//     */
//     try {
//         const {taxi_id, date, latitude, longitude} = req.body;
//         const newDate = new Date();
//         const create = await prisma.create({            
//            data:{
//                 taxi_id: taxi_id,//PRIMERO SE CREA LA PLACA DEL TAXI Y DE AHI SE AGREGA O SE CREA ESTO NUEVO SOBRE LO CREADO
//                 date: newDate, 
//                 latitude: parseFloat(latitude),
//                 longitude: parseFloat(longitude)
//            }
//         });
//         console.log("🚀 ~ createTrajectories ~ create:", create)
//         resp.status(201).json({data: create});  
//     } catch (error: any) {
//         console.log("🚀 ~ createTrajectories ~ error:", error)
//         resp.status(500).send("No creado")
//     }
// }

// // export const updatePlate = async (req: Request, resp: Response) => {
// //     try {
// //         const findId = req.params.id;
// //         const idNumber = parseInt(findId)
// //         const body = req.body;
// //         const create = await prismaTaxi.update({where: idNumber }, {data: body});
// //         resp.status(201).json({create});
        
// //     } catch (error) {
// //         resp.status(404).send("No encontado")
// //     }
// // }

// export {getAll, getTrajectories, createTrajectories}