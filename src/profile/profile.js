import React, { Component } from 'react';
import axios from 'axios';
import './profile.css';

function TabList(props) {
  if(props.tab === 'overview' || !props.tab){
    const data = props['overview'] || {};
    return(
      <div className="section">
          <img className="avatar" src={data.avatar_url} alt={data.login} height="50" width="50" />
          <h3 className="name" >{data.login}</h3>
          <p>Bio</p><p>{data.bio || '-'}</p>
          <p>Following</p><p>{data.following || '-'}</p>
          <p>Followers</p><p>{data.followers || '-'}</p>
          <p>Repositories</p><p>{data.public_repos || '-'}</p>
          <p>Starred Repositories</p><p>{data.starred || '-'}</p>
          <p>Employable</p><p>{data.hireable ? 'true' : 'false'}</p>
      </div>
    )
  }
  const dataset = props[props.tab] || [];
  var listItems = [];
  console.log(props.tab)
  if (props.tab === 'following' || props.tab === 'followers') {
    listItems = dataset.map((data) =>
      <li key={data.login}>
        <img className="avatar" src={data.avatar_url} alt={data.login} height="50" width="50" />
        <h3 className="name"><a>{data.login}</a></h3>
        
      </li>
    );
  }else if (props.tab === 'repositories' || props.tab === 'starred') {
    console.log(props)
    listItems = dataset.map((data) =>
      <li key={data.id} className="no-avatar">
        <h3 className="name"><a>{data.name}</a></h3>
        <p>{data.description || '-'}</p>
      </li>
    );
  }
  if(listItems.length){
    return (
      <div className={props.tab}>      
        <ul className="list-custom">{listItems}</ul>
      </div>
    );
  }
  return <div></div>
}

class Profile extends Component {
  constructor(props) {
    super(props);

    
    this.githubAxios = axios.create({
      baseURL: 'https://api.github.com',
      // timeout: 1000,
      headers: { Accept: 'application/vnd.github.v3+json' },      
    });
    var query = this.props.location.state.id;
    this.state = {query: query, tab:'overview', followers:[], following:[], overview:{},repositories:[],starred:[], loading: false}
    
  }

  getQueryVariable(query, variable) {
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
  }

  componentDidMount(){
    this.searchQuery(this.state.query)
  }


  openTab(type){
    this.setState({tab : type, loading: false});
    var url = ""
    switch(type){
      case 'followers': url = this.state.overview.followers_url; break;
      case 'following': url = (this.state.overview.following_url || '').replace('{/other_user}', ''); break;
      case 'repositories': url = this.state.overview.repos_url; break;
      case 'starred': url = (this.state.overview.starred_url || '').replace('{/owner}{/repo}', ''); break;
      default: break;
    }
    if(url){
      this.githubAxios.get(url)
        .then(res => {    
          console.log(res)    
          const result = res.data;
          var stateResponse = { loading: false };
          stateResponse[type] = result;
          this.setState(stateResponse);
        })
        .catch(res => {
          console.log(res)
        })
    }
  }

  searchQuery(id, type){

    if(id){      
      this.setState({loading: true});
      this.githubAxios.get(`users/` + id)
      .then(res => {        
        const result = res.data;
        this.setState({ overview: result, loading: false });
        console.log(res.data)
      })
      .catch(res => {
        console.log(res)
      })
    }
  }

  render() {
    return (
      <div className="Profile">
        <ul className="menu unstyled inline">
          <li><button type="button" className={(this.state.tab === 'overview'? 'active' : '' )} onClick={ (e) => this.openTab('overview') }>Overview</button></li>
          <li><button type="button" className={(this.state.tab === 'following'? 'active' : '' )} onClick={ (e) => this.openTab('following') }>Followings</button></li>
          <li><button type="button" className={(this.state.tab === 'followers'? 'active' : '' )} onClick={ (e) => this.openTab('followers') }>Followers</button></li>
          <li><button type="button" className={(this.state.tab === 'repositories'? 'active' : '' )} onClick={ (e) => this.openTab('repositories') }>Repositories</button></li>
          <li><button type="button" className={(this.state.tab === 'starred'? 'active' : '' )} onClick={ (e) => this.openTab('starred') }>Starred</button></li>
        </ul>
        <TabList tab={this.state.tab} overview={this.state.overview} followers={this.state.followers} following={this.state.following} repositories={this.state.repositories} starred={this.state.starred}/>
      </div>
    );
  }
}

export default Profile;
