import { PrismaClient } from '@prisma/client';
// import type { IQuery } from "../interface/interface"

const prisma = new PrismaClient().trajectories;

export const getAllTrajectories = async(skip: number, take:number): Promise<any> =>  {
  const findAllPlate = await prisma.findMany({
    skip: skip,
    take: take
  });
  return findAllPlate;
};

export const getQueryTrajectories = async(id:string, StartDate: string, endDate: string, skip: number, take:number): Promise<any> =>  {
  const findAllPlate = await prisma.findMany({
    skip: skip,
    take: take,
    where: {
      taxi_id: parseInt(id),
      date: {
        gte: StartDate,
        lt: endDate
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
};

