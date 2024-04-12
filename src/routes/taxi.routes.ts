//import { Router } from "express";
import express, { Router } from 'express';
import { createPlate, getAllPlate, getIdTaxis } from "../controller/taxi.controller";

//const taxiRouter = Router();
const router: Router = express.Router();

/**
 * Get track
 * @swagger
 * /taxis:
 *    get:
 *      tags:
 *      -taxis
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
 */

router.get('/taxis', getAllPlate);
router.get('/taxis/:id', getIdTaxis);
router.post('/taxis', createPlate);
// taxiRouter.put('/:id', createPlate);
// taxiRouter.delete('/:id', createPlate);


export default router;

