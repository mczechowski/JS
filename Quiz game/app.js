// 5. Object and functions - coding challenge part 1.
/*
(function game2() {

    let Question = function (quest, answer, correct) {
        this.quest = quest;
        this.answer = answer;
        this.correct = correct;
    };
    
   //let question1 = new Question('What is the color of JavsScript logo?', ['red', 'yellow', 'blue'], 1);
   // let question2 = new Question('What is correct name one of JS framework?', ['python', 'spring', 'React'], 2);
   // let question3 = new Question('What is the best coding editor?', ['VS Code', 'Atom', 'Notepad++'], 0); 
    
    
    let questions = [
        new Question('What is the color of JavsScript logo?', ['red', 'yellow', 'blue'], 1),
        new Question('What is correct name one of JS framework?', ['python', 'spring', 'React'], 2),
        new Question('What is the best coding editor?', ['VS Code', 'Atom', 'Notepad++', 'SublimeText'], 0)
    ]
    
    console.log(questions);
    
    const rand = Math.floor(Math.random() * questions.length);
    
    Question.prototype.displayQuestion = function () {
        console.log((rand + 1) + '. ' + this.quest);
    
        for (let i = 0; i < this.answer.length; i++) {
            console.log(i + '. ' + this.answer[i]);
        }
    
        let input = prompt('Please select the correct answer (just type the number)');
        if (input === this.correct){
            console.log('Answer is correct');
        } else{
            console.log('Wrong answer');
          
        };
    };
    

    
    questions[rand].displayQuestion();

})(); 
*/

// 5. Object and functions - coding challenge part 2.

(function game() {
    let Question = function (quest, answer, correct) {
        this.quest = quest;
        this.answer = answer;
        this.correct = correct;
    };

    //  let question1 = new Question('What is the color of JavsScript logo?', ['red', 'yellow', 'blue'], 1);
    //  let question2 = new Question('What is correct name one of JS framework?', ['python', 'spring', 'React'], 2);
    //  let question3 = new Question('What is the best coding editor?', ['VS Code', 'Atom', 'Notepad++'], 0); 
    let questions = [
        new Question('What is the color of JavsScript logo?', ['red', 'yellow', 'blue'], 1),
        new Question('What is correct name one of JS framework?', ['python', 'spring', 'React'], 2),
        new Question('What is the best coding editor?', ['VS Code', 'Atom', 'Notepad++', 'SublimeText'], 0)
    ]

    Question.prototype.displayQuestion = function (rand) {
        console.log('--------------------------------------------')
        console.log((rand + 1) + '. ' + this.quest);

        for (let i = 0; i < this.answer.length; i++) {
            console.log(i + '. ' + this.answer[i]);
        }
    }
    let score = 0;
    Question.prototype.checkAnswers = function (answ) {

        if (answ == this.correct) {
            score ++;
            console.log('Answer is correct. You score: ' + score);

        } else {
            console.log('Wrong answer. You score: ' + score);
        };
    }

    function nextQuestion() {
        const rand = Math.floor(Math.random() * questions.length);

        questions[rand].displayQuestion(rand);

        let inputAnswer = prompt('Please select the correct answer (just type the number)');

        questions[rand].checkAnswers(inputAnswer);

        if (inputAnswer !== 'exit') {
            nextQuestion();
        }
    };

    nextQuestion();


})();
