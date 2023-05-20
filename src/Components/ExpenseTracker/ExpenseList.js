import classes from "./ExpenseList.module.css";
import React,{useContext} from "react"
import { Table } from "react-bootstrap";
import {BsFillTrashFill} from "react-icons/bs"
import { BsFillPencilFill } from "react-icons/bs";
import ExpenseContext from "../Store/ExpenseContext";


const ExpenseList = (props) => {
    const expenseCtx = useContext(ExpenseContext);
    const removeItem = () => {
        expenseCtx.removeItems(props);
    };
    return (
        <Table>
            <tbody>
                <tr>
                    <th width="170">{props.category}</th>
                    <th width="300">{props.title}</th>
                    <th
                        width="200"
                        className={classes["expense-item__price"]}
                    >{`Rs ${props.amount}`}</th>
                    <th width="50">
                        <BsFillPencilFill
                            className={classes.action}
                            onClick={props.onEdit}
                        />
                    </th>
                    <th>
                        <BsFillTrashFill
                            className={classes.action}
                            onClick={removeItem}
                        />
                    </th>
                </tr>
            </tbody>
        </Table>
    );
};

export default ExpenseList;