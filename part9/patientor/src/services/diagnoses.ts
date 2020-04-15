import diagnosesData from '../data/diagnosesData';
import { Diagnose } from '../types';

const getAllDiagnoses = (): Array<Diagnose> => {
  return diagnosesData;
};

export default { getAllDiagnoses };
