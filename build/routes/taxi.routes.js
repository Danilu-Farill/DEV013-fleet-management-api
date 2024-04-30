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
 * tags:
 *          - name: taxis
 *            description: contendido de los taxis
 *            paths:
 * /taxis:
 *    get:
 *      tags:
 *      - taxis
 *      summary: "Obtener lista de placas"
 *      parameters:
 *      - $ref: '#/components/schemas/Parameters/skipParam'
 *      - $ref: '#/components/schemas/Parameters/takeParam'
 *      description: Endpoint para obtener las placas y id de todos los taxis
 *      responses:
 *        '200':
 *           description: Placas listadas con éxito.
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                        oneOf:
 *                          - $ref: '#/components/schemas/Taxis/taxiExample1'
 *                          - $ref: '#/components/schemas/Taxis/taxiExample2'
 *        '400':
 *            description: 'Solicitud incorrecta'
 *        '404':
 *            description: 'Taxis no encontrado'
 *        '500':
 *              description: 'Error Interno del Servidor'
 *              content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 *    post:
 *      tags:
 *      - taxis
 *      summary: "Crear placas"
 *      description: Endpoint para crear las placas de taxis
 *      requestBody:
 *        description: crear una nueva placa de taxi
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Taxis/taxiExample1'
 *        required: true
 *      responses:
 *        '201':
 *           description: Placas creadas con éxito.
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Taxis/taxiExample1'
 *        '400':
 *            description: 'Solicitud incorrecta'
 *        '404':
 *            description: 'No creado'
 *        '500':
 *              description: 'Error Interno del Servidor'
 *              content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 * /taxis/id:
 *    put:
 *      tags:
 *      - taxis
 *      summary: "Actualizar placas"
 *      description: Endpoint para actualizar las placas de los taxis
 *      parameters:
 *        - name: taxiID
 *          in: path
 *          description: Se necesita el ID para actualizar una placa
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *      operationId: updatePlate
 *      requestBody:
 *        description: actualiza una placa en existencia
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Taxis/taxiExample2'
 *        required: true
 *      responses:
 *        '200':
 *           description: Placa actualizada con éxito.
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Taxis/taxiExample2'
 *        '400':
 *            description: 'Solicitud incorrecta'
 *            content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 *        '404':
 *            description: 'Taxi no encontrado'
 *            content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 *        '500':
 *              description: 'Error Interno del Servidor'
 *              content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 *    delete:
 *      tags:
 *      - taxis
 *      summary: "Eliminar placas"
 *      description: Endpoint para obtener las placas y id de todos los taxis
 *      parameters:
 *        - name: taxiID
 *          in: path
 *          description: Se necesita el ID para eliminar una placa
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *      responses:
 *        '200':
 *           description: Placa elimnada con éxito.
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Taxis/taxiExample2'
 *        '400':
 *              description: 'Solicitud incorrecta'
 *              content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 *        '404':
 *              description: 'Taxis no encontrado'
 *              content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 *        '500':
 *              description: 'Error Interno del Servidor'
 *              content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 *    get:
 *      tags:
 *      - taxis
 *      summary: "Obtener una placa por ID"
 *      description: Endpoint para obtener una placa por ID
 *      operationId: obtener una placa
 *      parameters:
 *        - name: taxiID
 *          in: path
 *          description: ID del taxi
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *      responses:
 *        '200':
 *           description: Placa obtenida con éxito.
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Taxis'
 *        '400':
 *            description: 'Solicitud incorrecta'
 *            content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 *        '404':
 *            description: 'Taxi no encontrado'
 *            content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 *        '500':
 *              description: 'Error Interno del Servidor'
 *              content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 */
router.get('/taxis', taxi_controller_1.getAllPlate);
router.get('/taxis/:id', taxi_controller_1.getIdTaxis);
router.post('/taxis', taxi_controller_1.createPlate);
router.put('/taxis/:id', taxi_controller_1.updatePlate);
router.delete('/taxis/:id', taxi_controller_1.deletePlate);
exports.default = router;
