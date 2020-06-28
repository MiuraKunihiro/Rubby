import React, { Component } from 'react';
import './App.css';
import ToDoList from './Comps/ToDoList'
import ToDoCompleteList from './Comps/ToDoCompleteList'
import Congrats from './Comps/Congrats'



  
class App extends Component {
  constructor(props) {
    super(props);
    const todo = JSON.parse(localStorage.getItem('todo')) || [];
    this.state = {
      undisplay: false,
      isEditMode: false,
      tempId: '',
      todoItems: todo,
      newItem: '',
    };
    this.handleEdit   = this.handleEdit.bind(this);
    this.handleKey    = this.handleKey.bind(this);
    this.handleAdd    = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.inputFocus   = this.inputFocus.bind(this);
    this.handleReverse   = this.handleReverse.bind(this);
    this.handleDisplay   = this.handleDisplay.bind(this);
  }
// ーーーーーーーーファンクションーーーーーーーーーーーーーーーーーーーーー
// ーーーーーーーーファンクションーーーーーーーーーーーーーーーーーーーーー
  handleEdit(e) {
    this.setState({newItem: e.target.value});
  }
  handleKey(e) {
    if (e.key === 'Enter') {
      this.handleAdd();
    }
  }
  handleAdd() {
    // ーーーーーーーー非編集時ーーーーーーーーーーーーーーーーーーーーー
    if (!this.state.isEditMode) {
      if (this.state.newItem) {
        const item = {
          name: this.state.newItem,
          uncomplete: true
        }
        if (this.state.todoItems.some(e => {
          return e.name === item.name;
          })) {
          this.setState({newItem: ''});
          alert("同じ項目が含まれています")
        }else{
          const newItems = this.state.todoItems.concat(item);
          this.setState({todoItems: newItems});
          this.setState({newItem: ''});
          this.inputFocus();
          localStorage.setItem('todo', JSON.stringify(newItems));
        }
      }else{
        alert("やることが書かれていません")
      }
    // ーーーーーーーー編集時ーーーーーーーーーーーーーーーーーーーーーー
    }else{
      if (this.state.newItem) {
        const item = {
          name: this.state.newItem,
        }
        if (this.state.todoItems[this.state.tempId].name === item.name) {
          alert("同じ項目が含まれています")
          this.inputFocus();
        }else{
          // 
          const test = this.state.todoItems[this.state.tempId]
          test.name = item.name
          // this.state.todoItems[this.state.tempId].name.replace(this.state.todoItems[this.state.tempId].name, item.name)
          // console.log(this.state.todoItems[this.state.tempId])
          this.setState({newItem: ''});
          this.setState({tempId: ''});
          this.inputFocus();
          this.setState({isEditMode: false})
        }
      }else{
        alert("やることが書かれていません")
        this.inputFocus();
      }

    }
  }
  handleDelete(i) {
    const tempItems = this.state.todoItems;
    tempItems.splice(i, 1);
    this.setState({todoItems: tempItems});
    this.inputFocus();
    localStorage.setItem('todo', JSON.stringify(this.state.todoItems));
  }
  inputFocus() {
    document.querySelector('input[type="text"]').focus();
  }
  handleComplete(i) {
    const tempItems = this.state.todoItems;
    tempItems[i].uncomplete = false
    this.setState({todoItems: tempItems});
    this.inputFocus();
    localStorage.setItem('todo', JSON.stringify(this.state.todoItems));
  }

  handleReverse() {
    const test = this.state.todoItems.filter((e) => !e.uncomplete )
    if (test.length > 0) {
      this.setState({undisplay: !this.state.undisplay});
    }else{
      this.setState({undisplay: true});
    }
  }
  
  handleDisplay() {
    const test = this.state.todoItems.filter((e) => !e.uncomplete )
    if (test.length > 0) {
      if (this.state.undisplay){
        return '表示する'
      }else{
        return '表示しているよ'
      }
    }else{
      return '表示する'

    }
  }
// ーーーーーーーー編集機能ーーーーーーーーーーーーーーーーーーーーー
  handleChange(i) {
      this.setState({tempId: i});
      this.setState({ isEditMode: true });
      this.setState({newItem: this.state.todoItems[i].name});
      this.inputFocus();
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

// ーーーーーーーーレンダーーーーーーーーーーーーーーーーーーーーーー
// ーーーーーーーーレンダーーーーーーーーーーーーーーーーーーーーーー
  }
  render() {


    return (
      <div className="App">
        <header className="App-header">
        　<p>Todo リスト作成</p>
        </header>

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
          <div className="title">
            <p>Todo　リスト</p>
          </div>
          <ToDoList 
            todos={this.state.todoItems}
            change={(i) => this.handleChange(i)}
            complete={(i) => this.handleComplete(i)}
            delete={(i) => this.handleDelete(i)}
           />
        </div>
        <ToDoCompleteList
            todos={this.state.todoItems}
            reverse={() => this.handleReverse()}
            display={() => this.handleDisplay()}
            delete={(i) => this.handleDelete(i)}
        />
        <Congrats
          todos={this.state.todoItems}
        />
        
      </div>
    );
  }
}
  
export default App;