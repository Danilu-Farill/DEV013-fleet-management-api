import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { getAllTrajectories, getQueryTrajectories, /*getQueryRawLocation*/ } from "../models/trajectories.models"

const prisma = new PrismaClient().trajectories;
const query = new PrismaClient();


//skip: APARTIR DE QUE NÚMERO DE PÁGINA SE MUESTRA
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

// const getTrajectories = async (req: Request, resp: Response) => {
//     try { 
//         const skip : number = parseInt(req.query.skip as string)??0;
//         const take : number = parseInt(req.query.take as string)??10;
//         // const taxi_id = req.params.taxi_id;
//         const taxi_id = req.query.taxi_id as string;
//         const date = req.query.date as string;
//         const endDate = new Date(date);
//         const StartDate = new Date(date);
//         endDate.setDate(endDate.getDate()+1);

//         const findAllPlate = await prisma.findMany({
//             skip: skip,
//             take: take,
//             where: {
//                 taxi_id: parseInt(taxi_id),
//                 date: {
//                     gte: StartDate,//MAYOR IGUAL QUE
//                     lt: endDate//menor que
//                 }
//             },
//             select: {
//                 date: true,
//                 taxi_id: true,
//                 latitude: true,
//                 longitude: true
//             }
//         });
//         resp.status(200).json({findAllPlate});    
//     } catch (error) {
//         console.log("🚀 ~ getIdTrajectories ~ error:", error)
//         resp.status(404).send("data y id no encontado")
//     }
// };

const getTrajectories = async(req: Request, resp: Response) => {
  try { 
    const skip : number = parseInt(req.query.skip as string)??0;
    const take : number = parseInt(req.query.take as string)??10;
    // const taxi_id = req.params.taxi_id;
    const taxi_id = req.query.taxi_id as string;
    const date = req.query.date as string;
    const endDate = new Date(date) as any;
    const startDate = new Date(date) as any;
    endDate.setDate(endDate.getDate() + 1);
    if(!skip || !take || !taxi_id || !date) {
      return resp.status(404).json("Faltan querys")
    }
    const findAllPlate = await getQueryTrajectories(taxi_id, startDate, endDate, skip, take);
    return resp.status(200).json(findAllPlate);    
  } catch (error) {
    resp.status(400).send("data y id no encontrado")
  }
};

const getLocation = async (req: Request, resp: Response) => {
  try { 
    const skip : number = parseInt(req.query.skip as string)??0;
    const take : number = parseInt(req.query.take as string)??10;
    // const findLocation = getQueryRawLocation(skip, take)
    if(!skip || !take){
      return resp.status(404).json("Falta especificar páginas")
    }
    const findLocation = await query.$queryRaw`
        SELECT t.taxi_id, t."date", t.latitude, t.longitude
        FROM "Trajectories" as t
        INNER JOIN (
            SELECT tj.taxi_id, MAX(tj."date") AS max_date
            FROM "Trajectories" AS tj
            GROUP BY tj.taxi_id) as t2
            ON t.taxi_id = t2.taxi_id AND t."date" = t2.max_date
            INNER JOIN "Taxis" AS tx 
            ON t.taxi_id = tx.id
            GROUP BY t.taxi_id, t."date", t.latitude, t.longitude
            OFFSET ${skip} LIMIT ${take}
        --  SELECT t.*, tx.plate
        --  FROM "Trajectories" t
        --   JOIN "Taxis" tx ON tx.id = t.taxi_id
        --   WHERE t.id IN (SELECT max(id) FROM "Trajectories" t GROUP BY taxi_id)
           `
    resp.status(200).json(findLocation);     
  } catch (error) {
    resp.status(400).json("location no encontrado")
  }
};

const createTrajectories = async (req: Request, resp: Response) => {
  /*
    SELECT * 
FROM public."Trajectories"
WHERE taxi_id = 5; 	
    */
  try {
    const {taxi_id, date, latitude, longitude } = req.body;
    const newDate = new Date(date);
    const create = await prisma.create({ 
      data:{
        taxi_id: taxi_id,//PRIMERO SE CREA LA PLACA DEL TAXI Y DE AHI SE AGREGA O SE CREA ESTO NUEVO SOBRE LO CREADO
        date: newDate, 
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }
    });
    resp.status(201).json(create);  
  } catch (error: any) {
    resp.status(500).send("No creado")
  }
};

// const putTrajectories = async (req: Request, resp: Response) => {
//     try {
//         const id: string = req.params.id;
//         const taxi_id = req.body.taxi_id;

//         // const taxi_id: string = req.params.taxi_id;
//         const deleteTrajectories = await prisma.delete({
//             where: {
//                 id: parseInt(id)
//             },
//             data: {
//                 taxi_id: taxi_id
//             }
//     });
//         resp.status(200).json({deleteTrajectories})
        
//     } catch (error) {
//         console.log("🚀 ~ createTrajectories ~ error:", error)
//         resp.status(500).send("No borrado")
//     }
// }

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
    // const plate = req.params.plate;
    // const findAllPlate = await prismaTaxi.findMany({
    //     where: {
    //         id: idNumber,
    //         plate: plate
    //     }
    // });     
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

// const lastTrajectory = async (req: Request, resp: Response) => {
// // const lastTrajectory: RequestHandler = async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query
//     const skipResults = (+page - 1) * Number(limit)
//     const findTrajectories = await prisma.findMany({
//       include: {
//         Taxis: true
//       },
//       // where: {
//       //     gte: 
//       // },
//       // select: {
//       //     // taxi_id: true,
//       //     // longitude: true,
//       //     // latitude: true,
//       //     // date: true,
//       //     taxis: {
//       //         select: {
//       //             plate: true
//       //         }
//       //     }
//       // },
//       skip: skipResults,
//       take: (+limit > 0) ? +limit : undefined
//     })
//     //         // const result = await prisma.$queryRaw`select * from trajectories t
//     //         // join (
//     //         //     select
//     //         //         taxi_id, max(id) as id_, max("date") as max_date
//     //         //     from trajectories t
//     //         //     group by taxi_id
//     //         // ) as t2
//     //         // on t2.id_ = t.id;`
//     //     //     const result = await prisma.$queryRaw`select
//     //     //     t.*,
//     //     //     tx.plate
//     //     // from
//     //     //     trajectories t
//     //     // join taxis tx on tx.id = t.taxi_id
//     //     // where t.id in (select max(id) from trajectories t group by taxi_id);`
//     // // const result = await prisma.$queryRaw`select t.taxi_id, t."date", t.latitude, t.longitude, tx.plate
//     //         // from trajectories as t
//     //         // inner join (
//     //         //     select tj.taxi_id, MAX(tj."date") as max_date
//     //         //     from trajectories as tj
//     //         //     group by tj.taxi_id
//     //         // ) as t2
//     //         // on t.taxi_id = t2.taxi_id and t."date" = t2.max_date
//     //         // inner join taxis as tx
//     //         // on t.taxi_id = tx.id
//     //         // group by t.taxi_id, t."date", t.latitude, t.longitude, tx.plate;`
//     resp.json({data: findTrajectories})
//   } catch (error) {
//     resp.status(500).send()
//   }
// }

export {getAll, getBody, createTrajectories, getID, getDate, getTrajectories, getLocation, deleteTrajectories, /*lastTrajectory*/}


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





/*
const getLocation = async (req: Request, resp: Response) => {
    try { 
        const skip : number = parseInt(req.query.skip as string)??0;
        const take : number = parseInt(req.query.take as string)??10;
           const findAllPlate = await query.$queryRaw`
        -- SELECT t.taxi_id, t."date", t.latitude, t.longitude
        -- FROM "Trajectories" as t
        -- INNER JOIN (
        --     SELECT tj.taxi_id, MAX(tj."date") AS max_date
        --     FROM "Trajectories" AS tj
        --     GROUP BY tj.taxi_id) as t2
        --     ON t.taxi_id = t2.taxi_id AND t."date" = t2.max_date
        --     INNER JOIN "Taxis" AS tx 
        --     ON t.taxi_id = tx.id
        --     GROUP BY t.taxi_id, t."date", t.latitude, t.longitude;
                // OFFSET ${skip} LIMIT ${take};


        SELECT t.*, tx.plate
        FROM "Trajectories" t
        JOIN "Taxis" tx ON tx.id = t.taxi_id
        WHERE t.id IN (SELECT max(id) FROM "Trajectories" t GROUP BY taxi_id);
                // OFFSET ${skip} LIMIT ${take};

        `
        console.log("🚀 ~ getLocation ~ findAllPlate:", {findAllPlate: {skip:skip, take:take}})
        /*
        -- 2da
        select
	t.*,
	tx.plate
from
	"Trajectories" t
join "Taxis" tx on tx.id = t.taxi_id
where t.id in (select max(id) from "Trajectories" t group by taxi_id);


-- 3era
select * from "Trajectories" t
join (
	select
		taxi_id, max(id) as max_id, max("date") as max_date
	from "Trajectories" t
	group by taxi_id
) as t2
on t2.max_id = t.id;
        *
resp.status(200).json({findAllPlate});     
} catch (error) {
    console.log("🚀 ~ getIdTrajectories ~ error:", error)
    resp.status(404).send("location no encontado")
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