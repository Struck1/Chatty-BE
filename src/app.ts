import express, { Express } from 'express';
import { ChattyServer } from './setupServer';
import databaseConnection from './setupDatabase';
import { config } from './config';
import { redisClient, startRedis } from './setupRedis';

class Application {
	public initialize(): void {
		this.loadConfig();
		databaseConnection();
		startRedis(redisClient());
		const app: Express = express();
		const server: ChattyServer = new ChattyServer(app);
		server.start();
	}

	private loadConfig(): void {
		config.validateConfig();
		config.cloudinaryConfig();
	}
}

const application: Application = new Application();
application.initialize();
