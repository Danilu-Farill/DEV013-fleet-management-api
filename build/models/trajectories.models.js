"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryTrajectories = exports.getAllTrajectories = void 0;
const client_1 = require("@prisma/client");
// import type { IQuery } from "../interface/interface"
const prisma = new client_1.PrismaClient().trajectories;
// const query = new PrismaClient();
const getAllTrajectories = (skip, take) => __awaiter(void 0, void 0, void 0, function* () {
    const findAllPlate = yield prisma.findMany({
        skip: skip,
        take: take
    });
    return findAllPlate;
});
exports.getAllTrajectories = getAllTrajectories;
const getQueryTrajectories = (id, StartDate, endDate, skip, take) => __awaiter(void 0, void 0, void 0, function* () {
    const findAllPlate = yield prisma.findMany({
        skip: skip,
        take: take,
        where: {
            taxi_id: parseInt(id),
            date: {
                gte: StartDate, //MAYOR IGUAL QUE
                lt: endDate //menor que
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
});
exports.getQueryTrajectories = getQueryTrajectories;
// export const getQueryRawLocation = async(skip: number, take:number): Promise<any> => {
//   const findAllLocation = await query.$queryRaw`
//         SELECT t.taxi_id, t."date", t.latitude, t.longitude
//         FROM "Trajectories" as t
//         INNER JOIN (
//             SELECT tj.taxi_id, MAX(tj."date") AS max_date
//             FROM "Trajectories" AS tj
//             GROUP BY tj.taxi_id) as t2
//             ON t.taxi_id = t2.taxi_id AND t."date" = t2.max_date
//             INNER JOIN "Taxis" AS tx 
//             ON t.taxi_id = tx.id
//             GROUP BY t.taxi_id, t."date", t.latitude, t.longitude;
//             OFFSET ${skip} LIMIT ${take}
//         `
//   /*
//         -- 2da
//         select
// 	t.*,
// 	tx.plate
// from
// 	"Trajectories" t
// join "Taxis" tx on tx.id = t.taxi_id
// where t.id in (select max(id) from "Trajectories" t group by taxi_id);
//         // OFFSET ${skip} LIMIT ${take};
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
//   return findAllLocation;
// };
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
