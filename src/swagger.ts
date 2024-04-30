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
      description: 'Documentation for my API',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        Taxis: {
          taxiExample1: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                example: 10133,
              },
              plate: {
                type: "string",
                example: "PAOF-6727"
              },
            },
          },
          taxiExample2: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                example: 5,
              },
              plate: {
                type: "string",
                example: "5555-DBA"
              },
            },
          }
        },
        Trajectories: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              format: "int64",
              example: 8
            },
            taxi_id: {
              type: "integer",
              format: "int32",
              example: 10133
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2008-02-02 13:47:59"
            },
            latitude: {
              type: "number",
              format: "int64",
              example: 116.37659
            },
            longitude: {
              type: "number",
              format: "int64",
              example: 39.85567
            }
          }
        },
        Parameters: {
          dateParams: {
            name:"_date",
            in: "query",
            description: "fecha de la cual se va a buscar",
            example: "2008-02-02",
            schema: {
              type: "integer"
            }
          },
          skipParam: {
            name: "_skip",
            in: "query",
            description: "número del que partir",
            example: 2,
            schema: {
              type: "integer"
            }
          },
          takeParam: {
            name: "_take",
            in: "query",
            description: "cantidad mostrada",
            example: 1,
            schema: {
              type: "integer"
            }
          },
        },
        Error: {
          type: "object",
          properties: {
            // code: {
            //     description: "Código de error",
            //     type: "string"
            // },
            // status: {
            //     description: "httpstatus",
            //     type: "integer",
            //     format: "int32",
            // },
            // type: {
            //     type: "string",
            //     description: "Tipo de error",
            // },
            message: {
              type: "string",
              description: "Mensaje de error"
            }
          }
        },
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