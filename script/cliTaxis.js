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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("node:fs");
var path = require("path");
var client_1 = require("@prisma/client");
// import { Readline } from 'node:readline/promises';
var prismaTaxis = new client_1.PrismaClient().taxis;
var prismaTrajectories = new client_1.PrismaClient().trajectories;
//Promesa que devuelve un booleano: La función devuelve una promesa que resuelve a un valor booleano (true o false). La definición Promise<boolean> indica que la función es asíncrona y que su resultado será un booleano.
//La función devuelve true si se encuentra un registro (es decir, record no es null) y false si no se encuentra ningún registro (es decir, record es null). Esto indica si un registro con esos valores ya existe en la base de datos.
function filesExists(data) {
    return __awaiter(this, void 0, void 0, function () {
        var record;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaTrajectories.findFirst({
                        where: {
                            taxi_id: data.taxi_id,
                            date: data.date,
                            latitude: data.latitude,
                            longitude: data.longitude
                        }
                    })];
                case 1:
                    record = _a.sent();
                    return [2 /*return*/, record !== null];
            }
        });
    });
}
//PARAMS es un arreglo que puede contener objetos de tipo TaxiData o TrajectoryData
//model es un string literal que puede ser "taxis" o "trajectories"
//MODEL-TAXIS: params se fuerza a ser del tipo TaxiData[]. skipDuplicates: true evita la inserción de registros duplicados.
/*
Si model es "trajectories":
Se crea un arreglo vacío fileUnique.
Se itera sobre cada elemento en params.
Se verifica si el registro ya existe usando la función filesExists.
Si no existe, se añade a fileUnique.
Si existe, se imprime un mensaje de registro duplicado ignorado.
Si fileUnique tiene elementos (es decir, se encontraron registros no duplicados):
Se usa prismaTrajectories.createMany para insertar los datos en la base de datos.
fileUnique se fuerza a ser del tipo TrajectoryData[].
skipDuplicates: true evita la inserción de registros duplicados.
*/
function createFilesPrisma(params, model) {
    return __awaiter(this, void 0, void 0, function () {
        var fileUnique, _i, _a, param, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    if (!(model === "taxis")) return [3 /*break*/, 2];
                    return [4 /*yield*/, prismaTaxis.createMany({
                            data: params,
                            skipDuplicates: true
                        })];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 2:
                    if (!(model === "trajectories")) return [3 /*break*/, 8];
                    fileUnique = [];
                    _i = 0, _a = params;
                    _b.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    param = _a[_i];
                    return [4 /*yield*/, filesExists(param)];
                case 4:
                    if (!(_b.sent())) {
                        fileUnique.push(param);
                    }
                    else {
                        console.log("Registro duplicado ignorado: ".concat(JSON.stringify(param)));
                    }
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    if (!(fileUnique.length > 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, prismaTrajectories.createMany({
                            data: params,
                            skipDuplicates: true
                        })];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_1 = _b.sent();
                    console.log("🚀 ~ createFilesPrisma ~ error:", error_1);
                    if (error_1.code === "P2002") {
                        console.log("Registro duplicado ignorado");
                    }
                    else {
                        console.log("error");
                        throw error_1;
                    }
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var fileMain, type, fileJoin, fileExplore, fileCreateTaxis, fileCreateTrajectories, batchSize, index, element, fileJoinTxt, fileRead, fileSpace, _i, fileSpace_1, files, filesSplit, id, plate, spaces, dateString, taxi_id, date, latitude, longitude;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileMain = process.argv.slice(2)[0];
                    type = process.argv[3].split("=")[1];
                    fileCreateTaxis = [];
                    fileCreateTrajectories = [];
                    fileJoin = path.join(fileMain, type);
                    fileExplore = fs.readdirSync(fileJoin); //Lee todos los nombres de archivos en ese directorio y los almacena en fileExplore
                    batchSize = 10000;
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < fileExplore.length)) return [3 /*break*/, 11];
                    element = fileExplore[index];
                    console.log("🚀 ~ main ~ element:", element);
                    fileJoinTxt = path.join(fileJoin, element) //Construye la ruta completa a cada archivo (fileJoinTxt).
                    ;
                    console.log("🚀 ~ main ~ fileJoinTxt:", fileJoinTxt);
                    fileRead = fs.readFileSync(fileJoinTxt, "utf-8") //Lee el contenido del archivo
                    ;
                    console.log("🚀 ~ main ~ fileRead:", fileRead);
                    fileSpace = fileRead.split(/\r?\n/) //Divide el contenido del archivo en líneas 
                    ;
                    console.log("🚀 ~ main ~ fileSpace:", fileSpace);
                    _i = 0, fileSpace_1 = fileSpace;
                    _a.label = 2;
                case 2:
                    if (!(_i < fileSpace_1.length)) return [3 /*break*/, 6];
                    files = fileSpace_1[_i];
                    filesSplit = files.split(",");
                    if (!(type === "taxis" && filesSplit.length === 2)) return [3 /*break*/, 3];
                    id = parseInt(filesSplit[0]);
                    plate = filesSplit[1];
                    fileCreateTaxis.push({ id: id, plate: plate });
                    return [3 /*break*/, 5];
                case 3:
                    if (!(type === "trajectories" && filesSplit.length === 4)) return [3 /*break*/, 5];
                    spaces = files.split(/\s*,\s*/);
                    if (spaces.length === 0) { //Verifica si spaces tiene elementos; si no, retorna.
                        return [2 /*return*/];
                    }
                    dateString = filesSplit[1].replace(" ", "T");
                    console.log("🚀 ~ main ~ dateString:", dateString);
                    taxi_id = parseInt(filesSplit[0]);
                    date = new Date(dateString);
                    console.log("🚀 ~ main ~ date:", date);
                    latitude = parseFloat(filesSplit[2]);
                    longitude = parseFloat(filesSplit[3]);
                    fileCreateTrajectories.push({ taxi_id: taxi_id, date: date, latitude: latitude, longitude: longitude });
                    if (!(fileCreateTrajectories.length === batchSize)) return [3 /*break*/, 5];
                    return [4 /*yield*/, createFilesPrisma(fileCreateTrajectories, type)];
                case 4:
                    _a.sent();
                    fileCreateTrajectories = [];
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6:
                    if (!(type === "taxis" && fileCreateTaxis.length > 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, createFilesPrisma(fileCreateTaxis, type)];
                case 7:
                    _a.sent();
                    fileCreateTaxis = [];
                    return [3 /*break*/, 10];
                case 8:
                    if (!(type === "trajectories" && fileCreateTrajectories.length > 0)) return [3 /*break*/, 10];
                    return [4 /*yield*/, createFilesPrisma(fileCreateTrajectories, type)];
                case 9:
                    _a.sent();
                    fileCreateTrajectories = [];
                    _a.label = 10;
                case 10:
                    index++;
                    return [3 /*break*/, 1];
                case 11: return [2 /*return*/];
            }
        });
    });
}
main();
//8-02-06T22:15:29.000Z","latitude":116.98686,"longitude":40.4578} checar este archivo
