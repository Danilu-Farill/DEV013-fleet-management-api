import express, { Application } from 'express';
import router from './routes/taxi.routes';
import routerTrajectories from './routes/trajectories.routes';
import routerSwagger from "./swagger";

const app: Application = express();
const PORT: any = process.env.PORT ||  3000;

app.use(express.json());

app.use(router, routerTrajectories);

app.use(routerSwagger)

if(process.env.NODE_ENV !== 'test'){
  app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
  });
}

export default app;