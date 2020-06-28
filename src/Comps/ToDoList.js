import React, { Component } from 'react';
class ToDoList extends Component {
    render() {
        const currentItems = this.props.todos.map((item, i) =>
            <div key={i}>
            
                {item.uncomplete && <ul>
                    <li className="CurrentItem" onClick={() => this.props.change(i)}>{item.name}</li>
                    <button onClick={() => this.props.delete(i)} className="button">削除</button>
                    <button onClick={() => this.props.complete(i)} className="button">完了</button>
                  </ul>
                }
            </div>
        );
        return(
          <ul className="CurrentItems">
            {currentItems}
          </ul>
            
            
        );
    }
}
export default ToDoList;