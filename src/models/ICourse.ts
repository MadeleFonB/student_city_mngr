import IClassroom from './IClassroom';

export default interface ICourse {
  id: string;
  description: string;
  homeroomTeacher: string;
  category: string;
  year: number;
  classroom: IClassroom;
}
