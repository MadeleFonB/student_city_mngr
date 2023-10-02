import express from 'express';
import StudentController from './controllers/StudentController';
import ExampleController from './controllers/ExampleController';

// Create a new express application instance
const app: express.Application = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

app.use(StudentController);
app.use(ExampleController);

export default app;
