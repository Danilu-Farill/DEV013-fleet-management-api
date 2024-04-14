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
 * /trajectories:
 *    getById:
 *      tags:
 *          - Trajectories
 *              todo sobre las tajectorias de los taxis
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
 *                          $ref: '#/components/schemas/Trajectories'
 *        '400':
 *            description: 'Solicitud incorrecta'
 *        '404':
 *            description: 'Taxis no encontrado'
 *        '500':
 *              description: 'Error Interno del Servidor'
 */
routerTrajectories.get('/trajectories', trajectories_controller_1.getAllTrajectories);
routerTrajectories.get('/trajectories/:id', trajectories_controller_1.getIdTrajectories);
// router.post('/trajectories', createTrajectories);
// taxiRouter.put('/:id', createPlate);
// taxiRouter.delete('/:id', createPlate);
exports.default = routerTrajectories;
