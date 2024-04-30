"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlate = exports.updatePlate = exports.createPlate = exports.getIdTaxis = exports.getAllPlate = void 0;
const client_1 = require("@prisma/client");
// import prisma2 from '../connect';
const prisma = new client_1.PrismaClient().taxis;
const getAllPlate = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const skip = (_a = parseInt(req.query.skip)) !== null && _a !== void 0 ? _a : 0;
        const take = (_b = parseInt(req.query.take)) !== null && _b !== void 0 ? _b : 10;
        const findAllPlate = yield prisma.findMany({
            skip: skip,
            take: take
        });
        resp.status(200).json(findAllPlate);
    }
    catch (error) {
        resp.status(404).json("No encontado");
    }
});
exports.getAllPlate = getAllPlate;
const getIdTaxis = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idTaxi = req.params.id;
        const idNumber = parseInt(idTaxi);
        const findAllPlate = yield prisma.findUnique({
            where: {
                id: idNumber,
            }
        });
        resp.json(findAllPlate);
        // const plate = req.params.plate;
        // const findAllPlate = await prismaTaxi.findMany({
        //     where: {
        //         id: idNumber,
        //         plate: plate
        //     }
        // });    
    }
    catch (error) {
        resp.status(404).json("Id no encontado");
    }
});
exports.getIdTaxis = getIdTaxis;
const createPlate = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, plate } = req.body;
        if (!id && !plate) {
            return resp.status(400).json("No hay nada que agregar");
        }
        const create = yield prisma.create({ data: { id: id, plate: plate, } });
        resp.status(201).json(create);
    }
    catch (error) {
        resp.status(500).send("No creado");
    }
});
exports.createPlate = createPlate;
const updatePlate = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findId = req.params.id;
        const idNumber = parseInt(findId);
        const body = req.body;
        if (!findId || !body) {
            return resp.status(400).json("No hay nada que actualizar");
        }
        const update = yield prisma.update({
            where: {
                id: idNumber,
            },
            data: body
        });
        resp.status(200).json(update);
    }
    catch (error) {
        resp.status(404).send("No actualizado");
    }
});
exports.updatePlate = updatePlate;
const deletePlate = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const idNumber = parseInt(id);
        // if(!idNumber){
        //     return resp.status(400).json("No hay nada que borrar"); 
        // }
        // if (!id) {
        //     return resp.status(400).send('Debe proporcionar un id o una placa');
        // };
        // const findId = await prisma.findUnique({
        //         where: {
        //             id: idNumber 
        //         }
        //     });
        const deleteUid = yield prisma.delete({
            where: {
                id: idNumber
            }
        });
        resp.status(200).json(deleteUid);
    }
    catch (error) {
        resp.status(404).send("No encontado");
    }
});
exports.deletePlate = deletePlate;
/*
EJEMPLO DE delete CON DOS REVISAR:
const { uid } = req.params;
        console.log("🚀 ~ deletePlate ~ uid:", uid, req.params, req.body.id, req.body.plate)
        // const findId: string = req.params.id;
        // const plate: string = req.params.plate;
        // // const { id, plate} = req.params
        // if (!findId && !plate) {
        //     return resp.status(400).send('Debe proporcionar un id o una placa');
        // };

        let identifier;
        if(!isNaN(Number(uid))) {
            identifier = await prisma.findUnique({
                where: {
                    id: parseInt(uid)
                }
            });
        }
        const deleteUid = await prisma.delete({
            where: {
                id: identifier
            }
        })

        // if(uid) {
        //     identifier = await prisma.deleteMany({
        //         where: {
        //             id: parseInt(uid)
        //         }
        //     });
        // } else {
        //     identifier = await prisma.deleteMany({
        //         where: {
        //             plate: uid
        //         }
        //     });
        // }





        // if(findId) {
        //     const idNumber: number = parseInt(findId)
        //     identifier = await prisma.deleteMany({
        //         where: {
        //             id: idNumber
        //         }
        //     });
        // } else if(plate){
        //     identifier = await prisma.deleteMany({
        //         where: {
        //             plate: plate
        //         }
        //     });
        // }


        // if(id){
        //     identifier = id;
        //     parseInt(identifier)
        // } else {
        //     identifier = plate;
        // };
        // const findTaxis = await prisma.findUnique({
        //     where: {
        //         identifier
        //     },
        // })

        // if(findId) {
        //     const idNumber: number = parseInt(findId)
        //     identifier = idNumber;
        // } else if(plate){
        //     identifier = plate;
        // }

        //  const create = await prisma.delete({
        //     where: {
        //         id: identifier
        //     }
        // });
*/ 
