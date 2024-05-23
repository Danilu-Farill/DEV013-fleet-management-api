//CON MI DATA REAL
import app from "../src/index";
import request from "supertest";

const taxis = "/taxis?skip=1&take=10";
const taxiError = "/taxis?skip=1&take=cuatro";
const taxisId = "/taxis/10133";
const taxisIdError = "/taxis/diez";

describe('API REST TAXIS', () => {
  describe('GET', () => {
    it('Debería devolver el tipo de plate y id ', async () => {
      const response = await request(app).get(taxis).send();
      expect(typeof response.body[0].plate).toBe("string");
      expect(typeof response.body[0].id).toBe("number");
    });
    it('Debería devolver 200 con el get', async () => {
      const reqApp = await request(app).get(taxis).send();
      expect(reqApp.status).toBe(200);
    });
    it('Debería devolver no encontrado cuando no se encuentra', async () => {
      const reqApp = await request(app).get(taxiError).send();
      expect(reqApp.statusCode).toBe(404);
    });
    it('Debería devolver error si esta mal el query', async () => {
      const reqApp = await request(app).get(taxiError).send();
      const cleanedText = reqApp.text.trim().replace(/"/g, '');
      expect(cleanedText).toBe("No encontrado");
    });
  });
  describe('GET ID', () => {
    it('Debería devolver 200 al buscar por ID', async () => {
      const reqApp = await request(app).get(taxisId).send();
      expect(reqApp.status).toBe(200);
    });
    it('Debería devolver error cuando no se encuentra', async () => {
      const reqApp = await request(app).get(taxisIdError).send();
      expect(reqApp.statusCode).toBe(404);
    });
  });
  describe('POST', () => {
    it('Debería crear una placa', async()=> {
      const expected: any = {id: 1, plate:"CAS-12"}
      const reqApp = await request(app).post("/taxis").send(expected);
      expect(reqApp.status).toBe(201);
      expect(reqApp.body).toEqual(expected)
    });
    it('Debería fallar si el no hay nada para crear un taxis', async()=> {
      const reqApp = await request(app).post("/taxis").send();
      expect(reqApp.status).toBe(400)
    })
    it('Debería fallar si los campos no son correctos', async()=> {
      const reqAppError: any = {id: "1", plate: 123};
      const reqApp = await request(app).post("/taxis").send(reqAppError);
      expect(reqApp.status).toBe(500)
    })
  });
  describe('PUT', () => {
    it('Debería actualizar una placa', async()=> {
      const expected: any = {id: 1, plate: "EXAMPLE-2468"}
      const reqApp = await request(app).put("/taxis/1").send(expected);
      // console.log("🚀 ~ it ~ reqApp:", reqApp.status)
      // console.log("🚀 ~ it ~ reqApp 2:", reqApp.body)
      //       // const reqPost = await request(app).post("/taxis").send({"id": 1, "plate":"CAS-12"});
      //         // expect(reqPost).toEqual(expected);
      expect(reqApp.status).toBe(200);
      expect(reqApp.body).toEqual(expected)
    });
    it('Debería fallar si los campos para actualizar estan mal', async()=> {
      const reqAppError: any = {id: "1", plate: 2468};
      const reqApp = await request(app).put("/taxis/1").send(reqAppError);
      expect(reqApp.status).toBe(404)
    })
  });
  describe('DELETE', () => {
    it('Debería eliminar una placa', async()=> {
      const expected: any = { id: 1, plate: "EXAMPLE-2468" }
      const reqApp = await request(app).delete("/taxis/1").send(expected);
      // console.log("🚀 ~ it ~ reqApp:", reqApp.status)
      // console.log("🚀 ~ it ~ reqApp 2:", reqApp.body)
      //      // const reqPost = await request(app).post("/taxis").send({"id": 1, "plate":"CAS-12"});
      //         // expect(reqPost).toEqual(expected);
      expect(reqApp.status).toBe(200);
      expect(reqApp.body).toEqual(expected)
    });
    it('Debería fallar si no existe la placa para borrar', async()=> {
      const reqAppError = "/taxis/uno";
      const reqApp = await request(app).delete(reqAppError).send();
      expect(reqApp.status).toBe(404)
    })
  })
});