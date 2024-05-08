// CON DATA MOCK DE PRISMA
import { getTaxis, createTaxi, updateTaxi } from "../functions-without-context"
import { prismaMock } from "../singleton"

test('Debería obtener el id y plate', async() => {
  const taxi: any = {
    id: 1,
    plate: "DÍA-2468",
    acceptTermsAndConditions: true,
  };
  prismaMock.taxis.findMany.mockResolvedValue(taxi)

  await expect(getTaxis(taxi)).resolves.toEqual({
    id: 1,
    plate: "DÍA-2468",
    acceptTermsAndConditions: true,
  });
});

test('Debería obtener solo la placa', async() => {
  const taxi: any = {
    id: 1,
    plate: "DÍA-2468",
    acceptTermsAndConditions: true,
  };
  prismaMock.taxis.findMany.mockResolvedValue(taxi.plate)
  await expect(getTaxis(taxi)).resolves.toBe("DÍA-2468")
});

test('Debería obtener todas las placas y id', async() => {
  const taxi: any = {
    id: 1,
    plate: "DÍA-2468",
    acceptTermsAndConditions: true,
  };
  //   const taxi2: any = {
  //     id: 2,
  //     plate: "DÍA-1357",
  //     acceptTermsAndConditions: true,
  //   };
  const taxisAll = [{
    id: 1,
    plate: "DÍA-2468",
    acceptTermsAndConditions: true
  },
  {
    id: 2,
    plate: "DÍA-1357",
    acceptTermsAndConditions: true,
  }]
  prismaMock.taxis.findMany.mockResolvedValue(taxisAll)

  await expect(getTaxis(taxi)).resolves.toEqual([{
    id: 1,
    plate: "DÍA-2468",
    acceptTermsAndConditions: true
  },
  {
    id: 2,
    plate: "DÍA-1357",
    acceptTermsAndConditions: true,
  }]
  );
});

test('should create new taxi', async() => {
  const taxi: any = {
    id: 1,
    plate: "DÍA-2468",
  };
  const taxi2: any = {};
  const taxis2: any = [{
    id: 1,
    plate: "DÍA-2468",
  },
  {
    id: 2,
    plate: "DÍA-1357",
  }];

  prismaMock.taxis.create.mockResolvedValue(taxi)

  await expect(createTaxi(taxis2)).resolves.toEqual({
    id: 1,
    plate: "DÍA-2468",
  }
  );
  // if(taxi2 == null) {
  //     prismaMock.taxis.create.mockResolvedValue(taxi2)
  //     return new Error("400, falta body")
  // } else {
  prismaMock.taxis.create.mockResolvedValue(taxi2)
  // }
  await expect(createTaxi(taxi2)).resolves.toEqual({})
});

test('should update a taxi', async() => {
  const taxi: any = {
    id: 1,
    plate: "DÍA-24",
    acceptTermsAndConditions: true
  };
  // const taxi2: any = {};
  // const taxis2: any = [{
  //   id: 1,
  //   plate: "DÍA-2468",
  // },
  // {
  //   id: 2,
  //   plate: "DÍA-1357",
  // }];

  prismaMock.taxis.update.mockResolvedValue(taxi)

  await expect(updateTaxi(taxi)).resolves.toEqual({
    id: 1,
    plate: "DÍA-24",
    acceptTermsAndConditions: true
  });
  // prismaMock.taxis.create.mockResolvedValue(taxi2)
  // await expect(createTaxi(taxi2)).resolves.toEqual({})
});




//mock con jest

import { Request, Response } from "express";
import { getAllPlate, getIdTaxis, createPlate, updatePlate, deletePlate } from "../src/controller/taxi.controller";
// import { getAllTrajectories, getQueryTrajectories } from "../src/models/trajectories.models";

//En TypeScript, unknown es un tipo que representa un valor que se desconoce en tiempo de diseño. Es más restrictivo que any, lo que significa que no puedes hacer operaciones arbitrarias en un valor de tipo unknown sin primero comprobar su tipo. Se usa para variables que podrían tener cualquier tipo y se espera que se compruebe su tipo antes de usarlas.
//Estás diciendo que req es de tipo Request, pero debido a que TypeScript no tiene suficiente información para saberlo, usas as unknown as Request para afirmar que estás seguro de que req es un objeto de tipo Request
// const mockFindMany = jest.fn()
//jest.fn()   Crea una función mock.
//jest.mock() es una función de Jest que permite reemplazar un módulo con una versión mockeada durante las pruebas. Esto significa que cuando tu código importa el módulo mockeado, en realidad está importando tu versión mockeada en lugar del módulo real.
//primero mockeas el módulo @prisma/client con jest.mock. Luego, en tu prueba, cuando importas getAllPlate, en realidad estás importando la versión mockeada de @prisma/client.
//Esto permite que cuando getAllPlate llame a prisma.taxis.findMany({}), en realidad esté llamando a tu función mockeada findMany que devuelve datos ficticios, en lugar de hacer una llamada real a la base de datos.
//


jest.mock('@prisma/client', () => {/*Aquí se esta mockeando el módulo @prisma/client. Básicamente, se le esta diciendo a Jest que cuando se importe @prisma/client en tu archivo, en lugar de importar el módulo real, debería importar el módulo mockeado que estás definiendo. */
  const taxi1 = [
    {id: 1, plate: "TAX-12"},
    {id: 2, plate: "TAX-34"}]
  const mockTaxis = {
    taxis: {
      findMany: jest.fn().mockResolvedValue([//mockResolvedValue(valor): Configura la función mock para que siempre resuelva con el valor dado.
        {id: 1, plate: "TAX-12"},
        {id: 2, plate: "TAX-34"}
      ]),
      findUnique: jest.fn().mockResolvedValue([
        {id: 1, plate: "TAX-12"},
      ]),
      create: jest.fn().mockResolvedValue([
        {data:{id: 3, plate: "TAX-56"}},
        // {id: 4, plate: "TAX-78"}
      ]),
      update: jest.fn().mockResolvedValue([
        {id: 1, plate: "TAX-24"}
      ]),
      delete: jest.fn().mockResolvedValue([
        {id: 1, plate: "TAX-24"}
      ])
    },
  };
  return {
    PrismaClient: jest.fn(() => mockTaxis),//Estás mockeando el constructor PrismaClient para que, en lugar de devolver una nueva instancia del cliente Prisma real, devuelva tu objeto mockTaxis
  };
});

describe('Taxis', () => {
  describe('getAllPlates', () => {
    it('Debería regresar todos los taxis páginados', async() => {
      const req = {
        query: {
          skip: 0,
          take: 2,
        },
      } as unknown as Request//Estás definiendo un objeto req que simula una solicitud HTTP. as unknown as Request es una forma de decirle a TypeScript que, aunque TypeScript piense que el tipo de req es unknown, tú estás seguro de que es un objeto Request
      const resp = {
        status: jest.fn().mockReturnThis(),//Crea una función mock para el método status, que devuelve this, permitiendo el encadenamiento de métodos.  crea una función mock que devuelve this cuando se llama. Esto es útil para encadenar llamadas de método en las pruebas
        json: jest.fn(), //Crea una función mock para el método json
      } as unknown as Response
      // // console.log("🚀 ~ it ~ resp:", resp.json()[0].plate)
      // await getAllPlate(req, resp)
      // expect(resp.status).toHaveBeenCalledWith(200);
      // expect(typeof resp.json()[0].plate).toBe("string")
      // expect(typeof resp.json()).toBe("string")
    
      await getAllPlate(req, resp)
      expect(resp.status).toHaveBeenCalledWith(200);
      expect(resp.json).toHaveBeenCalledWith([
        {id: 1, plate: "TAX-12"},
        {id: 2, plate: "TAX-34"}
      ])
    })
  });
  describe('getIdTaxis', () => {
    it('Debería regresar un taxi por id', async() => {
      const req = {
        params: {
          id: 1
        },
      } as unknown as Request
      const resp = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(), 
      } as unknown as Response
      await getIdTaxis(req, resp)
      expect(resp.json).toHaveBeenCalledWith([{id: 1, plate: "TAX-12"}])
    })
  });
  describe('createPlate', () => {
    it('Debería crear un taxi', async() => {
      const req = {
        body: {
          id: 3,
          plate: "TAX-56",
        },
      } as unknown as Request
      const resp = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(), 
      } as unknown as Response
    
      await createPlate(req, resp)
      expect(resp.status).toHaveBeenCalledWith(201)
      expect(resp.json).toHaveBeenCalledWith([{data:{id: 3, plate: "TAX-56"}}])
    })
  });
  describe('updatePlate', () => {
    it('Debería actualizar una placa de taxi', async() => {
      const req = {
        params: {
          id: 1
        },
        body: {
          id: 1,
          plate: "TAX-24",
        },
      } as unknown as Request
      const resp = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(), 
      } as unknown as Response

      await updatePlate(req, resp)
      expect(resp.status).toHaveBeenCalledWith(200)
      expect(resp.json).toHaveBeenCalledWith([{id: 1, plate: "TAX-24"}])
    })
  });
  describe('deletePlate', () => {
    it('Debería eliminar una placa de taxi', async() => {
      const req = {
        params: {
          id: 1
        },
      } as unknown as Request
      const resp = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(), 
      } as unknown as Response
    
      await deletePlate(req, resp)
      expect(resp.status).toHaveBeenCalledWith(200)
      expect(resp.json).toHaveBeenCalledWith([{id: 1, plate: "TAX-24"}])
    })
  })
});
// tipo string, que tenga body, si me trae id plate
// e2e statuscode, propiedad, json, query params


// jest.mock('@prisma/client', () => {/*Aquí se esta mockeando el módulo @prisma/client. Básicamente, se le esta diciendo a Jest que cuando se importe @prisma/client en tu archivo, en lugar de importar el módulo real, debería importar el módulo mockeado que estás definiendo. */
//     const mockTaxis = {
//         trajectories: {
//             findMany: jest.fn().mockResolvedValue([//mockResolvedValue(valor): Configura la función mock para que siempre resuelva con el valor dado.
//                 {id: 1, taxi_id: 1, date: "2008-02-02", latitude: 116.224, longitude: 36.888},
//                 {id: 2, taxi_id: 2, date: "2009-04-04", latitude: 114.246, longitude: 28.448}
//             ]),
//             // findUnique: jest.fn().mockResolvedValue([
//             //     {id: 1, plate: "TAX-12"},
//             // ]),
//             // create: jest.fn().mockResolvedValue([
//             //     {data:{id: 3, plate: "TAX-56"}},
//             //     // {id: 4, plate: "TAX-78"}
//             // ]),
//             // update: jest.fn().mockResolvedValue([
//             //     {id: 1, plate: "TAX-24"}
//             // ]),
//             // delete: jest.fn().mockResolvedValue([
//             //     {id: 1, plate: "TAX-24"}
//             // ])
//         },
//     };
//     return {
//         PrismaClient: jest.fn(() => mockTaxis),//Estás mockeando el constructor PrismaClient para que, en lugar de devolver una nueva instancia del cliente Prisma real, devuelva tu objeto mockTaxis
//     };
// });

// describe('Trajectories', () => {
//     describe('getAll', () => {
//         it('Debería regresar todas las trajectorias páginadas', async() => {
//             // const req = {
//             //     query: {
//             //         skip: 0,
//             //         take: 2,
//             //     },
//             // } as unknown as number//Estás definiendo un objeto req que simula una solicitud HTTP. as unknown as Request es una forma de decirle a TypeScript que, aunque TypeScript piense que el tipo de req es unknown, tú estás seguro de que es un objeto Request
//             // const resp = {
//             //     status: jest.fn().mockReturnThis(),//Crea una función mock para el método status, que devuelve this, permitiendo el encadenamiento de métodos.  crea una función mock que devuelve this cuando se llama. Esto es útil para encadenar llamadas de método en las pruebas
//             //     json: jest.fn(), //Crea una función mock para el método json
//             // } as unknown as number
//             const skip = 0;
//             const take = 4;
    
//             const resp = await getAllTrajectories(skip, take)
//             expect(resp).toEqual([
//                 {id: 1020, date: "2008-02-02", latitude: 116.224, longitude: 36.888},
//                 {id: 2244, date: "2009-04-04", latitude: 114.246, longitude: 28.448},
//                 {id: 1020, date: "2008-02-02", latitude: 118.123, longitude: 20.666},
//                 {id: 1020, date: "2008-02-02", latitude: 120.456, longitude: 24.222},
//             ])
//         })
//     });
//     describe('getTrajectories', () => {
//         it('Debería regresar las trajectorias por id, date y paginación', async() => {
//             // const req = {
//             //     params: {
//             //         id: 1
//             //     },
//             // } as unknown as Request
//             // const resp = {
//             //     status: jest.fn().mockReturnThis(),
//             //     json: jest.fn(), 
//             // } as unknown as Response
//             const id = "1020";
//             const endDate = "2008-02-02";
//             const startDate = "2008-02-02";
//             const skip = 0;
//             const take = 3;
    
//             const resp = await getQueryTrajectories(id, endDate, startDate, skip, take)
//             expect(resp).toEqual([
//                 {id: 1020, date: "2008-02-02", latitude: 116.224, longitude: 36.888},
//                 {id: 1020, date: "2008-02-02", latitude: 118.123, longitude: 20.666},
//                 {id: 1020, date: "2008-02-02", latitude: 120.456, longitude: 24.222},
//             ])
//         })
//     });
// //     describe('createPlate', () => {
// //         it('Debería crear un taxi', async() => {
// //             const req = {
// //                 body: {
// //                     id: 3,
// //                     plate: "TAX-56",
// //                 },
// //             } as unknown as Request
// //             const resp = {
// //                 status: jest.fn().mockReturnThis(),
// //                 json: jest.fn(), 
// //             } as unknown as Response
    
// //             await createPlate(req, resp)
// //             expect(resp.status).toHaveBeenCalledWith(201)
// //             expect(resp.json).toHaveBeenCalledWith([{data:{id: 3, plate: "TAX-56"}}])
// //         })
// //     });
// //     describe('updatePlate', () => {
// //         it('Debería actualizar una placa de taxi', async() => {
// //             const req = {
// //                 params: {
// //                     id: 1
// //                 },
// //                 body: {
// //                     id: 1,
// //                     plate: "TAX-24",
// //                 },
// //             } as unknown as Request
// //             const resp = {
// //                 status: jest.fn().mockReturnThis(),
// //                 json: jest.fn(), 
// //             } as unknown as Response
// //             console.log(resp.status, "resp.status")
    
// //             await updatePlate(req, resp)
// //             expect(resp.status).toHaveBeenCalledWith(200)
// //             expect(resp.json).toHaveBeenCalledWith([{id: 1, plate: "TAX-24"}])
// //         })
// //     });
// //     describe('deletePlate', () => {
// //         it('Debería eliminar una placa de taxi', async() => {
// //             const req = {
// //                 params: {
// //                     id: 1
// //                 },
// //             } as unknown as Request
// //             const resp = {
// //                 status: jest.fn().mockReturnThis(),
// //                 json: jest.fn(), 
// //             } as unknown as Response
// //             console.log(resp.status, "resp.status")
    
// //             await deletePlate(req, resp)
// //             expect(resp.status).toHaveBeenCalledWith(200)
// //             expect(resp.json).toHaveBeenCalledWith([{id: 1, plate: "TAX-24"}])
// //         })
// //     })
// });


