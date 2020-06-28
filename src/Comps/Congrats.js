import React, { Component } from 'react';

class Congrats extends Component {
    render() {
        return(
            <div>
            {this.props.todos.filter((e) => !e.uncomplete ).length > 4 && <div className="Congrats">
                BootCamp突破おめでとう！!
            </div>
             }
             </div>
        );
    }
}
export default Congrats;