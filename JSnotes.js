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
{
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
        calculateAge: function () {
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

    function arrayCalc(arr, fn) {
        let arrRes = [];
        for (let i = 0; i < arr.length; i++) {
            arrRes.push(fn(arr[i]));  // passing function calculateAge or isFullAge with arguments years or ages
        }
        return arrRes;
    };

    function calculateAge(el) {
        return 2019 - el;
    };

    function isFullAge(el) {
        return el >= 18;
    };

    let ages = arrayCalc(years, calculateAge);
    let fullAges = arrayCalc(ages, isFullAge);

    //function returning
    function interviewQuestion(job) {
        if (job === 'designer') {
            return function (name) {
                console.log(name + ', can you please explain what UX design is?');
            }
        } else {
            return function (name) {
                console.log('hello ' + name + ', what you do?');
            }
        }
    }
    //job    //name                         //'Mark'
    interviewQuestion('designer')('Mark');  //designer -> function(name)

    //IIFE - immediately invoked function expression - for data privacy
    function game() {
        const score = Math.random() * 10;
        console.log(score >= 5);
    }

    game();

    //    OR 
    (function () {
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
        return function (name) {
            if (job === 'designer') {
                console.log(name + ', can you please explain what UX design is?');
            } else {
                console.log('hello ' + name + ', what you do?');
            }
        }
    }
    //job    //name                        //'Mark'
    interviewQuestion('designer')('Mark'); //designer -> function(name)

}
//================================== 4. ES6 features ==========================================
{
    //IIFEs in ES6
    {
        let a;
        const b;
    }

    //string - backticks - template literal
    console.log(`This is ${firstName}. He was born in ${yearOfBirth}.`)

    //arrow functions =>
    const years = [1992, 2000, 1974, 1956];
    ////ES5
    var ages5 = years.map(function (el) {
        return 2016 - el;
    });
    console.log(ages5);
    ////ES6
    let ages6 = years.map(el => 2016 - el);
    console.log(ages6);

    ages6 = years.map((el, index) => `Age elemet ${index + 1}: ${2016 - el}.`);
    console.log(ages6);

    ages6 = years.map((el, index) => {
        const now = new Date().getFullYear();
        const age = now - el;
        return `Age elemet ${index + 1}: ${age}.`;
    })
    console.log(ages6);


    Person.prototype.myFriends6 = function (friends) {
        let arr = friends.map(el => `${this.name} is friends with ${el}`);
        console.log(arr);
    }

    new Person('Mike').myFriends6(friends);
    const friends = ['Bob', 'John', 'Jane'];

    //destructuring
    ////ES5
    var john = ['John', 25];
    var name = john[0];
    var age = john[1];

    ////ES6
    const [name, age] = ['John', 26];

    const obj = {
        firstName: 'john',
        lastName: 'Smith'
    };
    const { firstName, lastName } = obj
    const { firstName: a, lastName: b } = obj  // variablle firstName is called a

    //spread operator
    function addFourAges(a, b, c, d) {
        return a + b + c + d;
    }
    const ages = [18, 43, 21, 26];
    const sum = addFourAges(...ages);
    console.log(sum);

    const h = document.querySelector('h1');
    const boxes = document.querySelectorAll('.box');
    const all = [h, ...boxes];
    //Array.from(all); 
    all.forEach(cur => cur.style.color = 'purple');

    //rest parameters
    function isFullAge(limit, ...years) {
        //console.log(years);
        years.forEach(cur => console.log((2016 - cur) >= limit));
    }
    isFullAge(18, 1990, 1999, 2015);

    //default parameters
    function SmithPerson(firstName, year, lastName = 'Smith', nationality = 'american') {
        this.firstName = firstName;
        this.year = year;
        this.lastName = lastName;
        this.nationality = nationality;
    }
    let john = new SmithPerson('John', 1990);

    //maps
    const question = new Map();
    question.set('question', 'What is the official name of the lastest major JS version?')
    question.set(1, 'ES5');
    question.set(2, 'ES6');
    question.set(3, 'ES2015');
    question.set(4, 'ES7');
    question.set('correct', 3);
    question.set(true, 'Correct answer');
    question.set(false, 'Wrong answer, try again!');

    console.log(question.get('question'));
    console.log(question.size);

    question.delete(4);

    if (question.has(4)) {
        //do something
    }
    question.clear();

    question.forEach((value, key) => console.log(`This is ${key} set to ${value}`));

    question.forEach((value, key) => {
        if (typeof (key) === 'number') {
            console.log(`Answer ${key}: ${value}`);
        };
    });

    const ans = parseInt(prompt('Write the correc answer'));
    console.log(question.get(ans === question.get('correct')));


    //classes
    class Person6 {
        constructor(name, year, job) {
            this.fullName = name;
            this.yearOfBirth = year;
            this.job = job;
        }

        calculateAge() {
            let age = new Date().getFullYear() - this.yearOfBirth;
            console.log(age);
        }

        static greeting() {
            console.log('Hi there!');
        }
    }
    const john6 = new Person6('John', 1998, 'teacher');
    john6.calculateAge();
    Person6.greeting();

    //classes with subclasses
    ////ES5
    var Person5 = function (name, year, job) {
        this.fullName = name;
        this.yearOfBirth = year;
        this.job = job;
    };

    Person5.prototype.calculateAge = function () {
        let age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    };

    var Athlete5 = function (name, year, job, olympicGames, medals) {
        Person5.call(this, name, year, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    Athlete5.prototype = Object.create(Person5.prototype);

    var johnAlglere5 = new Athlete5('John', 1990, 'swimmer', 3, 10);
    johnAlglere5.calculateAge();

    ////ES6
    class Person6 {
        constructor(name, year, job) {
            this.fullName = name;
            this.yearOfBirth = year;
            this.job = job;
        }

        calculateAge() {
            let age = new Date().getFullYear() - this.yearOfBirth;
            console.log(age);
        }

        static greeting() {
            console.log('Hi there!');
        }
    }

    class Athlete6 extends Person6 {
        constructor(name, yearOfBirth, job, olympicGames, medals) {
            super(name, yearOfBirth, job);

            this.olympicGames = olympicGames;
            this.medals = medals;
        }
        wonMedal() {
            this.medals++;
            console.log(this.medals);
        }
    }

    const johnAthlere6 = new Athlete5('John', 1990, 'swimmer', 3, 10);
    johnAlglere5.calculateAge();
    johnAlglere5.wonMedal();
}
//================================== 5. Asynchronous JS =======================================
{
    // setTimeout
    const second = () => {
        setTimeout(() => {
            console.log('Async hey there!')
        }, 2000)
    };
    const first = () => {
        console.log('Hey there');
        second();
        console.log('The end');
    };


    //async with callbacks - callback hell
    function getRecipe() {
        setTimeout(() => {
            const recipeID = [523, 634, 745, 834];
            console.log(recipeID);

            setTimeout((id) => {
                const recipe = { title: 'Fresh tomat pasta', publisher: 'Jonas' };
                console.log(`${id}: ${recipe.title}`);

                setTimeout(publisher => {
                    const recipe = { title: 'Pizza', publisher: 'Jonas' };
                    console.log(recipe);
                }, 1500, recipe.publisher)

            }, 1000, recipeID[2]);

        }, 1500);
    };
    getRecipe();


    //promises
    const getIDs = new Promise((resolve, reject) => {
        setTimeout(() => {   //simulate api call
            resolve([523, 634, 745, 834]);
        }, 1500);
    });

    const getRecipe = recID => {
        return new Promise((resolve, reject) => {
            setTimeout(ID => {
                const recipe = { title: 'Fresh tomat pasta', publisher: 'Jonas' };
                resolve(`${id}: ${recipe.title}`);
            }, 1500, recID);
        });
    };

    const getRelated = publisher => {
        return new Promise((resolve, reject) => {
            setTimeout(pub => {
                const recipe = { title: 'Pizza', publisher: 'Jonas' };
                resolve(`${pub}: ${recipe.title}`);
            }, 1500, publisher);
        });
    };

    getIDs
        .then(IDs => {
            console.log(IDs);
            return getRecipe(IDs[2]);
        })
        .then(recipe => {
            console.log(recipe);
            return getRelated('Jonas');
        })
        .then(recipe => {
            console.log(recipe);
        })
        .catch(error => {
            console.log('Error!!')
        });


    //async-await
    async function getRecipesAW() {
        const IDs = await getIDs;
        console.log(IDs);

        const recipe = await getRecipe(IDs[2]);
        console.log(recipe);

        const relared = await getRelated('Jonas');
        console.log(relared);
    }
    getRecipesAW();


    //AJAX calls, fetch with promises
    function getWeather(weatherID) {
        fetch(`https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/${weatherID}/`)
            .then(result => {
                console.log(result);
                return result.json();
            })
            .then(jsondata => {
                console.log(jsondata);
                const today = jsondata.consolidated_weather[0];
                console.log(`Temperature in ${jsondata.title} is: ${today.the_temp} *C`);
            })
            .catch(error => {
                console.log(`We have a problem: ${error}`);
            });
    }

    getWeather(2487956);
    getWeather(523920);


    //AJAX with async/await
    async function getWeatherAW(weatherID) {
        const result = await fetch(`https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/${weatherID}/`)
        const jsondata = await result.json();
        // console.log(jsondata);
        const tomorrow = jsondata.consolidated_weather[1];
        console.log(`Tomorrow temperature in ${jsondata.title} is: ${tomorrow.the_temp} *C`);
        return jsondata;
    }
    getWeatherAW(2487956);
    getWeatherAW(523920);


    let warsaw;
    getWeatherAW(523920).then(jsondata => {
        warsaw = jsondata
        console.log(warsaw);
    });


    //try - catch -error catch
    async function getWeatherAW(weatherID) {
        try {
            const result = await fetch(`https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/${weatherID}/`)
            const jsondata = await result.json();
            // console.log(jsondata);
            const tomorrow = jsondata.consolidated_weather[1];
            console.log(`Tomorrow temperature in ${jsondata.title} is: ${tomorrow.the_temp} *C`);

        } catch (error) {
            console.log(`We have a error: ${error}`);
        }
    }


    //import export
    ///file ./views/searchView.js
    export const add = (a, b) => a + b;
    export const multiply = (a, b) => a * b;
    export const ID = 23;

    
    import { add, multiply, ID } from './views/searchView';
    ///or
    import * as searchView from './views/searchView';

    console.log(`Using impored finctions! ${add(ID, 2)} and ${multiply(3, 5)}. ${str}`);
    ///or
    console.log(`Using impored finctions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${str}`);
}

//================================== 6. Node.js ===============================================
{
    /*
        node -v
        npm -v      //check version
    
        npm init    //create new project
        npm install webpack --save-dev  //local install in specific project
        npm install webpack --save      //local install in specific project
    
        npm install live-server --global (or -g)  //global install in entire system (run command everywhere in cmd)
        //in cmd: live-server
    
        npm run dev  //run webpack script
        npm run bulid 
        
    */
}