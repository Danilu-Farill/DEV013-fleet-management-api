// const respPlates = [{ "id":1, "plate":"CAS-12" },{ "id":2, "plate": "CAS-34" }, { "id":3, "plate":"CAS-56" }, {"id":4, "plate":"CAS-78" }];
// const mockPlates = getAllPlate(reqPlates, respPlates)
// const findManyPlates = ["CAS-12", "CAS-34", "CAS-56", "CAS-78"]


//CON MI DATA REAL
// import {getAllPlate} from '../src/controller/taxi.controller'
import app from "../src/index";
import request  from "supertest";

const respPlates: any = {"id": 1, "plate":"CAS-12" };

describe('API REST', () => {
    describe('GET', () => {
        it('Debería devolver el tipo de plate y id ', async() => {
            // const expectCode = 200;
            // console.log(response.header, "response");
            // console.log(response.statusCode, "response");
            // console.log(response.status, "response");
            // console.log(response.body, "response");
            // console.log(response.error, "response");
            // console.log(response.links, "response");//{}
            // console.log(response.clientError, "response");//false
            // console.log(response.ok, "response");//true
            // console.log(response.body.query, "response");//undefined
            // console.log(response.body.findAllPlate[0], "response");// { id: 7249, plate: 'CNCJ-2997' }
            // console.log(response.body.findAllPlate[8].plate, "response2");// GHGH-1458
            // console.log(typeof response.body.findAllPlate[8].plate, "response2");// string
            // console.log(typeof response.body.findAllPlate[0].id, "response4");//number
            const response = await request(app).get("/taxis?skip=1&take=4").send();
            expect(typeof response.body.findAllPlate[0].plate).toBe("string");
            expect(typeof response.body.findAllPlate[0].id).toBe("number");
        });
        it('Debería devolver 200 con el get', async() => {
            const reqApp = await request(app).get("/taxis?skip=1&take=4").send();
            expect(reqApp.status).toBe(200);
        });
        it('Debería devolver no encontrado si no esta paginado', async() =>{
            const reqApp = await request(app).get("/taxis").send();
            expect(reqApp.statusCode).toBe(404);
        })
    });
    describe('POST', () => {
        it('Debería fallar si el no hay nada para crear un taxis', async()=> {
            const expected: any = {"id": 1, "plate":"CAS-12"}
            const reqApp = await request(app).post("/taxis").send();
            // console.log("🚀 ~ it ~ reqApp:", reqApp)
            // console.log("🚀 ~ it ~ reqApp 2:", reqApp.body)
    //         // const reqPost = await request(app).post("/taxis").send({"id": 1, "plate":"CAS-12"});
    //         // expect(reqPost).toEqual(expected);
            expect(reqApp.status).toEqual(400)
            // expect(reqApp.text).toEqual("No hay nada que agregar")
        })
    })
});


// CON DATA MOCK DE PRISMA
import { getTaxis, createTaxi } from "../functions-without-context"
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
    const taxi2: any = {
            id: 2,
            plate: "DÍA-1357",
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
// if(taxi2 == null) {
//     prismaMock.taxis.create.mockResolvedValue(taxi2)
//     return new Error("400, falta body")
// } else {
    prismaMock.taxis.create.mockResolvedValue(taxi2)
// }
    await expect(createTaxi(taxi2)).resolves.toEqual({})
});
