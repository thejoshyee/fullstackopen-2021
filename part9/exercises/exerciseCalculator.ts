interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
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
        arr[i - 2] = Number(process.argv[i]);
        i = i + 1;
    }

    if (flag === 0) {
        return arr;
    } else {
        throw new Error('provided values were not numbers')
    }
}

const calculateExercises = (targetNum: number, exercises: Array<number>): Result => {
    const getRating = (trainingDays: number): number => {
        if (trainingDays >= 3) {
            return 3
        } else if (trainingDays < 3) {
            return 2
        } else if (trainingDays <= 1){
            return 1
        }
    }

    const getRatingDescription = (rating: number): string => {
        if (rating === 1) {
            return "Try Harder!"
        } else if (rating === 2) {
            return "Not bad.."
        } else if (rating === 3) {
            return "Good Job!"
        }
    }

    const periodLength: number = exercises.length;
    const trainingDays: number = exercises.filter(exercise => exercise > 0).length;
    const success: boolean = exercises.filter((exercise: number) => exercise > 0).length >= targetNum;
    const rating = getRating(trainingDays);
    const ratingDescription: string = getRatingDescription(getRating(exercises.filter((exercise: number) => exercise > 0).length))
    const target: number = targetNum;
    const average: number = exercises.reduce((val: number, acc: number) => {
        return acc + val;
    }, 0) / exercises.length;

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
}}

// console.log(calculateExercises([3,1,3,4,2,1,4], 3))


try {
    const [first, ...rest] = parseArgs(process.argv);
    console.log(first, ...rest)
    console.log(calculateExercises(first, [...rest]))
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage)
}