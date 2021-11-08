interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
  }

const calculateExercises = (hours: Array<number>, target: number): Result => {
    let trainingDays: number = hours.filter(h => h > 0).length;
    let average: number = hours.reduce((p,c) => p += c)/hours.length;
    let success: boolean = average >= target;
    let rating: number;
    let ratingDescription: string;
    let total: number = average - target;
    if(total >= 0){
        rating = 3;
        ratingDescription = "Good Job! Keep exercising";
    }else if(total < 0 && Math.abs(total) <= 1){
        rating = 2;
        ratingDescription = "not too bad but could be better";
    }else{
        rating = 1;
        ratingDescription = "Bro, put your stuff together"
    }
    return {
        periodLength: hours.length,
        trainingDays,
        target,
        average,
        success,
        rating,
        ratingDescription
    };
}

const t: number = Number(process.argv[2]);
const hr: Array<number> = [...process.argv].slice(3).map(el => Number(el));
console.log(calculateExercises(hr,t));