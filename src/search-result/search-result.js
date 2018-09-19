import React, { Component } from 'react';
import axios from 'axios';
import './search-result.css';
import logo from '../logo.svg'

function NumberList(props) {
  const dataset = props.dataset || [];
  const listItems = dataset.map((data) =>
    <li key={data.login} onClick={(e) => props.viewProfile(data.login)}>
      <img className="avatar" src={data.avatar_url} alt={data.login} height="50" width="50" />
      <h3 className="name"><a>{data.login}</a></h3>
      
    </li>
  );
  if (dataset.length) {
    return (
      <div>      
        <p className="small"> search returned {dataset.length}  results </p>
        <ul className="list-custom">{listItems}</ul>
      </div>
    );
  }
  return <div></div>
}

class SearchResult extends Component {
  constructor(props) {
    super(props);

    
    this.githubAxios = axios.create({
      baseURL: 'https://api.github.com',
      // timeout: 1000,
      headers: { Accept: 'application/vnd.github.v3+json' },      
    });
    var query = this.getQueryVariable(this.props.location.search.replace('?', ''),'query');
    this.state = {query: query, queryResult: [], page: 0, page_limit: 20, loading: false}
    
  }

  componentDidMount(){
    console.log(this.state)
    this.searchQuery(this.state.query)
  }

 
  getQueryVariable(query, variable) {
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
  }

  searchQuery(query){

    if(query){      
      this.setState({loading: true});
      
      this.githubAxios.get(`search/users?q=` + query + `&page=` + this.state.page + `&per_page=` + this.state.page_limit)
      .then(res => {
        const result = res.data;
        this.dataset = result.items
        this.setState({ queryResult: result.items, loading: false });
        console.log(result)
      })
      .catch(res => {
        console.log(res)
      })
    }
  }

  submitQuery(event) {
    if(event.key === 'Enter'){      
      var query = event.target.value;
      this.searchQuery(query);
    }
  }

  viewProfile(id) { 
    console.log(this)   
    this.history.push('/profile/' + id, {id: id});
  }



  render() {
    return (
      <div className="SearchResult">
        <input type="text" className="search" placeholder="Enter search term" defaultValue={this.state.query} onKeyUp={(e) => this.submitQuery(e)}/>
        <img src={logo} className={"App-logo loader " + (this.state.loading ? 'loading' : '')} alt="logo" />
        <NumberList dataset={this.state.queryResult} viewProfile={this.viewProfile} history={this.props.history}/>
      </div>
    );
  }
}

export default SearchResult;
