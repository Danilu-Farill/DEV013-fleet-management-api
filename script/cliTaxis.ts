import * as fs from 'node:fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

const prismaTaxis = new PrismaClient().taxis;
const prismaTrajectories = new PrismaClient().trajectories;

interface TaxiData {
  id: number;
  plate: string;
};

interface TrajectoryData {
  taxi_id: number;
  date: Date;
  latitude: number;
  longitude: number;
};

async function filesExists(data: TrajectoryData): Promise<boolean> {
  const record = await prismaTrajectories.findFirst({
    where: {
      taxi_id: data.taxi_id,
      date: data.date,
      latitude: data.latitude,
      longitude: data.longitude
    }
  });
  return record !== null;
};

async function createFilesPrisma(params: TaxiData[] | TrajectoryData[], model: "taxis" | "trajectories") {
  try {
    if(model === "taxis") {
      await prismaTaxis.createMany({
        data: params as TaxiData[],
        skipDuplicates: true
      })
    } else if(model === "trajectories") {
      const fileUnique: TrajectoryData[] = [];
      for (const param of params as TrajectoryData[]) {
        if(!(await filesExists(param))) {
          fileUnique.push(param);
        } else {
          console.log(`Registro duplicado ignorado: ${JSON.stringify(param)}`);
        }
      }
      if(fileUnique.length > 0) {
        await prismaTrajectories.createMany({
          data: params as TrajectoryData[],
          skipDuplicates: true
        })
      }
    }
  } catch (error) { 
    console.log("🚀 ~ createFilesPrisma ~ error:", error);
    if(error.code === "P2002") {
      console.log(`Registro duplicado ignorado`);
    } else {
      console.log("error");
      throw error;
    }
  } 
}

async function main() {
  const fileMain: string = process.argv.slice(2)[0];
  const type: "taxis" | "trajectories" = process.argv[3].split("=")[1] as "taxis" | "trajectories";
  let fileJoin: string;
  let fileExplore: string[]; 
  let fileCreateTaxis: TaxiData[] = [];
  let fileCreateTrajectories: TrajectoryData[] = [];

  fileJoin = path.join(fileMain, type);
  fileExplore = fs.readdirSync(fileJoin);
  const batchSize = 10000;

  for (let index = 0; index < fileExplore.length; index++) {
    const element : string = fileExplore[index];
    const fileJoinTxt: string = path.join(fileJoin, element);
    const fileRead: string = fs.readFileSync(fileJoinTxt, "utf-8");
    const fileSpace: string[] = fileRead.split(/\r?\n/);
    
    for (const files of fileSpace) {
      const filesSplit: string[] = files.split(",");
      if(type === "taxis" && filesSplit.length === 2) {
        const id: number = parseInt(filesSplit[0]); 
        const plate: string = filesSplit[1];
        fileCreateTaxis.push({id: id, plate: plate});
      } else if(type === "trajectories" && filesSplit.length === 4) {
        const spaces: string[] = files.split(/\s*,\s*/);
        if(spaces.length === 0) {
          return;
        }
        const dateString = filesSplit[1].replace(" ", "T");
        const taxi_id: number = parseInt(filesSplit[0]); 
        const date: Date = new Date(dateString);
        const latitude: number = parseFloat(filesSplit[2]);
        const longitude: number = parseFloat(filesSplit[3]);
        fileCreateTrajectories.push({taxi_id: taxi_id, date: date, latitude: latitude, longitude: longitude}); 
        
        if (fileCreateTrajectories.length === batchSize) {
          await createFilesPrisma(fileCreateTrajectories, type);
          fileCreateTrajectories = [];
        } 
      }
    }
    if (type === "taxis" && fileCreateTaxis.length > 0) {
      await createFilesPrisma(fileCreateTaxis, type);
      fileCreateTaxis = [];
    } else if (type === "trajectories" && fileCreateTrajectories.length > 0) {
      await createFilesPrisma(fileCreateTrajectories, type);
      fileCreateTrajectories = [];
    }
  }
}
main();