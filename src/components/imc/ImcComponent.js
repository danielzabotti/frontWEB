import React, { Component } from 'react';
import ImcService from './ImcService';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';


export default class ImcComponent extends Component {

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      userid: this.props.props.userId,
      peso: "",
      altura: "",
      dados: [],
      userType: this.props.props.userType
    }
  };

  componentDidMount(){
    this.getImcData();
  }

  getImcData(){
    console.log(this.state.userid);
    ImcService.getData(this.state.userid).then(res => {
      console.log(res);
      this.setState({dados: res.result});
    })
  }

  formatDate(d){
    let date = new Date(d);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('-');
  }

  addImc(){
    ImcService.insertImcData(this.state.peso, this.state.altura, this.state.userid)
      .then(response => {
        this.state.altura = '';
        this.state.peso = '';
        this.getImcData();
      })
  }

  formatChart(){
    if(this.state.dados !== null && this.state.dados !== undefined) {
      let data = this.state.dados.map(dado => {
        return ({
          x: dado.id,
          y: dado.imc
        })
      });
      return (
        <XYPlot width={1000} height={300} xType='ordinal'>
          <HorizontalGridLines />
          <LineSeries data={data}/>
          <XAxis />
          <YAxis />
        </XYPlot>
      )
    }
  }

  isCoach(){
    if(!this.state.userType){
      return(
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Peso</label>
            <input
              type="number"
              className="form-control"
              placeholder="Insira o peso em kg"
              value={this.state.peso}
              onChange={event => this.setState({
                peso : event.target.value
              })}/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Altura</label>
            <input
              type="number"
              className="form-control"
              placeholder="Insira sua altura em cm"
              value={this.state.altura}
              onChange={event => this.setState({
                altura : event.target.value
              })}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={event => {
              event.preventDefault();
              this.addImc()
            }}
          >Enviar</button>
        </form>
      )
    } else {
      return(
        <div/>
      )
    }
  }

  render() {
    return (
      <div className="container">
        {this.isCoach()}
        <br/>
        <br/>
        <table className="table">
          <thead>
          <tr>
            <th>Data</th>
            <th>Peso(kg)</th>
            <th>Altura(m)</th>
            <th>IMC</th>
          </tr>
          </thead>
          <tbody id="tabela-pacientes">
          {
            this.state.dados.map(dado => {
              return(
                <tr key={dado.id.toString()}>
                  <td>{this.formatDate(dado.data)}</td>
                  <td>{Number(dado.peso).toFixed(2)}</td>
                  <td>{Number(dado.altura).toFixed(2)}</td>
                  <td>{Number(dado.imc).toFixed(2)}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        <br />
        {this.formatChart()}
      </div>
    );
  }
}
