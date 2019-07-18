
///////////////// BUDGET CONTROLLER ////////////////////////////////////////////////////////
const budgetController = (function () {

    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let calculateTotal = function (type) {
        let sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value
        });
        data.totals[type] = sum;
    };


    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1  //minus one - means something doesn't exist
    };

    return {
        addItem: function (type, des, val) {
            let newItem, ID;

            //Create new ID
            if (data.allItems[type].length > 0) {
                //                  exp  [2 -1].id+1
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            //Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //push it into our data structure
            data.allItems[type].push(newItem);

            //return the new element
            return newItem;
        },

        calculateBudget: function () {
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //calculate the percentage of income that we spent
            if (data.totals.inc > 0)
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                tatalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function () {
            console.log(data);
        }
    };


})();


///////////////// UI CONTROLLER ///////////////////////////////////////////////////////////
const UIController = (function () {

    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,  //dokonczyc inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {
            let html, newHtml, element;
            //Create HTML string with placeholder txt
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item" id="income-%id%"><div class="item__description">%description%</div><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item" id="expense-%id%"><div class="item__description">%description%</div><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>';
            }

            //Replace the placeholder txt with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            let fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            fields.forEach(function (current) {
                current.value = "";
            });

            fields[0].focus();
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

    let updateBudget = function () {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        let budget = budgetCtrl.getBudget();

        // 3. Dispaly the budget on the UI
        console.log(budget);
    }

    let ctrlAddItem = function () {
        // 1. Get the field input data
        const input = UICtrl.getInput();

        if (input.description !== "" && input.value !== NaN && input.value > 0) {
            // 2. Add the item to the budget controller
            //getInput.type, getInput.description ... from UI conroller
            let newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI and clear fields
            UICtrl.addListItem(newItem, input.type)
            UICtrl.clearFields();

            // 4. Calculate and update budget
            updateBudget();
        }
    };

    return {
        init: function () {
            console.log('App has started');
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();
