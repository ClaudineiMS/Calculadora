import React, {Component} from "react";
import './css/calculadora.css';
import {Button} from "./components/Button";
import {Display} from "./components/Display";

// Estado inicial da calculadora
const initialState = {
    displayValue: '0',
    cleanDisplay: false,
    operation: null,
    values:[0,0],
    current: 0
}

export default class Calculadora extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props);
        // Ligação dos métodos ao contexto da classe
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }
    
    // Método para limpar a memória e resetar a calculadora para o estado inicial
    clearMemory() {
       this.setState({...initialState})
    }

    // Método para definir a operação matemática a ser realizada
    setOperation(operation) {
        if (this.state.current === 0) {
          // Se não houver um número atual, define a operação e limpa o display para o próximo número
          this.setState({ operation, current: 1, cleanDisplay: true });
        } else {
          // Se houver um número atual, realiza a operação
          const equals = operation === '=';
          const currentOperation = this.state.operation;
          const values = [...this.state.values];
          let result;
      
          try {
            // Executa a operação com os valores atuais
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
            // Em caso de erro na operação, mantém o valor atual
            result = this.state.values[0];
          }
      
          // Atualiza o valor do display, a operação atual, o estado atual, e os valores
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

    // Método para adicionar um dígito ao display da calculadora
    addDigit(n){
        // Verifica se o dígito '.' já está presente no display
        if ( n === '.' && this.state.displayValue.includes('.')) {
            return;
        }

        // Verifica se o display está limpo ou não e atualiza o valor do display
        const cleanDisplay = this.state.displayValue === '0' || this.state.cleanDisplay;
        const currentDisplayValue = cleanDisplay ? '' : this.state.displayValue;
        const displayValue = currentDisplayValue + n;
        this.setState({displayValue, cleanDisplay:false});

        // Se o dígito não for '.', atualiza o valor correspondente no array de valores
        if (n !== '.'){
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({values});
        }
    }

    render() {
        // Renderiza o componente da calculadora
        return (
            <div className="calculadora">
               {/* Componente de Display */}
               <Display value={this.state.displayValue}/>
               {/* Componentes de Botão */}
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
