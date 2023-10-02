import { Logger } from 'tslog';
import IStudent from '../models/IStudent';
import { students, studentsCourse } from '../repositories/db';
import IStudentCourses from '../models/IStudentCourses';
import IStudentId from '../models/IStudentId';
import { v4 as uuidv4 } from 'uuid';

const logger = new Logger({ name: 'ob:StudentService' });

export default class StudentService {
  public static async getStudents(
    rqUuid: string,
    limit: number,
  ): Promise<IStudent[]> {
    return new Promise<IStudent[]>((resolve, reject) => {
      try {
        logger.info(`[${rqUuid}] ${students.length} students found!`);
        resolve(students.slice(0, limit));
      } catch (error) {
        logger.error(`[${rqUuid}] Error getting all teams:`, error);
        reject(error);
      }
    });
  }

  public static async getStudentById(
    rqUuid: string,
    studentId: string,
  ): Promise<IStudentCourses> {
    return new Promise<IStudentCourses>((resolve, reject) => {
      try {
        const basicInfo = students.find((student) => student.id === studentId);
        let result = {} as IStudentCourses;
        if (!basicInfo) {
          logger.warn(
            `[${rqUuid}] There are no students identified with ${studentId}`,
          );
        } else {
          const fullInfo = studentsCourse.find(
            (student) => student.id === studentId,
          );
          const resultInfo = fullInfo ?? basicInfo;
          result = {
            ...resultInfo,
          } as IStudentCourses;
          logger.info(`[${rqUuid}] Found student identified with ${studentId}`);
        }
        resolve(result);
      } catch (error) {
        logger.error(`[${rqUuid}] Error getting the student:`, error);
        reject(error);
      }
    });
  }

  public static async addStudent(
    rqUuid: string,
    student: IStudent,
  ): Promise<IStudentId> {
    return new Promise<IStudentId>((resolve, reject) => {
      try {
        if (!student.id) {
          student.id = uuidv4();
        }
        students.push(student);
        resolve({ studentId: student.id });
      } catch (error) {
        logger.error(`[${rqUuid}] Error adding student:`, error);
        reject(error);
      }
    });
  }
}
