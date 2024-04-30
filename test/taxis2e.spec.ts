// //CON MI DATA REAL
// import app from "../src/index";
// import request from "supertest";

// describe('API REST TAXIS', () => {
//   describe('GET', () => {
//     it('Debería devolver el tipo de plate y id ', async () => {
//     // const expectCode = 200;
//     // console.log(response.header, "response");
//     // console.log(response.statusCode, "response");
//     // console.log(response.status, "response");
//     // console.log(response.body, "response");
//     // console.log(response.error, "response");
//     // console.log(response.links, "response");//{}
//     // console.log(response.clientError, "response");//false
//     // console.log(response.ok, "response");//true
//     // console.log(response.body.query, "response");//undefined
//     // console.log(response.body.findAllPlate[8].plate, "response2");// GHGH-1458
//     // console.log(typeof response.body.findAllPlate[8].plate, "response2");// string
//     // console.log(typeof response.body.findAllPlate[0].id, "response4");//number
//     // console.log(response.body[0], "response");// { id: 7249, plate: 'CNCJ-2997' }
//       // console.log(response.body, "response");// { id: 7249, plate: 'CNCJ-2997' }
//       const response = await request(app).get("/taxis?skip=1&take=4").send();
//       expect(typeof response.body[0].plate).toBe("string");
//       expect(typeof response.body[0].id).toBe("number");
//     });
//     it('Debería devolver 200 con el get', async () => {
//       const reqApp = await request(app).get("/taxis?skip=1&take=4").send();
//       expect(reqApp.status).toBe(200);
//     });
//     it('Debería devolver no encontrado cuando no se encuentra', async () => {
//       const reqApp = await request(app).get("/taxi").send();
//       expect(reqApp.statusCode).toBe(404);
//     })
//   });
//   describe('POST', () => {
//     it('Debería crear una placa', async()=> {
//       const expected: any = {id: 1, plate:"CAS-12"}
//       const reqApp = await request(app).post("/taxis").send({id: 1, plate:"CAS-12"});
//       // console.log("🚀 ~ it ~ reqApp:", reqApp.status)
//       // console.log("🚀 ~ it ~ reqApp 2:", reqApp.body)
//       //    // const reqPost = await request(app).post("/taxis").send({"id": 1, "plate":"CAS-12"});
//       //         // expect(reqPost).toEqual(expected);
//       expect(reqApp.status).toBe(201);
//       expect(reqApp.body).toEqual(expected)
//     });
//     it('Debería fallar si el no hay nada para crear un taxis', async()=> {
//       const reqApp = await request(app).post("/taxis").send();
//       expect(reqApp.status).toBe(400)
//     })
//   });
//   describe('PUT', () => {
//     it('Debería actualizar una placa', async()=> {
//       const expected: any = {id: 1, plate: "EXAMPLE-2468"}
//       const reqApp = await request(app).put("/taxis/1").send({id: 1, plate:"EXAMPLE-2468"});
//       // console.log("🚀 ~ it ~ reqApp:", reqApp.status)
//       // console.log("🚀 ~ it ~ reqApp 2:", reqApp.body)
//       //       // const reqPost = await request(app).post("/taxis").send({"id": 1, "plate":"CAS-12"});
//       //         // expect(reqPost).toEqual(expected);
//       expect(reqApp.status).toBe(200);
//       expect(reqApp.body).toEqual(expected)
//     });
//     it('Debería fallar si no hay nada para actualizar un taxis', async()=> {
//       const reqApp = await request(app).put("/taxis").send();
//       expect(reqApp.status).toBe(404)
//     })
//   });
//   describe('DELETE', () => {
//     it('Debería eliminar una placa', async()=> {
//       const expected: any = { id: 1, plate: "EXAMPLE-2468" }
//       const reqApp = await request(app).delete("/taxis/1").send();
//       // console.log("🚀 ~ it ~ reqApp:", reqApp.status)
//       // console.log("🚀 ~ it ~ reqApp 2:", reqApp.body)
//       //      // const reqPost = await request(app).post("/taxis").send({"id": 1, "plate":"CAS-12"});
//       //         // expect(reqPost).toEqual(expected);
//       expect(reqApp.status).toBe(200);
//       expect(reqApp.body).toEqual(expected)
//     });
//     it('Debería fallar si no existe la placa para borrar', async()=> {
//       // const expected: any = { id: 1, plate: 'CAS-12' }
//       const reqApp = await request(app).delete("/taxis").send();
//       expect(reqApp.status).toBe(404)
//     })
//   })
// });