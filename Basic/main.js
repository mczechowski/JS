/*  // Code 1 **************************************************************
let John = (89 + 120 + 103) / 3
let Mike = (116 + 94 + 180) / 3
let Mary = (97 + 134 + 105) / 3

if (John > Mike && John > Mary) {
    console.log("Wygrał John z wynikiem:" + John)
} else if (Mike > John && Mike > Mary) {
    console.log("Wygrał Mike z wynikiem: " + Mike)
} else {
    console.log("Wygrał Mary z wynikiem: " + Mary) 
}

console.log(John, Mike, Mary) 
*/


/* // Code 2 *************************************************************** 
function TipCalculator(bill){
    if (bill < 50){
        tip = .2;
    } else if (bill >= 50 && bill <= 200){
        tip = .15;
    } else
        tip = .1;

    return bill * tip
}

console.log(TipCalculator(100));

let restaurantsBills = [124, 48, 268]
let tips = [TipCalculator(restaurantsBills[0]), TipCalculator(restaurantsBills[1]), TipCalculator(restaurantsBills[2])]
let finallBils = [restaurantsBills[0] + tips[0],restaurantsBills[1] + tips[1], restaurantsBills[2] + tips[2]]

console.log(tips, finallBils) */


/* // Code 4 ****************************************************************
let john = {
    fullName: "John Smith",
    mass: 82,
    height: 1.84,
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height)
    }
}

let mark = {
    fullName: "Mark Worth",
    mass: 85,
    height: 1.98,
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height)
        //return this.bmi
    }
}
john.calcBMI();
mark.calcBMI();
console.log(john, mark);

if (john.bmi > mark.bmi) {
    console.log(john.fullName + " ma większe BMI!  BMI:" + john.bmi)
} else if (john.bmi < mark.bmi) {
    console.log(mark.fullName + " ma większe BMI!  BMI:" + mark.bmi)
} else {
    console.log ("Both BMI are equal")
} */


// Code 5 ***************************************************************
let john = {
    fullName: 'John Smith',
    restaurantsBills: [124, 48, 268, 180, 42],
    tipCalculator: function () {
        this.tips = [];
        this.finallBils = [];

        for (let i = 0; i < this.restaurantsBills.length; i++) {
            let tip;
            const bill = this.restaurantsBills[i];

            if (bill < 50) {
                tip = .2;
            } else if (bill >= 50 && bill <= 200) {
                tip = .15;
            } else
                tip = .1;
            this.tips[i] = bill * tip;
            this.finallBils[i] = bill + this.tips[i];
        }
    }
}
//john average tips calculator
function calcAvg(tips) {
    let sum = 0;
    for (let i = 0; i < tips.length; i++) {
        sum = sum + tips[i];
    }
    return sum / tips.length;
}

john.tipCalculator();
john.average = calcAvg(john.tips)
console.log(john)