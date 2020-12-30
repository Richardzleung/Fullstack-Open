interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  description: string;
}

interface RatingResult {
  rating: number;
  description: string;
}
/* @@@@ 9.1-9.3 @@@@@@@
interface CalculatorArgs {
  value1: number;
  value2: Array<number>;
}

const parseArgument = (args: Array<string>): CalculatorArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const inputArray:Array<number> = [];

  for (let i = 2; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      if (i === 2) {
        continue;
      }
      else {
        inputArray.push(Number(args[i]));
      }
    } 
    else {
      throw new Error('Provided values were not numbers!');
    }
  } 
  return {
    value1: Number(args[2]),
    value2: inputArray
  };
};
*/
const rateHours = (average: number, target: number): RatingResult => {
  console.log('average: ', average, "target", target);
  switch (true) {
    case average > target: 
      return { rating: 3, description: "Target surpassed! You did it!!"}; 
    case average === target:
      return { rating: 2, description: "Right on target!"};
    case average < target:
      return { rating: 1, description: "Try Harder!"};
    default:
      throw new Error("feels bad");
  }
};

const calculateExercises = (target: number, hours: Array<number>): Result => {
  const average = hours.reduce((a,b) => a + b, 0)/hours.length;
  const { rating , description } = rateHours(average, target);
  const trainingDays = hours.reduce((a,b) => {
    if (b !== 0) {
      return a + 1;
    } else {
      return a;
    }
  }, 0);

  const result = {
    periodLength: hours.length,
    trainingDays,
    success: average > target,
    rating,
    description,
    target,
    average
  };
  return result;
};
/*
try {
  const { value1, value2 } = parseArgument(process.argv);
  console.log(calculateExercises( value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
*/

export default calculateExercises;