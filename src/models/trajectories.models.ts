import { PrismaClient } from '@prisma/client';
// import type { IQuery } from "../interface/interface"

const prisma = new PrismaClient().trajectories;
const query = new PrismaClient();

export const getAllTrajectories = async(skip: number, take:number): Promise<any> =>  {
  const findAllPlate = await prisma.findMany({
    skip: skip,
    take: take
  });
  return findAllPlate;
};

export const getQueryTrajectories = async(id:string, StartDate: string, endDate: string, skip: number, take:number): Promise<any> =>  {
  try { 
    const findAllPlate = await prisma.findMany({
      skip: skip,
      take: take,
      where: {
        taxi_id: parseInt(id),
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
    return findAllPlate;
  } catch (error) {
    return "data y id no encontado";
  }
};

export const getQueryRawLocation = async(skip: number, take:number): Promise<any> => {
  const findAllLocation = await query.$queryRaw`
        SELECT t.taxi_id, t."date", t.latitude, t.longitude
        FROM "Trajectories" as t
        INNER JOIN (
            SELECT tj.taxi_id, MAX(tj."date") AS max_date
            FROM "Trajectories" AS tj
            GROUP BY tj.taxi_id) as t2
            ON t.taxi_id = t2.taxi_id AND t."date" = t2.max_date
            INNER JOIN "Taxis" AS tx 
            ON t.taxi_id = tx.id
            GROUP BY t.taxi_id, t."date", t.latitude, t.longitude;
            OFFSET ${skip} LIMIT ${take}
        `
  /*
        -- 2da
        select
	t.*,
	tx.plate
from
	"Trajectories" t
join "Taxis" tx on tx.id = t.taxi_id
where t.id in (select max(id) from "Trajectories" t group by taxi_id);
        // OFFSET ${skip} LIMIT ${take};


-- 3era
select * from "Trajectories" t
join (
	select
		taxi_id, max(id) as max_id, max("date") as max_date
	from "Trajectories" t
	group by taxi_id
) as t2
on t2.max_id = t.id;
        */
  return findAllLocation;
};








// const findAllPlate = await query.$queryRaw`
//         -- SELECT t.taxi_id, t."date", t.latitude, t.longitude
//         -- FROM "Trajectories" as t
//         -- INNER JOIN (
//         --     SELECT tj.taxi_id, MAX(tj."date") AS max_date
//         --     FROM "Trajectories" AS tj
//         --     GROUP BY tj.taxi_id) as t2
//         --     ON t.taxi_id = t2.taxi_id AND t."date" = t2.max_date
//         --     INNER JOIN "Taxis" AS tx 
//         --     ON t.taxi_id = tx.id
//         --     GROUP BY t.taxi_id, t."date", t.latitude, t.longitude;
// OFFSET ${skip} LIMIT ${take};


//         SELECT t.*, tx.plate
// FROM "Trajectories" t
// JOIN "Taxis" tx ON tx.id = t.taxi_id
// WHERE t.id IN (SELECT max(id) FROM "Trajectories" t GROUP BY taxi_id)
// OFFSET ${skip} LIMIT ${take};
//         `
//         console.log("🚀 ~ getLocation ~ findAllPlate:", {findAllPlate: {skip:skip, take:take}})
//         /*
//         -- 2da
//         select
// 	t.*,
// 	tx.plate
// from
// 	"Trajectories" t
// join "Taxis" tx on tx.id = t.taxi_id
// where t.id in (select max(id) from "Trajectories" t group by taxi_id);


// -- 3era
// select * from "Trajectories" t
// join (
// 	select
// 		taxi_id, max(id) as max_id, max("date") as max_date
// 	from "Trajectories" t
// 	group by taxi_id
// ) as t2
// on t2.max_id = t.id;
//         */
//         resp.status(200).json({findAllPlate});     
//     } catch (error) {
//         console.log("🚀 ~ getIdTrajectories ~ error:", error)
//         resp.status(404).send("location no encontado")
//     }

