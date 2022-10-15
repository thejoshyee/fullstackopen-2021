

  type Operation = 'multiply' | 'add' | 'divide';
  type Result = number;

  const calc = (a: number, b: number, op: Operation): Result => {
    switch(op) {
      case 'multiply':
        return a * b;
      case 'divide':
        if (b === 0) throw new Error('Can\'t divide by 0!');
        return a / b;
      case 'add':
        return a + b;
      default:
        throw new Error('Operation is not right bro.')
    }
  }

  // try {
  //   console.log(calc(1, 5, 'divide'));
  // } catch (error: unknown) {
  //   let errorMessage = 'something is broke'
  //   if (error instanceof Error) {
  //     errorMessage += ' Error: ' + error.message
  //   }
  //   console.log(errorMessage);
  // }

  const first: number = Number(process.argv[2])
  const second: number = Number(process.argv[3])
  const op: string = String(process.argv[4])