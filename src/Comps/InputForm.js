import React, { Component } from 'react';
class InputForm extends Component {
    render() {
        return(
            <div className="inputForm">
            <input
              type="text"
              value={this.state.newItem}
              onChange={this.handleEdit}
              onKeyPress={this.handleKey}
              placeholder="やること"
              
                // { this.state.isEditMode && this.state.todoItems[this.state.tempId].name} 
            />
            <button onClick={this.handleAdd} className="button">保存</button>
            </div>
            
        );
    }
}
export default InputForm;