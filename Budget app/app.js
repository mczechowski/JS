
///////////////// BUDGET CONTROLLER ////////////////////////////////////////////////////////
const budgetController = (function () {

    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentages = function (totalIncome) {
        if (totalIncome > 0)
            this.percentage = Math.round((this.value / totalIncome) * 100)
    };

    Expense.prototype.getPercentages = function () {
        return this.percentage;
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

        deleteItem: function (type, id) {
            // id = 3
            let ids = data.allItems[type].map(function (currnet) {   //the same like forEach, but return new copy of array
                return currnet.id;
            });

            let index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
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

        calculatePercentages: function () {
            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentages(data.totals.inc);
            });
        },

        getPercentages: function () {
            let allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentages();
            });
            return allPerc;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage'
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
                html = '<div class="item" id="inc-%id%"><div class="item__description">%description%</div><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item" id="exp-%id%"><div class="item__description">%description%</div><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>';
            }

            //Replace the placeholder txt with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function (selectorID) {

            let el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            let fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            fields.forEach(function (current) {
                current.value = "";
            });

            fields[0].focus();
        },

        displayBudget: function (obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
            if (obj.percentage === -1) {
                document.querySelector(DOMstrings.percentageLabel).textContent = "---";
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }
        },

        displayPercentages: function (percenrages) {
            let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
        
            for (let i = 0; i < fields.length; i++)
            if (percenrages[i] === -1) {
                fields[i].textContent = '---';
            } else {
                fields[i].textContent = percenrages[i] + '%';
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
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };


    let updateBudget = function () {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        let budget = budgetCtrl.getBudget();

        // 3. Dispaly the budget on the UI
        UICtrl.displayBudget(budget);
    };

    let updatePercentages = function () {
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        // 2. Read percentages from buget controller
        let percenrages = budgetCtrl.getPercentages();
        // 3. Update the UI with the new percenrages
        UICtrl.displayPercentages(percenrages);
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

            // 5. Calculate and update percentages
            updatePercentages();
        }
    };

    let ctrlDeleteItem = function (event) {
        let itemID = event.target.parentNode.parentNode.parentNode.id;
        if (itemID) {
            let splitID = itemID.split('-')  //inc-1 -> ['inc', '1']
            let type = splitID[0];           // ['inc']
            let ID = parseInt(splitID[1]);   // ['1']

            // 1.delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. delete the item from the UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();

            // 4. Calculate and update percentages
            updatePercentages();
        }

    }

    return {
        init: function () {
            console.log('App has started');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setupEventListeners();

        }
    }
})(budgetController, UIController);

controller.init();
