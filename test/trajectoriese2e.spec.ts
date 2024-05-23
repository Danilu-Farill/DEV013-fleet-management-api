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
    });
    it('Debería devolver no encontrado cuando no se agrega la paginación', async () => {
      const reqApp = await request(app).get("/trajectories").send();
      const cleanedText = reqApp.text.trim().replace(/"/g, '');
      expect(cleanedText).toBe("No encontrado");
    })
  });
  describe('GET ID', () => {
    it('Debería devolver 200 con el GET ID y querys', async () => {
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
    it('Debería devolver 200 con el GET ID', async () => {
      const reqApp = await request(app).get("/trajectories/location?skip=2&take=2").send();
      expect(reqApp.status).toBe(200);
    });
    it('Debería devolver no encontrado cuando falta algún query en la busqueda', async () => {
      const reqApp = await request(app).get("/trajectories/location").send();
      expect(reqApp.statusCode).toBe(404);
    });
  });
  describe('GET BODY', () => {
    const appBody = "/trajectoriesBody?skip=0&take=8";
    it('Debería devolver 200', async () => {
      const body = {
        "taxi_id": 10133,
        "date": "2008-02-02T14:08:06.000Z"
      };
      const reqApp = await request(app).get(appBody).send(body);
      expect(reqApp.status).toBe(200);
    });
    it('Debería devolver no encontrado cuando falta algún query en la busqueda', async () => {
      const reqApp = await request(app).get(appBody).send();
      expect(reqApp.statusCode).toBe(404);
    });
  });
  describe('GET DATE', () => {
    const appBody = "/trajectories/date/2008-02-03?skip=8&take=8";
    const appBodyError = "/trajectories/date/2008-02-03";
    it('Debería devolver 200', async () => {
      const reqApp = await request(app).get(appBody).send();
      expect(reqApp.status).toBe(200);
    });
    it('Debería devolver no encontrado cuando falta algún query en la busqueda', async () => {
      const reqApp = await request(app).get(appBodyError).send();
      expect(reqApp.statusCode).toBe(404);
    });
  });
  describe('GETID', () => {
    const appBody = "/trajectorieTaxi/10133?skip=0&take=8";
    const appBodyError = "/trajectorieTaxi/10133";
    it('Debería devolver 200 con el id', async () => {
      const reqApp = await request(app).get(appBody).send();
      expect(reqApp.status).toBe(200);
    });
    it('Debería devolver no encontrado cuando falta algún query en la busqueda', async () => {
      const reqApp = await request(app).get(appBodyError).send();
      expect(reqApp.statusCode).toBe(404);
    });
  });
});