import dotenv from 'dotenv';
import bunyan from 'bunyan';
import cloudinary from 'cloudinary';

dotenv.config({});

class Config {
	public DATABASE_URL?: string;
	public JWT_TOKEN?: string;
	public NODE_ENV?: string;
	public SECRET_KEY_ONE?: string;
	public SECRET_KEY_TWO?: string;
	public CLIENT_URL?: string;
	public REDIS_HOST?: string;
	public CLOUD_NAME?: string;
	public CLOUD_API_KEY?: string;
	public CLOUD_SECRET_KEY?: string;

	private readonly DEFAULT_DATABASE_URL = 'mongodb://127.0.0.1:27017/app';

	constructor() {
		this.DATABASE_URL 		= process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
		this.JWT_TOKEN 				= process.env.JWT_TOKEN || 'test';
		this.NODE_ENV 				= process.env.NODE_ENV || '';
		this.SECRET_KEY_ONE 	= process.env.SECRET_KEY_ONE || '';
		this.SECRET_KEY_TWO 	= process.env.SECRET_KEY_TWO || '';
		this.CLIENT_URL				= process.env.CLIENT_URL || '';
		this.REDIS_HOST 			= process.env.REDIS_HOST || '';
		this.CLOUD_NAME				= process.env.CLOUD_NAME || '';
		this.CLOUD_API_KEY 		= process.env.CLOUD_API_KEY || '';
		this.CLOUD_SECRET_KEY = process.env.CLOUD_SECRET_KEY ||'';
	}

	public createLogger(name: string): bunyan {
		return bunyan.createLogger({ name, level: 'debug' });
	}

	public validateConfig(): void {
		for (const [key, value] of Object.values(this)) {
			if (value === undefined) {
				throw new Error(`Configuration ${key} is undefined`);
			}
		}
	}

	public cloudinaryConfig(): void {
		cloudinary.v2.config({
			cloud_name : config.CLOUD_NAME,
			api_key		 : config.CLOUD_API_KEY,
			api_secret : config.CLOUD_SECRET_KEY
		});
	}
}

export const config: Config = new Config();
