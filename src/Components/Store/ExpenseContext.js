import React, {useState,useContext,useCallback,useEffect} from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

const ExpenseContext = React.createContext({
    listOfItems: [],
    editItem: [],
    addExpenses: (item) => {},
    removeExpenses: (item) => {},
});

export default ExpenseContext;

export const ExpenseContextProvider = (props) => {
    const authCtx = useContext(AuthContext);
    const [expenseItems, setexpenseItems] = useState([]);

    let email;
    if (authCtx.isLoggedIn) {
        email = authCtx.email.replace(/[@.]/g, "");
    }

    const getExpenseItemFromDb = useCallback(async () => {
        if (email) {
            const response = await fetch(
                `https://expense-tracker-premium-default-rtdb.firebaseio.com/expense${email}.json`
            );

            let data = await response.json();

            if (data != null) {
                const expenseItems = [];

                for (const key in data) {
                    let item = JSON.parse(data[key].updatedItem);

                    expenseItems.push({
                        item: item,
                        _id: key,
                    });

                    setexpenseItems(expenseItems);
                }
            } else {
                setexpenseItems([]);
            }
        }
    }, [email]);
    useEffect(() => {
        getExpenseItemFromDb();
    }, [getExpenseItemFromDb]);

    const addItemHandler = useCallback(
        async (item) => {
            let updatedItem = { ...item, email };

            setexpenseItems(updatedItem);

            await axios
                .post(
                    `https://expense-tracker-premium-default-rtdb.firebaseio.com/expense${email}.json`,
                    {
                        updatedItem: JSON.stringify(updatedItem),
                    }
                )
                .then(() => {
                    getExpenseItemFromDb();
                });
        },

        [email, getExpenseItemFromDb]
    );

    const removeItemHandler = async (item) => {
        const itemIdx = expenseItems.findIndex((i) => i.item.id === item.id);
        let existingItem = expenseItems[itemIdx];
        let userId = existingItem._id;

        await axios
            .delete(
                `https://expense-tracker-premium-default-rtdb.firebaseio.com/expense${email}/${userId}.json`,
                {
                    method: "DELETE",
                }
            )
            .then(() => {
                getExpenseItemFromDb();
            });
    };
    const expense_context = {
        listOfItems: expenseItems,
        // itemToEdit: editItem,
        addItems: addItemHandler,
        removeItems: removeItemHandler,
    };
    return (
        <div>
            <ExpenseContext.Provider value={expense_context}>
                {props.children}
            </ExpenseContext.Provider>
        </div>
    );
};