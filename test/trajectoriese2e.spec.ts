//CON MI DATA REAL
import app from "../src/index";
import request from "supertest";

describe('API REST TRAJECTORIES', () => {
  describe('GET', () => {
    it('Debería devolver el tipo de dato de date, longitude, latitude y taxi_id', async () => {
      const response = await request(app).get("/trajectories?skip=1&take=4").send();
      expect(typeof response.body[0].date).toBe("string");
      expect(typeof response.body[0].taxi_id).toBe("number");
      expect(typeof response.body[0].longitude).toBe("number");
      expect(typeof response.body[0].latitude).toBe("number");
      expect(typeof response.body[0].id).toBe("number");
    });
    it('Debería devolver 200 con el get páginado', async () => {
      const reqApp = await request(app).get("/trajectories?skip=1&take=4").send();
      expect(reqApp.status).toBe(200);
    });
    it('Debería devolver no encontrado cuando no se agrega la paginación', async () => {
      const reqApp = await request(app).get("/trajectories").send();
      expect(reqApp.statusCode).toBe(404);
    })
  });
  describe('GET ID', () => {
    // it('Debería devolver todas las trajectorias páginadas que se encuentren dentro de la fecha establecida', async () => {
    //   const response = await request(app).get("/trajectories/id?taxi_id=10133&date=2008-02-02&skip=1&take=2").send();
    //   expect(response.body[0]).toBe();
    // });
    it('Debería devolver 200 con el GET ID', async () => {
      const reqApp = await request(app).get("/trajectories/id?taxi_id=10133&date=2008-02-02&skip=1&take=2").send();
      expect(reqApp.status).toBe(200);
    });
    it('Debería devolver no encontrado cuando falta algún query en la busqueda', async () => {
      const reqApp = await request(app).get("/trajectories/id").send();
      const reqApp1 = await request(app).get("/trajectories/id?taxi_id=10133&date=2008-02-02").send();
      const reqApp2 = await request(app).get("/trajectories/id?taxi_id=10133&date=2008-02-02&skip=1").send();
      expect(reqApp.statusCode).toBe(404);
      expect(reqApp1.statusCode).toBe(404);
      expect(reqApp2.statusCode).toBe(404);
    });
  });
  describe('GET LAST TRAJECTORIES', () => {
    // it('Debería devolver las últimas trajectorias  de cada taxi páginadas', async () => {
    //   const response = await request(app).get("/trajectories/location?skip=2&take=2").send();
    //   expect(typeof response.body[0].date).toBe("string");
    // });
    it('Debería devolver 200 con el GET ID', async () => {
      const reqApp = await request(app).get("/trajectories/location?skip=2&take=2").send();
      expect(reqApp.status).toBe(200);
    });
    it('Debería devolver no encontrado cuando falta algún query en la busqueda', async () => {
      const reqApp = await request(app).get("/trajectories/location").send();
      expect(reqApp.statusCode).toBe(404);
    })
  });
  describe('POST', () => {
    // it('Debería crear una trajectoria', async()=> {
    //   const createApp = await request(app).post("/trajectories").send({id: 1, plate:"CAS-12"});
    //   const expected: any = createApp
    //   const reqApp = await request(app).post("/trajectories").send({
    //     taxi_id: expected,
    //     date: new Date,
    //     latitude: 1234,
    //     longitude: 1234
    //   });
    //   console.log("🚀 ~ it ~ expected:", expected.id)
    //   expect(reqApp.status).toBe(201);
    //   expect(reqApp.body).toEqual(expected)
    // });
    it('Debería fallar si no hay nada para crear una trajectoria', async()=> {
      const reqApp = await request(app).post("/trajectories").send();
      expect(reqApp.status).toBe(500)
    })
  });
  describe('DELETE', () => {
    // it('Debería eliminar una trajectoria', async()=> {
    //   const expected: any = { id: 1, plate: "EXAMPLE-2468" }
    //   const reqApp = await request(app).delete("/trajectories/1").send();
    //   expect(reqApp.status).toBe(200);
    //   expect(reqApp.body).toEqual(expected)
    // });
    it('Debería fallar si no existe la placa para borrar', async()=> {
      const reqApp = await request(app).delete("/trajectories").send();
      expect(reqApp.status).toBe(404)
    })
  })
  //   describe('PUT', () => {
//     it('Debería actualizar una placa', async()=> {
//       const expected: any = {id: 1, plate: "EXAMPLE-2468"}
//       const reqApp = await request(app).put("/taxis/1").send({id: 1, plate:"EXAMPLE-2468"});
//       expect(reqApp.status).toBe(200);
//       expect(reqApp.body).toEqual(expected)
//     });
//     it('Debería fallar si no hay nada para actualizar un taxis', async()=> {
//       const reqApp = await request(app).put("/taxis").send();
//       expect(reqApp.status).toBe(404)
//     })
//   });
});