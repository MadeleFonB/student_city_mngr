import { Request, Response, Router } from 'express';
import { Logger } from 'tslog';
import RequestLogger from '../utilities/RequestLogger';
import OpenApiValidatorProvider from '../utilities/OpenApiValidatorProvider';
import StudentService from '../services/StudentService';
import IStudent from '../models/IStudent';
import IStudentCourses from '../models/IStudentCourses';
import IStudentId from '../models/IStudentId';

const logger = new Logger({ name: 'ob:StudentController' });
const validator = OpenApiValidatorProvider.getValidator();

const StudentController = Router();

StudentController.get(
  '/getStudents',
  RequestLogger.basic,
  validator.validate('get', '/getStudents'),
  async (req: Request, res: Response) => {
    const rqUuid: string = req.headers['x-rquid'] as string;
    const limit: number = req.query.limit as unknown as number;
    logger.info(`[${rqUuid}] Looking for ${limit} student(s)`);
    const students: IStudent[] = await StudentService.getStudents(
      rqUuid,
      limit,
    );
    res.send(students);
    res.end();
  },
);

StudentController.get(
  '/getStudentById',
  RequestLogger.basic,
  validator.validate('get', '/getStudentById'),
  async (req: Request, res: Response) => {
    const rqUuid: string = req.headers['x-rquid'] as string;
    const studentId: string = req.query.studentId as string;
    logger.info(
      `[${rqUuid}] Looking for information about the student ${studentId}`,
    );
    const student: IStudentCourses = await StudentService.getStudentById(
      rqUuid,
      studentId,
    );
    res.send(student);
    res.end();
  },
);

StudentController.post(
  '/addStudent',
  RequestLogger.basic,
  validator.validate('post', '/addStudent'),
  async (req: Request, res: Response) => {
    const rqUuid: string = req.headers['x-rquid'] as string;
    const payload = req.body as IStudent;
    logger.info(`[${rqUuid}] Trying to add a new student`);
    const result: IStudentId = await StudentService.addStudent(rqUuid, payload);
    res.send(result);
    res.end();
  },
);

export default StudentController;
