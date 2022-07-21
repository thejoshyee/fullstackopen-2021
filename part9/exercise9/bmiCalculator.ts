interface weightHeightValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: Array<string>): weightHeightValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}


const calculateBmi = (a: number, b: number): string => {
    const bmi = a / (b * b) * 703;
        if (bmi < 17) {
            return 'You are underweight';
        } else if (bmi > 17 && bmi < 25) {
            return 'You are in the normal weight range';
        } else if (bmi > 25) {
            return 'You are overweight';
        } else {
            throw new Error('Values are not numbers');
        }
}

try {
    const { value1, value2 } = parseArguments(process.argv)
    console.log(calculateBmi(value1, value2));

} catch (error: unknown) {
    let errorMessage = 'Something went wrong'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

