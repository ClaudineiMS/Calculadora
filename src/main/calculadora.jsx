import React, {Component} from "react";
import './css/calculadora.css';
import {Button} from "./components/Button";
import {Display} from "./components/Display";

const initialState = {
    displayValue: '0',
    cleanDisplay: false,
    operation: null,
    values:[0,0],
    current: 0
}

export default class Calcuadora extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }
    
    clearMemory() {
       this.setState({...initialState})
    }

    setOperation(operation) {
        if (this.state.current === 0) {
          this.setState({ operation, current: 1, cleanDisplay: true });
        } else {
          const equals = operation === '=';
          const currentOperation = this.state.operation;
          const values = [...this.state.values];
          let result;
      
          try {
            switch (currentOperation) {
              case '+':
                result = parseFloat(values[0]) + parseFloat(values[1]);
                break;
              case '-':
                result = parseFloat(values[0]) - parseFloat(values[1]);
                break;
              case '*':
                result = parseFloat(values[0]) * parseFloat(values[1]);
                break;
              case '/':
                result = parseFloat(values[0]) / parseFloat(values[1]);
                break;
              default:
                result = this.state.values[0];
                break;
            }
          } catch (e) {
            result = this.state.values[0];
          }
      
          values[0] = result || this.state.values[0];
          values[1] = 0;
      
          this.setState({
            displayValue: values[0],
            operation: equals ? null : operation,
            current: equals ? 0 : 1,
            cleanDisplay: !equals,
            values,
          });
        }
    }
      
      

    addDigit(n){
        if ( n === '.' && this.state.displayValue.includes('.')) {
            return 
        }

        const cleanDisplay = this.state.displayValue === '0' || this.state.cleanDisplay;
        const correntValue = cleanDisplay ? '' : this.state.displayValue;
        const displayValue = correntValue + n;
        this.setState({displayValue, cleanDisplay:false});

        if (n !== '.'){
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({values});
            console.log(values)
        }
    }

    render() {
        return (
            <div className="calculadora">
               <Display value={this.state.displayValue}/>
               <Button label='AC' click={this.clearMemory}  triple/>
               <Button label='/'  click={this.setOperation} operation/>
               <Button label='7'  click={this.addDigit}/>
               <Button label='8'  click={this.addDigit}/>
               <Button label='9'  click={this.addDigit}/>
               <Button label='*'  click={this.setOperation} operation/>
               <Button label='4'  click={this.addDigit}/>
               <Button label='5'  click={this.addDigit}/>
               <Button label='6'  click={this.addDigit}/>
               <Button label='-'  click={this.setOperation} operation/>
               <Button label='1'  click={this.addDigit}/>
               <Button label='2'  click={this.addDigit}/>
               <Button label='3'  click={this.addDigit}/>
               <Button label='+'  click={this.setOperation} operation/>
               <Button label='0'  click={this.addDigit}     double/>
               <Button label='.'  click={this.addDigit}/>
               <Button label='='  click={this.setOperation} operation/>
            </div>
        )
    }
}