import express, { Application } from 'express';
import router from './routes/taxi.routes';
import routerSwagger from "./swagger";

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

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

//rutas declaradas
app.use(router);

//swagger
// //const configSwagger = swaggerJSDoc(swaggerOptions);
// //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup))
app.use(routerSwagger)

app.listen(PORT, (): void => {
  console.log('SERVER IS UP ON PORT:', PORT);
});












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

