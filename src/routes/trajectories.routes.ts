import express, { Router } from 'express';
import { getAllTrajectories, getIdTrajectories } from '../controller/trajectories.controller';

const routerTrajectories: Router = express.Router();

/**
 * Get track
 * @swagger
 * tags:
 *          - name: trajectories
 *            description: contendido de los taxis
 *            paths:
 * /trajectories:
 *    get:
 *      tags:
 *      - trajectories
 *      summary: "Obtener la longitud, latitud"
 *      description: Endpoint para obtener las placas y id de todos los taxis
 *      responses: 
 *        '200':
 *           description: Placas listadas con éxito.
 *           content: 
 *              application/json: 
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Trajectories'
 *        '400':
 *            description: 'Solicitud incorrecta'
 *        '404':
 *            description: 'Taxis no encontrado'
 *        '500':
 *              description: 'Error Interno del Servidor'
 *    post:
 *      tags:
 *      - trajectories
 *      summary: "Crear placas"
 *      description: Endpoint para crear las placas de taxis
 *      requestBody:
 *        description: crear una nueva placa de taxi
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Taxis'
 *        required: true
 *      responses: 
 *        '201':
 *           description: Placas creadas con éxito.
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
 * /trajectories/id:
 *    put:
 *      tags:
 *      - trajectories
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
 *              $ref: '#/components/schemas/Trajectories'
 *        required: true
 *      responses: 
 *        '200':
 *           description: Placa actualizada con éxito.
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
 *      - trajectories
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
 *                          $ref: '#/components/schemas/Trajectories'
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
 *      - trajectories
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
 *                          $ref: '#/components/schemas/Trajectories'
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

routerTrajectories.get('/trajectories', getAllTrajectories);
routerTrajectories.get('/trajectories/:id', getIdTrajectories);
// router.post('/trajectories', createTrajectories);
// taxiRouter.put('/:id', createPlate);
// taxiRouter.delete('/:id', createPlate);


export default routerTrajectories;

