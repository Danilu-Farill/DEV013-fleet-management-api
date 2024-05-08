"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trajectories_controller_1 = require("../controller/trajectories.controller");
const routerTrajectories = express_1.default.Router();
/**
 * Get track
 * @swagger
 * tags:
 *          - name: trajectories
 *            description: contendido de las trajectorias
 *            paths:
 * /trajectories:
 *    get:
 *      tags:
 *      - trajectories
 *      summary: "Obtener todas las trajectories"
 *      description: Endpoint para obtener las trajectorias paginadas
 *      parameters:
 *        - $ref: '#/components/schemas/Parameters/skipParam'
 *        - $ref: '#/components/schemas/Parameters/takeParam'
 *      responses:
 *        '200':
 *           description: Trajectorias listadas con éxito.
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Trajectories'
 *                  examples:
 *                        example1:
 *                           value:
 *                            - id: 4
 *                              taxi_id: 1214
 *                              latitude: 116.222
 *                              longitude: 38.556
 *                              date: 2008-02-02
 *                            - id: 8
 *                              taxi_id: 10133
 *                              latitude: 116.37659
 *                              longitude: 39.85567
 *                              date: 2008-02-02 13:47:59
 *        '400':
 *            description: 'Solicitud incorrecta'
 *        '404':
 *            description: 'Trajectoria no encontrada'
 *        '500':
 *              description: 'Error Interno del Servidor'
 *    post:
 *      tags:
 *      - trajectories
 *      summary: "Crear placas"
 *      description: Endpoint para crear trajectorias
 *      requestBody:
 *        description: crea una trajectoria dentro de una id y plate ya existente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Trajectories'
 *        required: true
 *      responses:
 *        '201':
 *           description: Trajectoria creada con éxito.
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Trajectories'
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
 * /trajectories/{taxi_id}:
 *    put:
 *      tags:
 *      - trajectories
 *      summary: "Actualizar trajectoria NO RECOMENDADO"
 *      description: Endpoint para actualizar la trajectoria por ID
 *      parameters:
 *        - name: taxiID
 *          in: path
 *          description: Se necesita el ID para actualizar una trajectoria
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *      operationId: updateTrajectories
 *      requestBody:
 *        description: actualiza una trajectoria en existencia
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Trajectories'
 *        required: true
 *      responses:
 *        '200':
 *           description: Trajectoria actualizada con éxito.
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Trajectories'
 *        '400':
 *            description: 'Solicitud incorrecta'
 *            content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 *        '404':
 *            description: 'Trajectoria no encontrado'
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
 *      - trajectories
 *      summary: "Eliminar trajectoria"
 *      description: Endpoint para eliminar la trajectoria de un taxi por ID
 *      parameters:
 *        - name: taxiID
 *          in: path
 *          description: Se necesita el ID para eliminar una trajectoria
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *      responses:
 *        '200':
 *           description: Trajectoria elimnada con éxito.
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Trajectories'
 *        '400':
 *              description: 'Solicitud incorrecta'
 *              content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 *        '404':
 *              description: 'Trajectoria no encontrado'
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
 *      - trajectories
 *      summary: "Obtener una trajectoria por ID"
 *      description: Endpoint para obtener una trajectoria por ID, y obtener langitude, longitude y date
 *      operationId: obtener una trajectoria
 *      parameters:
 *        - name: taxiID
 *          in: path
 *          description: Se necesita el ID para eliminar una trajectoria
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 *              example: 10133
 *        - $ref: '#/components/schemas/Parameters/dateParams'
 *        - $ref: '#/components/schemas/Parameters/skipParam'
 *        - $ref: '#/components/schemas/Parameters/takeParam'
 *      responses:
 *        '200':
 *           description: Trajectoria obtenida con éxito.
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Trajectories'
 *                  examples:
 *                        example1:
 *                           value:
 *                            - latitude: 116.222
 *                              longitude: 38.556
 *                              date: 2008-02-02
 *                            - latitude: 116.222
 *                              longitude: 8.556
 *                              date: 2008-02-02
 *        '400':
 *            description: 'Solicitud incorrecta'
 *            content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 *        '404':
 *            description: 'Trajectoria no encontrada'
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
 * /trajectories/location:
 *    get:
 *      tags:
 *      - trajectories
 *      summary: "Obtener la última ubicación de cada taxi"
 *      parameters:
 *      description: Endpoint para obtener la última ubicación registrada de cada taxi
 *      responses:
 *        '200':
 *           description: Ubicación obtenida con éxito.
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                      $ref: '#/components/schemas/Trajectories'
 *                  examples:
 *                        example1:
 *                           value:
 *                            - id: 4
 *                              taxi_id: 1214
 *                              latitude: 116.222
 *                              longitude: 38.556
 *                              date: 2008-02-02
 *                              plate: 4-PLACA1
 *                            - id: 8
 *                              taxi_id: 8888
 *                              latitude: 116.222
 *                              longitude: 8.556
 *                              date: 2008-02-02
 *                              plate: 8-PLACA2
 *                            - id: 2
 *                              taxi_id: 1214
 *                              latitude: 116.222
 *                              longitude: 38.556
 *                              date: 2008-02-02
 *                              plate: 2-PLACA3
 *                            - id: 12
 *                              taxi_id: 8888
 *                              latitude: 116.222
 *                              longitude: 8.556
 *                              date: 2008-02-02
 *                              plate: 12-PLACA4
 *                            - id: 16
 *                              taxi_id: 1214
 *                              latitude: 116.222
 *                              longitude: 38.556
 *                              date: 2008-02-02
 *                              plate: 16-PLACA5
 *                            - id: 18
 *                              taxi_id: 8888
 *                              latitude: 116.222
 *                              longitude: 8.556
 *                              date: 2008-02-02
 *                              plate: 18-PLACA6
 *                            - id: 20
 *                              taxi_id: 1214
 *                              latitude: 116.222
 *                              longitude: 38.556
 *                              date: 2008-02-02
 *                              plate: 20-PLACA7
 *                            - id: 22
 *                              taxi_id: 8888
 *                              latitude: 116.222
 *                              longitude: 8.556
 *                              date: 2008-02-02
 *                              plate: 22-PLACA8
 *                            - id: 44
 *                              taxi_id: 1214
 *                              latitude: 116.222
 *                              longitude: 38.556
 *                              date: 2008-02-02
 *                              plate: 44-PLACA9
 *                            - id: 88
 *                              taxi_id: 8888
 *                              latitude: 116.222
 *                              longitude: 8.556
 *                              date: 2008-02-02
 *                              plate: 88-PLACA10
 *        '400':
 *            description: 'Solicitud incorrecta'
 *            content:
 *                 application/json:
 *                    schema:
 *                           $ref: '#/components/schemas/Error'
 *        '404':
 *            description: 'Ubicación no encontrada'
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
routerTrajectories.get('/trajectories', trajectories_controller_1.getAll);
routerTrajectories.get('/trajectories/id', trajectories_controller_1.getTrajectories); //esta la voy hacer con id y date
routerTrajectories.get('/trajectories/location', trajectories_controller_1.getLocation); //esta la voy hacer con longitud y latitud
routerTrajectories.post('/trajectories', trajectories_controller_1.createTrajectories);
routerTrajectories.delete('/trajectories/:id', trajectories_controller_1.deleteTrajectories);
// routerTrajectories.put('/trajectories/:id', );
routerTrajectories.get('/trajectoriesBody', trajectories_controller_1.getBody); //esta esta hecha con el body
routerTrajectories.get('/trajectories/date/:date', trajectories_controller_1.getDate); //esta la voy hacer con date
routerTrajectories.get('/trajectorieTaxi/:taxi_id', trajectories_controller_1.getID); //esta la voy hacer con id
// routerTrajectories.get('/trajectories/lastTrajectory', lastTrajectory);//esta la voy hacer con prisma después
// routerTrajectories.get('/trajectories/:taxi_id', getTrajectories);//esta la voy hacer con id y date
exports.default = routerTrajectories;
// /**
//  * Get track
//  * @swagger
//  * /trajectories:
//  *    get:
//  *      tags:
//  *          - Trajectories 
//  *              trayectorias de los taxis
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
//  *                          $ref: '#/components/schemas/Trajectories'
//  *        '400':
//  *            description: 'Solicitud incorrecta'
//  *        '404':
//  *            description: 'Taxis no encontrado'
//  *        '500':
//  *              description: 'Error Interno del Servidor'
//  */
