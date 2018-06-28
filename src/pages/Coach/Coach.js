import React, { Component } from 'react';

export default class Coach extends Component {

  constructor(props){
    super(props);
    this.state = {
      userId: this.props.props.userId,
      userName: this.props.props.userName,
      idCoach: this.props.props.idCoach,
      isCoach: this.props.props.coach,
      loading: true,
      coachee: []
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
          <h1>Coach {this.state.userName}</h1>
        </div>
      );
    }
  }
}
