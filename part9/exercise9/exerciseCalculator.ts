interface Result {
    periodLength: number;
    trainingDays: any;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}


const parseArgs = (args: Array<string>): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    let arr: number[] = [];
    let i = 2;
    let flag = 0;

    while (process.argv[i]) {
        if (isNaN(Number(args[i]))) {
            flag = flag + 1;
        }
        arr[i - 2] = Number(process.argv[i])
        i = i + 1
    }

    if (flag == 0) {
        return arr
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }


const calculateExercises = ( targetGoal: number, exerciseHours: Array<number>): Result => {
    const periodLength: number = exerciseHours.length;

    let trainingDays: number = exerciseHours.filter(hour => hour > 0).length;

    const success: boolean = exerciseHours.filter(hour => hour >= 2).length === periodLength;

    const getRating = (trainingDays : number): number => {
        if (trainingDays === 7) {
            return 5;
        } else if (trainingDays <= 6) {
            return 4;
        } else if (trainingDays <= 5) {
            return 4;
        } else if (trainingDays <= 4) {
            return 3
        } else if (trainingDays <= 3) {
            return 2;
        } else if (trainingDays <= 2) {
            return 1;
        }
        return 0;
    }

   const rating = getRating(trainingDays)

   const getDescription = (daysTrained: number): string => {
        if (daysTrained <= 1) {
            return "Stop being lazy!";
        } else if (daysTrained <= 3) {
            return "Not bad I guess, but you could be better.";
        } else if (daysTrained <= 5) {
            return "You are doing decently well..."
        } else if (daysTrained >= 6) {
            return "Wow you are a beast! Congrats! Keep it up!"
        }
        return "";
   }
   
    const ratingDescription: string = getDescription(trainingDays)

    const target: number = targetGoal;

    const average: number = exerciseHours.reduce((total, acc) => total + acc / periodLength, 0 );

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}


try {
    // const arr: number[] = parseArgs(process.argv);
    // const arr2: number[] = parseArgs(process.argv);

    console.log(calculateExercises(1, [1,2,3]));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }


