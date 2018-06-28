import React, { Component } from 'react';
import Coachee from '../Coachee/Coachee';
import Coach from '../Coach/Coach';
import HomeService from './HomeService'
import './Home.css';
import { Button, Container, Form, Header, Icon } from 'semantic-ui-react'

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      userId: undefined,
      userName: undefined,
      idCoach: undefined,
      isCoach: false,
      loading: true,
      loggedIn:	false,
    }
  }

  componentDidMount(){
    setTimeout(() => this.setState({loading: false}), 1000)
  }

  processLogin(){
    HomeService.loging(this.state.email, this.state.password).then(res => {
      this.setState({
        userId: res.id,
        userName: `${res.firstName} ${res.lastName}`,
        idCoach: res.myCoach,
        isCoach: res.coach,
        loggedIn:	res.loggedIn,
      });
    }).catch(error => console.log(error))
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          Carregando.....
        </div>
      )
    } else {
      if(this.state.loggedIn && !this.state.isCoach){
        console.log(this.state);
        return <Coachee props={this.state}/>
      } else if (this.state.loggedIn && this.state.isCoach){
        return <Coach props={this.state}/>
      } else {
        return (
          <Container text>
            <Header as='h2' icon textAlign='center'>
              <Icon name='user'/>
              User Login
              <Header.Subheader>
                Faça seu login para continuar.
              </Header.Subheader>
            </Header>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  type='email' placeholder='Email' label='Email' value={this.state.email}
                  onChange={event => this.setState({
                    email: event.target.value
                  })}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  type='password' label='Senha' placeholder='Senha' value={this.state.password}
                  onChange={event => this.setState({
                    password: event.target.value
                  })}
                />
              </Form.Group>
              <Button
                primary
                onClick={event => {
                  this.processLogin();
                }}
              >Logar</Button>
            </Form>
          </Container>
        );
      }
    }
  }
}




