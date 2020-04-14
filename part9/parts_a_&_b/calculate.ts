// export type Operation = 'multiply' | 'add' | 'divide';

type Result = number;

export const calculator = (a: number, b: number, op: string): Result => {
  if (a === undefined || isNaN(a))
    throw new Error("value1 missing or isn't a number");
  if (b === undefined || isNaN(b))
    throw new Error("value2 missing or isn't a number");
  if (op === undefined) throw new Error('operation description missing');

  switch (op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
};

// try {
//   console.log(calculator(1, 5, 'divide'));
// } catch (e) {
//   console.log('Something went wrong, error message: ', e.message);
// }
