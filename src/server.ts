import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import * as database from '@src/database';
import { Application } from 'express';
import { ForecastController } from './controllers/forecast';
import { BeachesController } from './controllers/beaches';
import { UsersController } from './controllers/users';
import logger from './logger';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    const beachesController = new BeachesController();
    const usersController = new UsersController();
    this.addControllers([
      forecastController,
      beachesController,
      usersController,
    ]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }

   start(): void {
     this.app.listen(this.port, () => {
       logger.info(`Server listeninig on port: ${this.port}`);
     })
  }
}
