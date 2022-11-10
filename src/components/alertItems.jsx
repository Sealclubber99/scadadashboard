import React, { Component } from "react";

class AlertItems extends Component {
    constructor(props) {
        super(props);
        this.createTasks = this.createTasks.bind(this);
    }
    deleteItem(key){
        this.props.delete(key);
        // console.log(key)
    }
    createTasks(item) {
        // return <li key={item.key}>{item.asset}</li>
        return <tr key={item.key} className="">
            <td>{item.asset}</td>
            <td>{item.column}</td>
            <td>{item.operator}</td>
            <td>{item.value}</td>
            <td><button onClick={() => this.deleteItem(item.key)}>X</button></td>
        </tr>
    }


    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);

        return (
            // <ul className="theList">
            //     {listItems}
            // </ul>
            <div className="table_parent d-flex justify-content-center ">
                <table className="table_style">
                    <tr className="">
                        <th>Asset</th>
                        <th>Column</th>
                        <th>Operator</th>
                        <th>Value</th>
                        <th>Remove</th>
                    </tr>
                    {listItems}
                </table>
            </div>

        );
    }
};

export default AlertItems;