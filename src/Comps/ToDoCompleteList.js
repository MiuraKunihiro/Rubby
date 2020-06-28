import React, { Component } from 'react';

class ToDoCompleteList extends Component {
    render() {
        const completeItems = this.props.todos.map((item, i) =>
        <div key={i}>
          
            {!item.uncomplete && <li>
                {item.name}
                <button onClick={() => this.props.delete(i)} className="button">削除</button>
              </li>
            }
        </div>
         );
        return(
            <div className="ToDoCompleteList">
                <button 
                  onClick={() => this.props.reverse()}
                >
                  {this.props.display()}
                </button>
                <div>
                  {!this.props.undisplay && <ul>
                     {completeItems}
                    </ul>
                  }
                </div>
        </div>
        );
    }
}
export default ToDoCompleteList;