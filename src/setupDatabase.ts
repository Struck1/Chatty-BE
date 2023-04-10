import Logger from 'bunyan';
import mongoose from 'mongoose';
import { config } from './config';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
	const connect = () => {
		mongoose
			.connect(`${config.DATABASE_URL}`)
			.then(() => {
				log.info('Successfully connected to database');
			}).catch((e) => {
				log.error('Error connected to database');
				return process.exit(1);
			});
	};
	connect();

	mongoose.connection.on('disconnected', connect);
};
