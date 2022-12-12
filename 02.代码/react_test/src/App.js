import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react';

class App extends Component{

  state={
    msg:"我是初始化数据"
  }

  clickHandler=()=>{
    console.log(1,this.state.msg)
    this.setState({
      msg:"我是修改之后的结果"
    })
    console.log(2,this.state.msg)
  }

  render(){
    return(
      <h1 onClick={this.clickHandler}>msg:{this.state.msg}</h1>
    )
  }
}

export default App;
