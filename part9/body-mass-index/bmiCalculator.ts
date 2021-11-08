const calculateBmi = (height: number, weight: number): string => {
    let heightInMeters: number = height / 100;
    let result: number = weight / (heightInMeters * heightInMeters);
    if(result >= 30){
        return "Obese";
    }else if((result <=29) && (result >=25)){
        return "Overweight";
    }else{
        return "Normal (healthy weight)";
    }
}

const h: number = Number(process.argv[2])
const w: number = Number(process.argv[3])
console.log(calculateBmi(h,w));