import ICourse from './ICourse';
import IStudent from './IStudent';

export default interface IStudentCourses extends IStudent {
  courses?: ICourse[];
}
