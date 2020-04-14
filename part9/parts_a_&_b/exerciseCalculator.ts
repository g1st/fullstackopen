interface CalculateExerciseValues {
  hoursArray: number[];
  target: number;
}

export const parseArgs = (
  hours: Array<string | number>,
  target: number | string
): CalculateExerciseValues => {
  if (hours === undefined || target === undefined) {
    throw new Error('Not enough of parameters provided');
  }
  if (isNaN(Number(target))) {
    throw new Error('Target must be a number');
  }

  if (
    hours.some((el) => typeof el === 'undefined' || el === null || el === '')
  ) {
    throw new Error('Exercise hours can be represented only as a number');
  }

  const hoursArray = hours.map((num) => Number(num));

  if (hoursArray.some((el: number) => isNaN(el))) {
    throw new Error('Exercise hours can be represented only as a number');
  }

  return {
    hoursArray,
    target: Number(target),
  };
};

const ratingDescription = (rating: number, target: number): string => {
  const difference = rating - target;
  if (difference < -0.5) {
    return 'It\'s not looking good, you need to improve';
  } else if (difference < 0) {
    return 'not too bad but could be better';
  } else if (difference < 0.5) {
    return 'great, you meet your daily target';
  } else {
    return 'impressive, you are smashing it!';
  }
};

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingInfo: string;
}

export const calculateExercises = (
  hoursPerDay: Array<number>,
  dailyTarget: number
): ExerciseResult => {
  const periodLength = hoursPerDay.length;
  const trainingDays = hoursPerDay.filter((hours) => hours > 0).length;
  const target = dailyTarget;
  const totalHours = hoursPerDay.reduce((a, b) => a + b);
  const average = totalHours / periodLength;
  const rating = Math.round(average);
  const ratingInfo = ratingDescription(average, target);
  const success = average > target;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingInfo,
    target,
    average,
  };
};

// try {
//   const { hoursArray, target } = parseArgs(process.argv);
//   console.log(calculateExercises(hoursArray, target));
// } catch (e) {
//   console.log('Sorry, something went wrong: ', e.message);
// }
