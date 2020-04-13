interface BmiValues {
  value1: number;
  value2: number;
}

const parseArgs = (args: Array<string>): BmiValues => {
  if (args.length < 4) {
    throw new Error('Not enough of arguments provided');
  }
  if (args.length > 4) {
    throw new Error('Too many arguments provided');
  }
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Parameters can only be of type number!');
  }
};

const calculateBmi = (weight: number, height: number): string => {
  const heightInMeters = height / 100;
  const BMI = weight / heightInMeters ** 2;

  if (BMI < 18.5) {
    return 'Underweight (unhealthy weight)';
  } else if (BMI < 25) {
    return 'Normal (healthy weight)';
  } else {
    return 'Overweight (unhealthy weight)';
  }
};

try {
  const { value1, value2 } = parseArgs(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log('Something went wrong,', e.message);
}
