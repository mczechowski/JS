
///////////////// BUDGET CONTROLLER
const budgetController = (function () {

    //some code

})();




///////////////// UI CONTROLLER
const UIController = (function () {

    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,  //dokonczyc inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    }

})();



//////////////// GLOBAL APP CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {

    const DOM = UICtrl.getDOMstrings();

    let ctrlAddItem = function () {
        // 1. Get the field input data
        const input = UICtrl.getInput();
        console.log(input);
        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate budget

        // 5. Display the buget on the UI
        console.log('It works!')
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            //event.preventDefault(); //prevents the enter key form also triggering a click event
            ctrlAddItem();
        }
    });

})(budgetController, UIController);

