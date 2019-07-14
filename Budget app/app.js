
///////////////// BUDGET CONTROLLER
const budgetController = (function(){

    //some code

})();




///////////////// UI CONTROLLER
const UIController = (function(){

    

})();





//////////////// GLOBAL APP CONTROLLER
const controller = (function(budgetCtrl, UICtrl){

    document.querySelector('.add__btn').addEventListener('click', function(){
        console.log('test click');

        // 1. Get the field input data

        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate budget

        // 5. Display the buget on the UI
    });
    
})(budgetController, UIController);

