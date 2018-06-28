import React, { Component } from 'react';
import MetasService from './MetaService';

export default class Metas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userid: this.props.props.userId,
      finishedGoals: [],
      unfinishedGoals: [],
      title: '',
      description: '',
      userType: this.props.props.userType
    }
  };

  completeGoal(metaId){
    MetasService.completeGoal(metaId).then(res => {
      this.getAllData();
    })
  }

  deleteGoal(metaId){
    MetasService.deleteGoal(metaId).then(res => {
      this.getAllData();
    })
  }

  insertMetas(){
    MetasService.insertGoals(this.state.userid, this.state.description, this.state.title).then(res => {
      this.state.description = '';
      this.state.title = '';
      this.getAllData();
    })
  }

  componentDidMount(){
    this.getAllData();
  }

  getAllData(){
    MetasService.getFinishedGoals(this.state.userid).then(res => {
      let finished = res.response;
      MetasService.getUnfinishedGoals(this.state.userid).then(res => {
        this.setState({
          unfinishedGoals: res.response,
          finishedGoals: finished
        });
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }

  isCoach(){
    if(this.state.userType){
      return(
        <form>
          <div className="form-group">
            <label htmlFor="titulo">Titulo</label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              aria-describedby="emailHelp"
              placeholder="Digite o titulo"
              value={this.state.title}
              onChange={evt => this.setState({title: evt.target.value})}/>
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descricao</label>
            <input
              type="text"
              className="form-control"
              id="descricao"
              placeholder="Digite a descricao"
              value={this.state.description}
              onChange={evt => this.setState({description: evt.target.value})}/>
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={(event => {
              event.preventDefault();
              this.insertMetas(this.state.description, this.state.title);
            })}
          >Adicionar</button>
        </form>
      );
    }
  }

  render() {
    return (
      <div className='container'>
        {this.isCoach()}
        <br />
        <br />
        <h1>Metas Abertas</h1>
        <table className="table" >
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Título</th>
            <th scope="col">Descrição</th>
            <th scope="col">Ação</th>
          </tr>
          </thead>
          <tbody>
          {
            this.state.unfinishedGoals.map(goal => {
              return(
                <tr data-id={goal.id.toString()} key={goal.id.toString()}>
                  <th scope="row">{goal.id}</th>
                  <th scope="row">{goal.title}</th>
                  <th scope="row">{goal.description}</th>
                  <th scope="row">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={event => {
                        event.preventDefault();
                        this.completeGoal(event.target.parentNode.parentNode.getAttribute("data-id"))
                      }}
                    >Completar Meta</button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={event => {
                        event.preventDefault();
                        this.deleteGoal(event.target.parentNode.parentNode.getAttribute("data-id"));
                      }}
                    >Deletar Meta</button>
                  </th>
                </tr>
              );
            })
          }
          </tbody>
        </table>
        <br/>
        <br/>
        <br/>
        <h1>Metas Concluidas</h1>
        <table className="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Título</th>
            <th scope="col">Descrição</th>
            <th scope="col">Ação</th>
          </tr>
          </thead>
          <tbody>
          {
            this.state.finishedGoals.map(goal => {
              return(
                <tr data-id={goal.id.toString()} key={goal.id.toString()}>
                  <th scope="row">{goal.id}</th>
                  <th scope="row">{goal.title}</th>
                  <th scope="row">{goal.description}</th>
                  <th scope="row">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={event => {
                        event.preventDefault();
                        this.deleteGoal(event.target.parentNode.parentNode.getAttribute("data-id"))
                      }}>Deletar Meta</button>
                  </th>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}
