interface ParseQuery {
  weight: number;
  height: number;
}

interface Args {
  weight: string;
  height: string;
}

export const parseQuery = (args: Args): ParseQuery => {
  if (args.weight === undefined) {
    throw new Error('No weight provided');
  }
  if (args.height === undefined) {
    throw new Error('No height provided');
  }

  if (!isNaN(Number(args.weight)) && !isNaN(Number(args.height))) {
    return {
      weight: Number(args.weight),
      height: Number(args.height),
    };
  } else {
    throw new Error('Parameters can only be of type number!');
  }
};

export const calculateBmi = (weight: number, height: number): string => {
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
