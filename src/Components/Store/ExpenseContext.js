import React, {useState} from "react";

const ExpenseContext = React.createContext({
    expenses: [],
    addExpense: (item) => {},
    removeExpense: (id) => {},
});

export default ExpenseContext;

export const ExpenseContextProvider = (props) => {
    const [expenses, updateExpenses] = useState([]);

    const addExpenseHandler = (expense) => {
        const existingExpenses = [...expenses];
        updateExpenses([...existingExpenses, expense]);
        console.log(expenses);
    };
    const removeExpenseHandler = () => {};
    const contextValue = {
        expenses: expenses,
        addExpense: addExpenseHandler,
        removeExpense: removeExpenseHandler,
    };
    return (
        <ExpenseContext.Provider value={contextValue}>
            {props.children}
        </ExpenseContext.Provider>
    );
};