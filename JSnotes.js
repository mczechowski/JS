//////////////////////////////////////// JavaScript notes from JS Course on UDEMY //////////////////////////////////////

//================================== 1. Basic JS ==============================================
{
//if - else, 
    if (lastDice === 6 && dice === 6 || lastDice2 === 6 && dice2 === 6) {
        // do something
    } else if (dice !== 1 || dice2 !== 1) {
        // do something
    } else {
        // do something
    };
    
//tennary operation
    //      if               then                else
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

//loops

//functions

//arrays

}
//================================== 2. DOM and Events ========================================
{
//query selection 
    document.getElementById('score-0').textContent = '0';

    document.querySelector('.dice').style.display = 'none'
    document.querySelector('.player-panel').classList.add('winner');
    document.querySelector('.player-panel').classList.remove('active');

// assign query selector into variable
    let diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';

//event Listener
    document.querySelector('.btn-hold').addEventListener('click', function () {   //anonimous function
        //some stuff, do something 
    });

    document.querySelector('.btn-new').addEventListener('click', init);  //callback function init() without brakets in eventListener !

}
//================================== 3. Object and Functions ==================================

//fuction constuction (object constuction) - most common
    let Person = function (name, year, job) {       // name of functuion - always starts on Capital letter
        this.fullName = name;
        this.yearOfBirth = year;
        this.job = job;
    };

    let john = new Person('John Smith', 1992, 'teacher');
    let mark = new Person('Mark Gross', 1986, 'designer');

//fucntion prototype - more efficienty, not add calculateAge function to all objects (john, mark etc)
    Person.prototype.calculateAge = function () {
        console.log(2019 - this.yearOfBirth);
    };

    john.calculateAge();

//object create
    let personProto = {
        calculateAge: function(){
            console.log(2019 - this.yearOfBirth);
        }
    };

    let john = Object.create(personProto);
    john.fullName = 'John';
    john.yearOfBirth = 1990;
    // OR
    let beth = Object.create(personProto, {
        name: { value: 'Beth' },
        yearOfBirth: { value: 1985 }
    });

//function as arguments(variables) - callback function 
    const years = [1992, 1975, 1937, 2009, 1997];

    function arrayCalc(arr, fn){
        let arrRes = [];
        for (let i = 0; i < arr.length; i++) {
            arrRes.push(fn(arr[i]));  // passing function calculateAge or isFullAge with arguments years or ages
            }
        return arrRes;
    };

    function calculateAge(el){
        return 2019 - el;
    };

    function isFullAge(el){
        return el >= 18;
    };

    let ages = arrayCalc(years, calculateAge);
    let fullAges =  arrayCalc(ages, isFullAge);

//function returning
    function interviewQuestion(job){
        if (job === 'designer') {
            return function(name){
                console.log(name + ', can you please explain what UX design is?');
            }
        }else {
            return function(name){
                console.log('hello ' + name + ', what you do?');
            }
        }
    }
                        //job    //name                         //'Mark'
    interviewQuestion('designer')('Mark');  //designer -> function(name)

//IIFE - immediately invoked function expression - for data privacy
    function game(){
        const score = Math.random() * 10;
        console.log(score >= 5);
    }

    game();

        //    OR 
    (function() {
        const score = Math.random() * 10;
        console.log(score >= 5);
    })();

//closures
    /* Closure means that an inner function always has access to the variables and parameters
     of its parent (outer) function, even if this parent function has already returned, for example */
    function outer() {
        var a = 'Hello';
        return function inner() {
            var b = 'Hi';
            console.log(a, b);
        }
    }
    
    outer()();
    

    function interviewQuestion(job) {
        return function(name) {
            if (job === 'designer') {
                console.log(name + ', can you please explain what UX design is?');
            } else {
                console.log('hello ' + name + ', what you do?');
            }
        }
    }
                        //job    //name                        //'Mark'
    interviewQuestion('designer')('Mark'); //designer -> function(name)











