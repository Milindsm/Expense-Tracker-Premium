import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
    return (
        <div className={classes["expense-item"]}>
            <div className={classes["expense-item__title "]}>
                {props.category}
            </div>
            <div className={classes["expense-item__category"]}>
                {props.title}
            </div>
            <div
                className={classes["expense-item__price"]}
            >{`$${props.amount}`}</div>
        </div>
    );
};

export default ExpenseList;