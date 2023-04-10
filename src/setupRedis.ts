
import { createClient } from 'redis';
import { config } from './config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('redisConnection');
const redisURL = config.REDIS_HOST;

export const redisClient = ():ReturnType<typeof createClient> => {
	const client = createClient({ url: redisURL });

	client.on('connect', () => log.info('Cache is connecting'));
	client.on('ready', () => log.info('Cache is ready'));
	client.on('end', () => log.info('Cache disconnected'));
	client.on('reconnecting', () => log.info('Cache is reconnecting'));
	client.on('error', (e) => log.error(e));
	return client;

};

export const startRedis = async (client: ReturnType<typeof createClient>): Promise<void> => {
	try {
		await client.connect();
		log.info(`Redis connection: ${await client.ping()}`);
	} catch (error) {
		log.error(error);
	}
};





