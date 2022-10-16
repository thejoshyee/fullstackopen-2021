// BMI - (weight (kg) / height (cm) / height (cm)) x 10,000

const calculateBmi = (weight: number, height: number) => {
    let bmi = weight / (height * height) * 10000;
    console.log("BMI:", bmi)
    if (bmi <= 16) {
        return 'underweight (severe thinness)'
    } else if (bmi <= 16.9) {
        return 'underweight (moderate thinness)'
    } else if (bmi <= 18.4) {
        return 'underweight (mid thinness)'
    } else if (bmi <= 24.9) {
        return 'normal range'
    } else if (bmi <= 34.9) {
        return 'Obese (class 1)'
    } else if (bmi <= 39.9) {
        return 'Obese (class 2)'
    } else if (bmi >= 40) {
        return 'Obese (class 3)'
    } else {
        return null
    }
}

console.log(calculateBmi(68, 170))