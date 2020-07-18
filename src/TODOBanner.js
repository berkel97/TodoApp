import React from "react";

class TODOBanner extends React.Component {
  render = () => (
    <h4 className="bg-success text-white text-center p-2">
      {this.props.name}'s To Do List (
      {this.props.tasks.filter((t) => !t.done).length} items to do)
    </h4>
  );
}

export default TODOBanner;
