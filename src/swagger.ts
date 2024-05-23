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
