import { ExpressApp } from './app';
import { env } from './infra/env';

const app = new ExpressApp();

app.start(env.PORT);
