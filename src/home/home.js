import React, { Component } from 'react';
import './home.css';

class Home extends Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.submitQuery = this.submitQuery.bind(this);
  }

  submitQuery(event) {
    if(event.key === 'Enter'){      
      var query = event.target.value;
      this.props.history.push('/search?query=' + query, {query: query});
      return;
    }
  }

  render() {
    return (
      <div className="Home">    
      
        <p className="App-intro">
          Enter github profile name to search profile information.
        </p>
        <input type="text" className="intro-search" placeholder="@" autoFocus onKeyUp={this.submitQuery}/>
        <p className="small">Press enter to search</p>
      </div>
    );
  }
}

export default Home;
