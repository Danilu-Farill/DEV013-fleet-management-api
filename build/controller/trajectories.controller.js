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
exports.getIdTrajectories = exports.getAllTrajectories = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient().trajectories;
const getAllTrajectories = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const skip = (_a = parseInt(req.query.skip)) !== null && _a !== void 0 ? _a : 0;
        const take = (_b = parseInt(req.query.take)) !== null && _b !== void 0 ? _b : 10;
        const findAllPlate = yield prisma.findMany({
            skip: skip,
            take: take
        });
        resp.json({ findAllPlate });
    }
    catch (error) {
        resp.status(404).send("No encontado");
    }
});
exports.getAllTrajectories = getAllTrajectories;
const getIdTrajectories = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idTaxi = req.params.id;
        const idNumber = parseInt(idTaxi);
        const findAllPlate = yield prisma.findUnique({
            where: {
                id: idNumber,
            }
        });
        resp.json({ findAllPlate });
        // const plate = req.params.plate;
        // const findAllPlate = await prismaTaxi.findMany({
        //     where: {
        //         id: idNumber,
        //         plate: plate
        //     }
        // });
    }
    catch (error) {
        resp.status(404).send("Id no encontado");
    }
});
exports.getIdTrajectories = getIdTrajectories;
