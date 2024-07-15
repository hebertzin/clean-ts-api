import { ExpressApp } from './app';
import { env } from './config/env';

const app = new ExpressApp();

app.start(env.PORT);
