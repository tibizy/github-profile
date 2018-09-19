import React, { Component } from 'react';

class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {loading: false}
    
  }

  componentDidMount(){
    console.log(this.state)
    this.searchQuery(this.state.query)
  }

  render() {
    return (
      <div className="Overview">
        <div>
          <img className="avatar" src={this.state.data.avatar_url} alt={this.state.data.login} height="50" width="50" />
          <h3 className="name" >{this.state.data.login}</h3>          
        </div>
      </div>
    );
  }
}

export default Overview;
