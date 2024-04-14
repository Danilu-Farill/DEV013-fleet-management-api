//import { Router } from "express";
import express, { Router } from 'express';
import { createPlate, getAllPlate, getIdTaxis } from "../controller/taxi.controller";

//const taxiRouter = Router();
const router: Router = express.Router();

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
 *                          $ref: '#/components/schemas/Taxis'
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
 *                          $ref: '#/components/schemas/Taxis'
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
 *              $ref: '#/components/schemas/Taxis'
 *        required: true
 *      responses: 
 *        '200':
 *           description: Placa actualizada con éxito.
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
 *                          $ref: '#/components/schemas/Taxis'
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


router.get('/taxis', getAllPlate);
router.get('/taxis/:id', getIdTaxis);
router.post('/taxis', createPlate);
// taxiRouter.put('/:id', createPlate);
// taxiRouter.delete('/:id', createPlate);


export default router;





// /**
//  * Get track
//  * @swagger
//  *      tags:
//  *            description: contendido de los taxis
//  *            paths:
//  * /taxis:
//  *    get:
//  *      tags:
//  *      - taxis
//  *      summary: "Obtener lista de placas"
//  *      parameters:
//  *      - $ref: '#/components/schemas/Parameters/skipParam'
//  *      - $ref: '#/components/schemas/Parameters/takeParam'
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
//  *              content:
//  *                 application/json:
//  *                    schema:
//  *                           $ref: '#/components/schemas/Error'
//  *    post:
//  *      tags:
//  *      - taxis
//  *      summary: "Crear placas"
//  *      description: Endpoint para crear las placas de taxis
//  *      requestBody:
//  *        description: crear una nueva placa de taxi
//  *        content:
//  *          application/json:
//  *            schema:
//  *              $ref: '#/components/schemas/Taxis'
//  *        required: true
//  *      responses: 
//  *        '201':
//  *           description: Placas creadas con éxito.
//  *           content: 
//  *              application/json: 
//  *                  schema:
//  *                      type: array
//  *                      items:
//  *                          $ref: '#/components/schemas/Taxis'
//  *        '400':
//  *            description: 'Solicitud incorrecta'
//  *        '404':
//  *            description: 'No creado'
//  *        '500':
//  *              description: 'Error Interno del Servidor'
//  *              content:
//  *                 application/json:
//  *                    schema:
//  *                           $ref: '#/components/schemas/Error'
//  * /taxis/id:
//  *    put:
//  *      tags:
//  *      - taxis
//  *      summary: "Actualizar placas"
//  *      description: Endpoint para actualizar las placas de los taxis
//  *      parameters:
//  *        - name: taxiID
//  *          in: path
//  *          description: Se necesita el ID para actualizar una placa
//  *          required: true
//  *          schema: 
//  *              type: integer
//  *              format: int64
//  *      operationId: updatePlate
//  *      requestBody:
//  *        description: actualiza una placa en existencia
//  *        content:
//  *          application/json:
//  *            schema:
//  *              $ref: '#/components/schemas/Taxis'
//  *        required: true
//  *      responses: 
//  *        '200':
//  *           description: Placa actualizada con éxito.
//  *           content: 
//  *              application/json: 
//  *                  schema:
//  *                      type: array
//  *                      items:
//  *                          $ref: '#/components/schemas/Taxis'
//  *        '400':
//  *            description: 'Solicitud incorrecta'
//  *            content:
//  *                 application/json:
//  *                    schema:
//  *                           $ref: '#/components/schemas/Error'
//  *        '404':
//  *            description: 'Taxi no encontrado'
//  *            content:
//  *                 application/json:
//  *                    schema:
//  *                           $ref: '#/components/schemas/Error'
//  *        '500':
//  *              description: 'Error Interno del Servidor'
//  *              content:
//  *                 application/json:
//  *                    schema:
//  *                           $ref: '#/components/schemas/Error'
//  *    delete:
//  *      tags:
//  *      - taxis
//  *      summary: "Eliminar placas"
//  *      description: Endpoint para obtener las placas y id de todos los taxis
//  *      parameters:
//  *        - name: taxiID
//  *          in: path
//  *          description: Se necesita el ID para eliminar una placa
//  *          required: true
//  *          schema: 
//  *              type: integer
//  *              format: int64
//  *      responses: 
//  *        '200':
//  *           description: Placa elimnada con éxito.
//  *           content: 
//  *              application/json: 
//  *                  schema:
//  *                      type: array
//  *                      items:
//  *                          $ref: '#/components/schemas/Taxis'
//  *        '400':
//  *              description: 'Solicitud incorrecta'
//  *              content:
//  *                 application/json:
//  *                    schema:
//  *                           $ref: '#/components/schemas/Error'
//  *        '404':
//  *              description: 'Taxis no encontrado'
//  *              content:
//  *                 application/json:
//  *                    schema:
//  *                           $ref: '#/components/schemas/Error'
//  *        '500':
//  *              description: 'Error Interno del Servidor'
//  *              content:
//  *                 application/json:
//  *                    schema:
//  *                           $ref: '#/components/schemas/Error'
//  *    get:
//  *      tags:
//  *      - taxis
//  *      summary: "Obtener una placa por ID"
//  *      description: Endpoint para obtener una placa por ID
//  *      operationId: obtener una placa
//  *      parameters:
//  *        - name: taxiID
//  *          in: path
//  *          description: ID del taxi
//  *          required: true
//  *          schema: 
//  *              type: integer
//  *              format: int64
//  *      responses: 
//  *        '200':
//  *           description: Placa obtenida con éxito.
//  *           content: 
//  *              application/json: 
//  *                  schema:
//  *                      type: array
//  *                      items:
//  *                          $ref: '#/components/schemas/Taxis'
//  *        '400':
//  *            description: 'Solicitud incorrecta'
//  *            content:
//  *                 application/json:
//  *                    schema:
//  *                           $ref: '#/components/schemas/Error'
//  *        '404':
//  *            description: 'Taxi no encontrado'
//  *            content:
//  *                 application/json:
//  *                    schema:
//  *                           $ref: '#/components/schemas/Error'
//  *        '500':
//  *              description: 'Error Interno del Servidor'
//  *              content:
//  *                 application/json:
//  *                    schema:
//  *                           $ref: '#/components/schemas/Error'
//  */

















// *    components:
// *       schemas:
// *          Order:
// *              type: object
// *              properties:
// *                  id:
// *                      type: integer
// *                      format: int64
// *                      example: 66
// *                  plate: 
// *                      type: string
// *                      format: int64
// *                      example: hoa-4555


// /**
//  * Get track
//  * @swagger
//  * /taxis:
//  *    get:
//  *      tags:
//  *          - Taxis 
//  *              contendido de los taxis
//  *      summary: "Obtener lista de placas"
//  *      parameters:
//  *      - $ref: '#/components/schemas/Parameters/skipParam'
//  *      - $ref: '#/components/schemas/Parameters/takeParam'
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
//  *              content:
//  *                 application/json:
//  *                    schema:
//  *                           $ref: '#/components/schemas/Error'
//  *    post:
//  *      tags:
//  *          - Taxis crear contenido de taxis
//  *      summary: "Crear placas"
//  *      description: Endpoint para crear las placas y id de los taxis
//  *      responses:
//  *        '201': 
//  *          description: placa creada con éxito
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      type: array
//  *                      items:
//  *                          $ref: '#/components/schemas/Taxis'
//  * /taxis/:id:
//  *    get:
//  *      tags:
//  *          - Contenido del taxi 
//  *      summary: "Obtener una placa, mediante id o plate"
//  *      description: Endpoint para obtener una placa de taxi
//  *      responses: 
//  *        '200':
//  *           description: Placa encontrada con éxito.
//  *           content: 
//  *              application/json: 
//  *                  schema:
//  *                      type: array
//  *                      items:
//  *                          $ref: '#/components/schemas/Taxis'
//  *        '400':
//  *            description: 'Solicitud incorrecta'
//  *        '404':
//  *            description: 'Taxi no encontrado'
//  *        '500':
//  *              description: 'Error Interno del Servidor'
//  *              content:
//  *                 application/json:
//  *                    schema:
//  *                           $ref: '#/components/schemas/Error'
//  */



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