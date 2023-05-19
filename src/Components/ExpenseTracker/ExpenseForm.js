import React,{useRef,useContext} from "react";
import ExpenseContext from "../Store/ExpenseContext";
import ExpenseList from "./ExpenseList";
import classes from "./ExpenseForm.module.css";
import { useNavigate } from "react-router-dom";

const ExpenseForm = (props) => {
    const expCntxt = useContext(ExpenseContext);
    const amountInputRef = useRef();
    const titleInputRef = useRef();
    const categoryInputRef = useRef();
    const navigate = useNavigate();

    let content;
    const submitHandler = (event) => {
        event.preventDefault();
        const amount = amountInputRef.current.value;
        const title = titleInputRef.current.value;
        const category = categoryInputRef.current.value;
        const expense = {
            amount: amount,
            title: title,
            category: category,
        };
        expCntxt.addExpense(expense);
    };
    const expense = expCntxt.expenses.map((item) => (
        <ExpenseList
            amount={item.amount}
            title={item.title}
            category={item.category}
        />
    ));
    if (expCntxt.expenses.length === 0) {
        content = (
            <div
                className={classes.start}
                style={{ display: "block", textAlign: "center" }}
            >
                <h3>No expense is found</h3>
            </div>
        );
    }
    if (expCntxt.expenses.length > 0) {
        content = (
            <div className={classes.start} style={{ display: "block" }}>
                <ul className={classes.ul}>{expense}</ul>
            </div>
        );
    }

    const goBack=()=>{
        navigate("/profile");
    }

    return (
        <React.Fragment>
            <button onClick={goBack} className={classes["new-expense__actions"]}
                            type="submit">Back</button>
            <form onSubmit={submitHandler} className={classes.start}>
                <div className={classes["new-expense__controls"]}>
                    <div className={classes["new-expense__control"]}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            ref={titleInputRef}
                            required
                        />
                    </div>
                    <div className={classes["new-expense__control"]}>
                        <label htmlFor="Amount">Amount</label>
                        <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            ref={amountInputRef}
                            required
                        />
                    </div>

                    <div className={classes["new-expense__control"]}>
                        <label htmlFor="category">Category</label>
                        <select id="category" ref={categoryInputRef} required>
                            <option>Select One</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Education">Education</option>
                            <option value="Food">Movies</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div className={classes["new-expense__control"]}>
                        <button
                            className={classes["new-expense__actions"]}
                            type="submit"
                        >
                            Add Expense
                        </button>
                    </div>
                </div>
            </form>
            {content}
        </React.Fragment>
    );
};
export default ExpenseForm;