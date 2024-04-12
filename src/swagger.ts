// // const swaggerJSDoc = require("swagger-jsdoc");
// // import path from "path";
// // import swaggerJSDoc from "swagger-jsdoc";
// import swaggerJSDoc, { OAS3Definition, OAS3Options} from "swagger-jsdoc";

// const swaggerDefinition: OAS3Definition = {
//       openapi: "3.0.0",
//       info: { title: "documentation taxis", version: "1.0.0" },
//       servers: [{
//         url: "http://localhost:3000"
//     }],
//     components: {
//         schemas: {
//             Taxis: {
//                 type: "object",
//                 properties: {
//                     id: {
//                         type: "integer"
//                     },
//                     plate: {
//                         type: "string",
//                     },
//                 },
//             },
//             Trajectories: {
//                 type: "object",
//                 properties: {
//                     id: {
//                         type: "integer"
//                     },
//                     taxi_id: {
//                         type: "integer"
//                     },
//                     date: {
//                         type: "string"
//                     },
//                     latitude: {
//                         type: "number"
//                     },
//                     longitude: {
//                         type: "number"
//                     }
//                 }
//             }
//         }
        
//     }
// };
// const swaggerOptions: OAS3Options = {
//     swaggerDefinition,
//     apis: ['./routes/*.ts']
// };

// export default swaggerJSDoc(swaggerOptions)



import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const routerSwagger = express.Router();


const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentation taxis',
            version: '1.0.0',
            description: 'Documentation for your API',
            },
            servers: [{ url: 'http://localhost:3000' }],
            components: {
                schemas: {
                    Taxis: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer"
                            },
                            plate: {
                                type: "string",
                            },
                        },
                    },
                    Trajectories: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer"
                            },
                            taxi_id: {
                                type: "integer"
                            },
                            date: {
                                type: "string"
                            },
                            latitude: {
                                type: "number"
                            },
                            longitude: {
                                type: "number"
                            }
                        }
                    }
                }
                                
            }
    },
    apis: ['./src/routes/*.ts'],
};
  
  const swaggerSpec = swaggerJSDoc(options);
  routerSwagger.use('/api-docs', swaggerUi.serve);
routerSwagger.get('/api-docs', swaggerUi.setup(swaggerSpec));

export default routerSwagger;


//PARA USARLO CON SWAGGER AUTOGEN Y LAS INSTALACIONES DE TSCONFING.JSON

//const swaggerSpec = swaggerJSDoc(options);


// // const swaggerUi = require("swagger-ui-express");

// const options: swaggerJSDoc.Options = {
//     definition: {
//       openapi: "3.0.0",
//       info: { title: "documentation taxis", version: "1.0.0" },
//       servers: [{
//         url: "http://localhost:3000"
//     }]
//     },
//     apis: [".src/routes/*.ts"]
//     //apis: [`${path.join(__dirname, './router/*')}`],
//     // apis: ["./src/v1/routes/workoutRoutes.js", "./src/database/Workout.js"],
// };

// const swaggerSpec = swaggerJSDoc(options);
// export default swaggerSpec;

// // // Function to setup our docs
// // const swaggerDocs = (app, port) => {
// //     // Route-Handler to visit our docs
// //     app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// //     // Make our docs in JSON format available
// //     app.get("/api/v1/docs.json", (req, res) => {
// //       res.setHeader("Content-Type", "application/json");
// //       res.send(swaggerSpec);
// //     });
// //     console.log(
// //       `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
// //     );
// //   };
  
// //   module.exports = { swaggerDocs };

// import swaggerAutogen from 'swagger-autogen';

// const doc = {
//     info: {
//         version: 'v1.0.0',
//         title: 'Swagger Demo Project',
//         description: 'Implementation of Swagger with TypeScript'
//     },
//     servers: [
//         {
//             url: 'http://localhost:3000',
//         },
//     ],
//     components: {
//         schemas: {
//             Taxis: {
//                 type: "object",
//                 properties: {
//                     id: {
//                         type: "integer"
//                     },
//                     plate: {
//                         type: "string",
//                     },
//                 },
//             },
//             Trajectories: {
//                 type: "object",
//                 properties: {
//                     id: {
//                         type: "integer"
//                     },
//                     taxi_id: {
//                         type: "intenger"
//                     },
//                     date: {
//                         type: "string"
//                     },
//                     latitude: {
//                         type: "number"
//                     },
//                     longitude: {
//                         type: "number"
//                     }
//                 }
            
//         }
//     }
// }
// };

// const outputFile = './swagger_output.json';
// const endpointsFiles = ['./routes/*.ts'];

// swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);