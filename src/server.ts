import { ExpressApp } from './app';
import { env } from './env';

const app = new ExpressApp();

app.start(env.PORT);
