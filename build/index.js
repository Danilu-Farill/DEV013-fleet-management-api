"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taxi_routes_1 = __importDefault(require("./routes/taxi.routes"));
const trajectories_routes_1 = __importDefault(require("./routes/trajectories.routes"));
const swagger_1 = __importDefault(require("./swagger"));
// import swaggerUi from 'swagger-ui-express';
// import swaggerSetup from './swagger';
// import swaggerSpec from './swagger'
// import swaggerJSDoc from "swagger-jsdoc";
//import { swaggerOptions } from './swagger';
//PARA USAR CON SWAGGER AUTOGEN
// import swaggerOutput from "swagger_output.json";
// import swaggerUi from "swagger-ui-express";
// import swaggerOutput from "./swagger";
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
const app = (0, express_1.default)();
// const PORT: number = 3000;
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
//rutas declaradas
app.use(taxi_routes_1.default, trajectories_routes_1.default);
//swagger
// //const configSwagger = swaggerJSDoc(swaggerOptions);
// //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup))
app.use(swagger_1.default);
//condicional con el node_env sea distinto
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log('SERVER IS UP ON PORT:', PORT);
    });
}
exports.default = app;
// // app.get('/', async (req, res):Promise<void> => {
// //   res.send({message: "taxis activos"}).status(200);
// // });
// // const taxiRouter = Router();
// // async function main() {
// //     const allUsers = await prisma.taxis.findMany()//buscar
// //     console.log(allUsers)
// //   }
// //   main()
// // app.get("/", function(req: Request, resp: Response) {
// //   resp.send("taxis");
// // })
// // app.listen(3000, () => {
// //     console.log("servidor conectado 3000");
// // })
// // app.use('/', async (req: Request, res: Response): Promise<void> => {
// //   const allUsers = await prisma.taxis.findMany()
// //     console.log(allUsers)
// //   res.send(allUsers);
// // });
// /*
// // import swaggerUi from "swagger-ui-express"; 
// // import swaggerOutput from "./swagger_output.json"; ESTO LO DEBO DE AGREGAR DESDE TYPESCRIpT CONFIG
// // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerUiOptions));
// */
