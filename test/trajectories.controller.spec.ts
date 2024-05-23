import { getAllTrajectories, /*getQueryRawLocation*/ getQueryTrajectories } from "../src/models/trajectories.models";

jest.mock('@prisma/client', () => {
  const mockTaxis = {
    trajectories: {
      findMany: jest.fn().mockResolvedValue([
        {id: 1020, date: "2008-02-02", latitude: 116.224, longitude: 36.888},
        {id: 2244, date: "2009-04-04", latitude: 114.246, longitude: 28.448},
        {id: 1020, date: "2008-02-02", latitude: 118.123, longitude: 20.666},
        {id: 1020, date: "2008-02-02", latitude: 120.456, longitude: 24.222},
      ]),
    },
    trajectoriesId: {
      findMany: jest.fn().mockResolvedValue(
        [
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
    PrismaClient: jest.fn(() => mockTaxis),
  };
});

describe('Trajectories', () => {
  describe('getAll', () => {
    it('Debería regresar todas las trajectorias páginadas', async() => {
      const skip = 0;
      const take = 2;
    
      const resp = await getAllTrajectories(skip, take);
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
    });
    
  });
  describe('getTrajectories', () => {
    it('Debería regresar las trajectorias por id, date y páginadas', async() => {
      const skip = 0;
      const take = 3;
      const id = 1020 as any;
      const endDate = "2008-02-02";
      const startDate = "2008-02-02";
      const resp = await getQueryTrajectories(id, endDate, startDate, skip, take);
      expect([resp[0], resp[2], resp[3]]).toEqual([
        {id: 1020, date: "2008-02-02", latitude: 116.224, longitude: 36.888},
        {id: 1020, date: "2008-02-02", latitude: 118.123, longitude: 20.666},
        {id: 1020, date: "2008-02-02", latitude: 120.456, longitude: 24.222},
      ]);
      expect(resp[0]).not.toContainEqual(expect.not.arrayContaining([
        {id: 2244, date: "2009-04-04", latitude: 114.246, longitude: 28.448}, 
        {id: 1020, date: "2008-02-02", latitude: 118.123, longitude: 20.666},
        {id: 1020, date: "2008-02-02", latitude: 120.456, longitude: 24.222}
      ])
      )
    })
  });
});