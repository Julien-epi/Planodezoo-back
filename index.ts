import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";


import userRoutes from './routes/user.routes';
import zooRoutes from './routes/zoo.routes';
import spaceRoutes from "./Routes/spaces.routes";
import servicebookRoutes from "./routes/servicebook.routes";
import ticketRoutes from "./routes/ticket.routes";
import treatmentRoutes from "./routes/treatment.routes";
import animalRoutes from "./Routes/animal.routes";
import Database from "./Config/database";
import checkticketsRoutes from "./routes/checktickets.routes";

class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  private async initializeDatabase(): Promise<void> {
    const database = new Database(process.env.MONGODB_URI as string, {});
    await database.connect();
  }

  private initializeMiddleware(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "PlanodeZoo API with Swagger",
          version: "1.0.0",
        },
        components: {
          securitySchemes: {
            BearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
          }
        },
      },
      apis: ["./routes/*.ts"], // path to the files where you've defined doc comments
    };
    const specs = swaggerJsdoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeRoutes(): void {
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/zoo', zooRoutes)
    this.app.use("/api/spaces", spaceRoutes);
    this.app.use("/api/servicebook", servicebookRoutes);
    this.app.use("/api/tickets", ticketRoutes);
    this.app.use("/api/treatments", treatmentRoutes);
    this.app.use("/api/animals", animalRoutes);
    this.app.use('/api', checkticketsRoutes);
  }

  private initializeErrorHandling(): void {
    this.app.use(
      (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.status(500).send({ error: err.message });
      }
    );
  }

  public async start(): Promise<void> {
    await this.initializeDatabase();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

// Créez une instance du serveur et démarrez-la
const server = new Server(+process.env.PORT! || 3000);
server.start();
