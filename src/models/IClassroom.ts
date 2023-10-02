import IBuilding from './IBuilding';

export default interface IClassroom {
  id: string;
  building: IBuilding;
  floor: number;
  wing?: string;
  number: number;
}
