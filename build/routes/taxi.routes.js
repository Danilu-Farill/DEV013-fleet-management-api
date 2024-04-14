"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { Router } from "express";
const express_1 = __importDefault(require("express"));
const taxi_controller_1 = require("../controller/taxi.controller");
//const taxiRouter = Router();
const router = express_1.default.Router();
/**
 * Get track
 * @swagger
 * /taxis:
 *    get:
 *      tags:
 *          - Taxis
 *              todo sobre el contendido de los taxis
 *      summary: "Obtener lista de placas"
 *      description: Endpoint para obtener las placas y id de todos los taxis
 *      responses:
 *        '200':
 *           description: Placas listadas con éxito.
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Taxis'
 *        '400':
 *            description: 'Solicitud incorrecta'
 *        '404':
 *            description: 'Taxis no encontrado'
 *        '500':
 *              description: 'Error Interno del Servidor'
 */
// /**
//  * Get track
//  * @swagger
//  * /taxis:
//  *    getById:
//  *      tags:
//  *          - Taxis fkdldl
//  *              todo sobre el contendido de los taxis
//  *      summary: "Obtener lista de placas"
//  *      description: Endpoint para obtener las placas y id de todos los taxis
//  *      responses: 
//  *        '200':
//  *           description: Placas listadas con éxito.
//  *           content: 
//  *              application/json: 
//  *                  schema:
//  *                      type: array
//  *                      items:
//  *                          $ref: '#/components/schemas/Taxis'
//  *        '400':
//  *            description: 'Solicitud incorrecta'
//  *        '404':
//  *            description: 'Taxis no encontrado'
//  *        '500':
//  *              description: 'Error Interno del Servidor'
//  */
router.get('/taxis', taxi_controller_1.getAllPlate);
router.get('/taxis/:id', taxi_controller_1.getIdTaxis);
router.post('/taxis', taxi_controller_1.createPlate);
// taxiRouter.put('/:id', createPlate);
// taxiRouter.delete('/:id', createPlate);
exports.default = router;
