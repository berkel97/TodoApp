import React from "react";
import "./App.css";
import TodoRow from "./TodoRow";
import TodoCreator from "./TodoCreator";
import TODOBanner from "./TODOBanner";
import VisibilityControl from "./VisibilityControl";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Berkel",
      todoItems: [
        { action: "Pray", done: true },
        { action: "Workout", done: false },
        { action: "See a friend", done: false },
        { action: "Study JavaScript", done: true },
      ],
      showCompleted: true,
    };
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  createNewTodo = (task) => {
    if (!this.state.todoItems.find((item) => item.action === task)) {
      this.setState(
        {
          todoItems: [...this.state.todoItems, { action: task, done: false }],
        },
        () => localStorage.setItem("todos", JSON.stringify(this.state))
      );
    }
  };

  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Berkel" ? "Ibk" : "Berkel",
    });
  };

  toggleTodo = (todo) =>
    this.setState({
      todoItems: this.state.todoItems.map((item) =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      ),
    });

  todoTableRows = (doneValue) =>
    this.state.todoItems
      .filter((item) => item.done === doneValue)
      .map((item) => (
        <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
      ));

  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(
      data != null
        ? JSON.parse(data)
        : {
            userName: "Berkel",
            todoItems: [
              { action: "Pray", done: true },
              { action: "Workout", done: false },
              { action: "See a friend", done: false },
              { action: "Study JavaScript", done: true },
            ],
            showCompleted: true,
          }
    );
  };

  render = () => (
    <div>
      <TODOBanner name={this.state.userName} tasks={this.state.todoItems} />
      <div className="container-fluid">
        <TodoCreator callback={this.createNewTodo} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.todoTableRows(false)}</tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Completed Tasks"
            isChecked={this.state.showCompleted}
            callback={(checked) => this.setState({ showCompleted: checked })}
          />
        </div>
        {this.state.showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{this.todoTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
