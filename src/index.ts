import express, { Application } from 'express'; //Se importa express y Application de la librería express. Application es un tipo de TypeScript que se usa para tipar la constante app.
import router from './routes/taxi.routes';
import routerTrajectories from './routes/trajectories.routes';
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

const app: Application = express(); //se crea una instancia de la aplicación express y se tipa como Application para tener soporte de tipos con TypeScript
// const PORT: number = 3000;
const PORT: any = process.env.PORT || 3000;


app.use(express.json());//Este middleware se utiliza para analizar cuerpos de solicitudes JSON automáticamente. Cuando una solicitud con un cuerpo JSON llega al servidor, express.json() convierte ese cuerpo en un objeto JavaScript accesible en req.body.

//rutas declaradas
app.use('/taxis', router)
// app.use('/trajectories', routerTrajectories)
app.use(routerTrajectories);

//swagger
// //const configSwagger = swaggerJSDoc(swaggerOptions);
// //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup))
app.use(routerSwagger)

//condicional con el node_env sea distinto
if(process.env.NODE_ENV !== 'test'){
  app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
  });
}


export default app;







/*
Claro, la función app.use() en Express es un método que se utiliza para montar middleware en una aplicación. 
El middleware es una función que tiene acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función de 
middleware en el ciclo de solicitud/respuesta de la aplicación.

app.use(path, middleware);
path (opcional): Especifica una ruta base para la cual se aplicará el middleware. Si no se proporciona, el middleware se aplica a todas las rutas.
middleware: Es una función que maneja las solicitudes. Puede ser una función de middleware individual o una cadena de funciones de middleware.
*/




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

