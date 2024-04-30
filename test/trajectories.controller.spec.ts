// import { getLocation } from "../src/controller/trajectories.controller";
import { getAllTrajectories, /*getQueryRawLocation*/ getQueryTrajectories } from "../src/models/trajectories.models";
// import { Request, Response } from "express";

/*
jest.mock('@prisma/client', () => {
    const mockTaxis = {
        trajectories: {
            findMany: jest.fn().mockResolvedValue(async ({where}: any) => {
                if(where && where.date && where.date.gte === "2008-02-02" && where.date.lt === "2008-02-03") {
                return [
                    {id: 1020, date: "2008-02-02", latitude: 116.224, longitude: 36.888},
                    {id: 2244, date: "2009-04-04", latitude: 114.246, longitude: 28.448},
                    {id: 1020, date: "2008-02-02", latitude: 118.123, longitude: 20.666},
                    {id: 1020, date: "2008-02-02", latitude: 120.456, longitude: 24.222},
                ];
            }
            return [];
            }),
        }
    };
    return {
        PrismaClient: jest.fn(() => mockTaxis),
    };
});
*/

jest.mock('@prisma/client', () => {/*Aquí se esta mockeando el módulo @prisma/client. Básicamente, se le esta diciendo a Jest que cuando se importe @prisma/client en tu archivo, en lugar de importar el módulo real, debería importar el módulo mockeado que estás definiendo. */
  const mockTaxis = {
    trajectories: {
      findMany: jest.fn().mockResolvedValue([//mockResolvedValue(valor): Configura la función mock para que siempre resuelva con el valor dado.
        {id: 1020, date: "2008-02-02", latitude: 116.224, longitude: 36.888},
        {id: 2244, date: "2009-04-04", latitude: 114.246, longitude: 28.448},
        {id: 1020, date: "2008-02-02", latitude: 118.123, longitude: 20.666},
        {id: 1020, date: "2008-02-02", latitude: 120.456, longitude: 24.222},
      ]),
    },
    trajectoriesId: {
      findMany: jest.fn().mockResolvedValue(
        [//mockResolvedValue(valor): Configura la función mock para que siempre resuelva con el valor dado.
          {date: "2008-02-02", id: 1020, latitude: 116.224, longitude: 36.888},
          {date: "2009-04-04", id: 2244, latitude: 114.246, longitude: 28.448},
          {date: "2008-02-02", id: 1020, latitude: 118.123, longitude: 20.666},
          {date: "2008-02-02", id: 1020, latitude: 120.456, longitude: 24.222},
        ]),
            
    },
    trajectoriesLocation: {
      finUnique: jest.fn().mockResolvedValue(
        [
          {
            "id": 7165,
            "taxi_id": 8935,
            "date": "2008-02-08T17:37:28.000Z",
            "latitude": 116.40166,
            "longitude": 39.99269,
            "plate": "GAJG-2446"
          },
          {
            "id": 14639,
            "taxi_id": 7249,
            "date": "2008-02-08T17:36:33.000Z",
            "latitude": 116.291,
            "longitude": 39.88672,
            "plate": "CNCJ-2997"
          }
        ]),
            
    }
  };
  return {
    PrismaClient: jest.fn(() => mockTaxis),//Estás mockeando el constructor PrismaClient para que, en lugar de devolver una nueva instancia del cliente Prisma real, devuelva tu objeto mockTaxis
  };
});

describe('Trajectories', () => {
  describe('getAll', () => {
    it('Debería regresar todas las trajectorias páginadas', async() => {
      // const req = {
      //     query: {
      //         skip: 0,
      //         take: 2,
      //     },
      // } as unknown as number//Estás definiendo un objeto req que simula una solicitud HTTP. as unknown as Request es una forma de decirle a TypeScript que, aunque TypeScript piense que el tipo de req es unknown, tú estás seguro de que es un objeto Request
      // const resp = {
      //     status: jest.fn().mockReturnThis(),//Crea una función mock para el método status, que devuelve this, permitiendo el encadenamiento de métodos.  crea una función mock que devuelve this cuando se llama. Esto es útil para encadenar llamadas de método en las pruebas
      //     json: jest.fn(), //Crea una función mock para el método json
      // } as unknown as number
      const skip = 0;
      const take = 2;
    
      const resp = await getAllTrajectories(skip, take);
      // expect(typeof resp[0].latitude).toBe("number");
      // expect(typeof resp[0].longitude).toBe("number");
      expect(typeof resp[0].date).toBe("string");
      expect(typeof resp[0].id).toBe("number");
      expect([resp[0], resp[1]]).toEqual(
        [
          {id: 1020, date: "2008-02-02", latitude: 116.224, longitude: 36.888},
          {id: 2244, date: "2009-04-04", latitude: 114.246, longitude: 28.448},
        ]
      );
      expect(resp[1]).toEqual({id: 2244, date: "2009-04-04", latitude: 114.246, longitude: 28.448});
      expect(resp[0]).not.toEqual({id: 2244, date: "2009-04-04", latitude: 114.246, longitude: 28.448},);
      expect(resp[0].longitude).toBe(36.888);
      expect(resp[0].longitude).not.toBe("36.888");
      // expect(resp[1]).toEqual(
      //     // {id: 1020, date: "2008-02-02", latitude: 116.224, longitude: 36.888},
      //     {id: 2244, date: "2009-04-04", latitude: 114.246, longitude: 28.448},
      //     // {id: 1020, date: "2008-02-02", latitude: 118.123, longitude: 20.666},
      //     // {id: 1020, date: "2008-02-02", latitude: 120.456, longitude: 24.222},
      // );
      // expect(resp[0]).not.toEqual({id: 2244, date: "2009-04-04", latitude: 114.246, longitude: 28.448},);
      // expect(resp[0].longitude).not.toEqual(28.448);
    });
  });
  describe('getTrajectories', () => {
    it('Debería regresar las trajectorias por id, date y páginadas', async() => {
      const skip = 0;
      const take = 3;
      const id = 1020 as any;
      const endDate = "2008-02-02";
      const startDate = "2008-02-02";
      //QUIERO COMPARAR QUE LA FECHA 2009 NO DEBERÍA APARECER
      const resp = await getQueryTrajectories(id, endDate, startDate, skip, take);
      expect([resp[0], resp[2], resp[3]]).toEqual([
        {id: 1020, date: "2008-02-02", latitude: 116.224, longitude: 36.888},
        {id: 1020, date: "2008-02-02", latitude: 118.123, longitude: 20.666},
        {id: 1020, date: "2008-02-02", latitude: 120.456, longitude: 24.222},
      ]);
      expect(resp[0]).not.toContainEqual(expect.not.arrayContaining([//  SE SUPONE NO DEBERÍA INCLUIR NINGUNO DE ESTOS EN LA POSICIÓN 0 PERO SPONGO EL PRIMERO ME SIGUE SALIENDO BIEN
        {id: 2244, date: "2009-04-04", latitude: 114.246, longitude: 28.448}, 
        {id: 1020, date: "2008-02-02", latitude: 118.123, longitude: 20.666},
        {id: 1020, date: "2008-02-02", latitude: 120.456, longitude: 24.222}
      ])
      )
    })
  });
  // describe('getLocation', () => {
  //     it('Debería regresar la última trayectoria de cada taxi páginadas', async() => {
  //         const req = {
  //             query: {
  //                 skip: 0,
  //                 take: 3,
  //             }
  //         } as unknown as Request;
  //         const resp = {
  //             status: jest.fn().mockReturnThis(),
  //             json: jest.fn()
  //         } as unknown as Response
  // //QUIERO COMPARAR QUE LA FECHA 2009 NO DEBERÍA APARECER
  //         await getLocation(req, resp);
  //         console.log("🚀 ~ it ~ resp:", resp)
  //         expect(resp).toEqual([
  //             {id: 1020, date: "2008-02-02", latitude: 116.224, longitude: 36.888},
  //             {id: 1020, date: "2008-02-02", latitude: 118.123, longitude: 20.666},
  //             {id: 1020, date: "2008-02-02", latitude: 120.456, longitude: 24.222},
  //         ]);
  //         // expect(resp[0]).not.toContainEqual({id: 2244, date: "2009-04-04", latitude: 114.246, longitude: 28.448})
  //     })
  // });
  //     describe('createPlate', () => {
  //         it('Debería crear un taxi', async() => {
  //             const req = {
  //                 body: {
  //                     id: 3,
  //                     plate: "TAX-56",
  //                 },
  //             } as unknown as Request
  //             const resp = {
  //                 status: jest.fn().mockReturnThis(),
  //                 json: jest.fn(), 
  //             } as unknown as Response
      
  //             await createPlate(req, resp)
  //             expect(resp.status).toHaveBeenCalledWith(201)
  //             expect(resp.json).toHaveBeenCalledWith([{data:{id: 3, plate: "TAX-56"}}])
  //         })
  //     });
  //     describe('updatePlate', () => {
  //         it('Debería actualizar una placa de taxi', async() => {
  //             const req = {
  //                 params: {
  //                     id: 1
  //                 },
  //                 body: {
  //                     id: 1,
  //                     plate: "TAX-24",
  //                 },
  //             } as unknown as Request
  //             const resp = {
  //                 status: jest.fn().mockReturnThis(),
  //                 json: jest.fn(), 
  //             } as unknown as Response
  //             console.log(resp.status, "resp.status")
      
  //             await updatePlate(req, resp)
  //             expect(resp.status).toHaveBeenCalledWith(200)
  //             expect(resp.json).toHaveBeenCalledWith([{id: 1, plate: "TAX-24"}])
  //         })
  //     });
  //     describe('deletePlate', () => {
  //         it('Debería eliminar una placa de taxi', async() => {
  //             const req = {
  //                 params: {
  //                     id: 1
  //                 },
  //             } as unknown as Request
  //             const resp = {
  //                 status: jest.fn().mockReturnThis(),
  //                 json: jest.fn(), 
  //             } as unknown as Response
  //             console.log(resp.status, "resp.status")
    
//             await deletePlate(req, resp)
//             expect(resp.status).toHaveBeenCalledWith(200)
//             expect(resp.json).toHaveBeenCalledWith([{id: 1, plate: "TAX-24"}])
//         })
//     })
});


/*
Expectation: expect(...): Esto indica que estás realizando una expectativa sobre un valor.
not.arrayContaining: Es una función utilizada para verificar que el array no contenga ciertos elementos.
Array de elementos excluidos: Se pasa como argumento a not.arrayContaining. Este array contiene los elementos que no deben estar presentes en el array esperado.
Cuando usas expect.not.arrayContaining, Jest verifica que el array esperado no contenga ninguno de los elementos incluidos en el array de elementos excluidos. Si el array esperado no contiene ninguno de estos elementos, la expectativa se considera exitosa. Si alguno de los elementos excluidos está presente en el array esperado, la expectativa fallará.
*/