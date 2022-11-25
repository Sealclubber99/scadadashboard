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
            <td><button className='button_close' onClick={() => this.deleteItem(item.key)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button></td>
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
                    <tbody className="body_style">
                        {listItems}
                    </tbody>

                </table>
            </div>

        );
    }
};

export default AlertItems;