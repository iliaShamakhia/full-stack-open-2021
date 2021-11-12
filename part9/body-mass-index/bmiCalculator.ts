export const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters: number = height / 100;
    const result: number = weight / (heightInMeters * heightInMeters);
    if(result >= 30){
        return "Obese";
    }else if((result <=29) && (result >=25)){
        return "Overweight";
    }else{
        return "Normal (healthy weight)";
    }
};

const h = Number(process.argv[2]);
const w = Number(process.argv[3]);
console.log(calculateBmi(h,w));