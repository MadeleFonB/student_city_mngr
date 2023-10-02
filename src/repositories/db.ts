import IBuilding from '../models/IBuilding';
import IClassroom from '../models/IClassroom';
import ICourse from '../models/ICourse';
import IStudent from '../models/IStudent';
import { v4 as uuidv4 } from 'uuid';
import IStudentCourses from '../models/IStudentCourses';

export const students: IStudent[] = [
  {
    id: uuidv4(),
    names: 'Dominica',
    lastnames: 'Arenas Ochoa',
    birthDate: '10/10/2014',
    address: 'CL 45 # 34 - 7',
  },
  {
    id: uuidv4(),
    names: 'Aristeo',
    lastnames: 'Ibarra Bernal',
    birthDate: '20/04/2012',
    address: 'CRA 6 #15-88',
  },
  {
    id: uuidv4(),
    names: 'Yannick',
    lastnames: 'Tijerina Osorio',
    birthDate: '15/10/2015',
    address: 'AV C 63 #68-95',
  },
  {
    id: uuidv4(),
    names: 'Casimira',
    lastnames: 'Salinas Camarillo',
    birthDate: '14/06/2009',
    address: 'CRA 7 # 28-66',
  },
];

export const buildings: IBuilding[] = [
  {
    id: uuidv4(),
    name: 'Edificio B',
    latitude: 4.789204993419426,
    longitude: -74.04314764450038,
    elevation: 2630,
  },
  {
    id: uuidv4(),
    name: 'José María',
    latitude: 10.395444212539743,
    longitude: -75.49902519279122,
    elevation: 2,
  },
  {
    id: uuidv4(),
    name: 'Hemicyclium',
    latitude: 6.292132193698081,
    longitude: -75.54582311144947,
    elevation: 1495,
  },
];

export const classrooms: IClassroom[] = [
  {
    id: uuidv4(),
    building: buildings[0],
    floor: 2,
    number: 1,
  },
  {
    id: uuidv4(),
    building: buildings[0],
    floor: 2,
    number: 2,
  },
  {
    id: uuidv4(),
    building: buildings[0],
    floor: 1,
    wing: 'Este',
    number: 1,
  },
  {
    id: uuidv4(),
    building: buildings[0],
    floor: 1,
    wing: 'Oeste',
    number: 1,
  },
];

export const courses: ICourse[] = [
  {
    id: uuidv4(),
    description: '5-1',
    homeroomTeacher: 'Madeleine Torres',
    category: 'Primaria',
    year: 2020,
    classroom: classrooms[0],
  },
  {
    id: uuidv4(),
    description: '4-1',
    homeroomTeacher: 'Ignacio Perez',
    category: 'Primaria',
    year: 2019,
    classroom: classrooms[1],
  },
  {
    id: uuidv4(),
    description: '3-1',
    homeroomTeacher: 'Felipe Ordoñez',
    category: 'Primaria',
    year: 2018,
    classroom: classrooms[2],
  },
  {
    id: uuidv4(),
    description: '2-1',
    homeroomTeacher: 'Camila Ibarra',
    category: 'Primaria',
    year: 2017,
    classroom: classrooms[3],
  },
  {
    id: uuidv4(),
    description: '1-1',
    homeroomTeacher: 'Carla Iope',
    category: 'Primaria',
    year: 2016,
    classroom: classrooms[3],
  },
];

export const studentsCourse: IStudentCourses[] = [
  {
    ...students[0],
    courses: [courses[0], courses[2], courses[4]],
  },
  {
    ...students[1],
    courses: [courses[0], courses[1], courses[2], courses[3]],
  },
  {
    ...students[2],
    courses: [courses[2], courses[3], courses[4]],
  },
  {
    ...students[3],
    courses: [courses[0]],
  },
];
