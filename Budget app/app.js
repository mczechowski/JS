
///////////////// BUDGET CONTROLLER ////////////////////////////////////////////////////////
const budgetController = (function () {

    let Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    let Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    let data = {
        allItemsL: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }


})();




///////////////// UI CONTROLLER ///////////////////////////////////////////////////////////
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



//////////////// GLOBAL APP CONTROLLER //////////////////////////////////////////////////////
const controller = (function (budgetCtrl, UICtrl) {

    let setupEventListeners = function () {
        const DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                //event.preventDefault(); //prevents the enter key form also triggering a click event
                ctrlAddItem();
            }
        });
    };

    let ctrlAddItem = function () {
        // 1. Get the field input data
        const input = UICtrl.getInput();
        console.log(input);
        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate budget

        // 5. Display the buget on the UI
        console.log('It works!')
    };

    return {
        init: function () {
            console.log('App has started');
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();
