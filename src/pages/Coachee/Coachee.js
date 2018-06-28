import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Imc from '../../components/imc/ImcComponent';
import Chat from '../../components/chat/Chat';
import Metas from '../../components/meta/Metas';
import '../Home/Home.css';
import { Button } from 'semantic-ui-react'

export default class Coachee extends Component {

  constructor(props){
    super(props);
    this.state = {
      userId: this.props.props.userId,
      userName: this.props.props.userName,
      idCoach: this.props.props.idCoach,
      isCoach: this.props.props.coach,
      loading: true,
    }
  }

  componentDidMount(){
    setTimeout(() => this.setState({loading: false}), 1000)
  }

  render() {
    if(this.state.loading){
      return(
        <div>
          Carregando.....
        </div>
      )
    } else {
      return (
        <div>
          <h1>Coachee</h1>
          <Link to="/">
            <Button primary>Home</Button>
          </Link>
          <Imc props={this.state}/>
          <Metas props={this.state}/>
          <Chat props={this.state}/>
        </div>
      );
    }
  }
}


