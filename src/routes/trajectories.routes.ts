import express, { Router } from 'express';
import { getAll, getBody, createTrajectories, getID, getDate, getTrajectories, getLocation} from '../controller/trajectories.controller';

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
 *            description: 'Trajectoria no encontrada'
 *        '500':
 *              description: 'Error Interno del Servidor'
 *    post:
 *      tags:
 *      - trajectories
 *      summary: "Crear placas"
 *      description: Endpoint para crear trajectorias
 *      requestBody:
 *        description: crear una trajectoria
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
 * /trajectories/id:
 *    put:
 *      tags:
 *      - trajectories
 *      summary: "Actualizar trajectoria"
 *      description: Endpoint para actualizar la trajectoria
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
 *      description: Endpoint para eliminar la trajectoria de un taxi
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
 *      description: Endpoint para obtener una trajectoria por ID
 *      operationId: obtener una trajectoria
 *      parameters:
 *        - name: taxiID
 *          in: path
 *          description: ID de la trajectoria
 *          required: true
 *          schema: 
 *              type: integer
 *              format: int64
 *      responses: 
 *        '200':
 *           description: Trajectoria obtenida con éxito.
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
 */


routerTrajectories.get('/trajectories', getAll);
routerTrajectories.get('/trajectoriesBody', getBody);//esta esta hecha con el body
routerTrajectories.get('/date/:date', getDate);//esta la voy hacer con date
routerTrajectories.get('/trajectorieTaxi/:taxi_id', getID);//esta la voy hacer con id
routerTrajectories.get('/trajectories/:taxi_id', getTrajectories);//esta la voy hacer con id y date
routerTrajectories.get('/:date/:taxi_id', getTrajectories);//esta la voy hacer con id y date
routerTrajectories.get('/location/:taxi_id', getLocation);//esta la voy hacer con longitud y latitud

routerTrajectories.post('/trajectories', createTrajectories);
// routerTrajectories.put('/trajectories/:id', );
// routerTrajectories.delete('/trajectories/:id', );


export default routerTrajectories;




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