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
  prismaMock.taxis.create.mockResolvedValue(taxi2)
  await expect(createTaxi(taxi2)).resolves.toEqual({})
});

test('should update a taxi', async() => {
  const taxi: any = {
    id: 1,
    plate: "DÍA-24",
    acceptTermsAndConditions: true
  };
  prismaMock.taxis.update.mockResolvedValue(taxi)

  await expect(updateTaxi(taxi)).resolves.toEqual({
    id: 1,
    plate: "DÍA-24",
    acceptTermsAndConditions: true
  });
});




//mock con jest

import { Request, Response } from "express";
import { getAllPlate, getIdTaxis, createPlate, updatePlate, deletePlate } from "../src/controller/taxi.controller";

jest.mock('@prisma/client', () => {
  const taxi1 = [
    {id: 1, plate: "TAX-12"},
    {id: 2, plate: "TAX-34"}]
  const mockTaxis = {
    taxis: {
      findMany: jest.fn().mockResolvedValue([
        {id: 1, plate: "TAX-12"},
        {id: 2, plate: "TAX-34"}
      ]),
      findUnique: jest.fn().mockResolvedValue([
        {id: 1, plate: "TAX-12"},
      ]),
      create: jest.fn().mockResolvedValue([
        {data:{id: 3, plate: "TAX-56"}},
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
    PrismaClient: jest.fn(() => mockTaxis),
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
      } as unknown as Request
      const resp = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response
    
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