import React from "react";
import Screen from "./Screen";
import Button from "./Button";
import "./styles.css";

let flag = false;
const nums = Array.from(Array(10).keys()).reverse();
const symbset = ["=", ".", "-", "+", "*", "/", "%", "√"].reverse();
const operators = ["+", "-", "*", "/"];
//create 'operations' so operators and their functions can exists as variables
const operations = {
  "+": function(a, b) {
    return a + b;
  },
  "-": function(a, b) {
    return a - b;
  },
  "*": function(a, b) {
    return (a * b).toPrecision(10);
  },
  "/": function(a, b) {
    return (a / b).toPrecision(10);
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      scrValue: "0"
    };
  }

  checklength(e){
    if((this.state.scrValue + e.target.value).length>14)
      this.setState({scrValue: this.state.scrValue.substring(0,14)});
  }

  //tests if a string contains only integer of float numbers
  checkString(value) {
    if (/^\d+\.\d+$/.test(value) || /^\d+$/.test(value)) return true;
    else return false;
  }

  //manipulates the situation when 2 operators goes together in the screen.
  replacesymbol(symb) {
    // if there is an operator at the end of the string and the rest is a number,
    // then the prexisted operator is replaced by the new operator clicked by user.
    if (this.checkString(this.state.scrValue.slice(0, -1)))
      this.setState({ scrValue: this.state.scrValue.slice(0, -1) + symb });
    //else means that there is already an operator between 2 numbers in the screen and a second
    //one comes in. The first in place operation completes and the sybmol of the
    //new operation is added at the end of the result.
    else {
      this.setState({
        scrValue:
          //operations object has every possible operation, so we specify the operator
          //by filtering operators array with the operator that is already included in
          //the screen string and the 2 numbers needed for the operation are being given
          operations[
            //getting the operator that exist in the string
            operators.filter(operator => this.state.scrValue.includes(operator))
          ](
            //transform string to number
            Number(
              //getting the first part of the string, the one before operator
              this.state.scrValue.split(
                operators.filter(operator =>
                  this.state.scrValue.includes(operator)
                )
              )[0]
            ),
            //transform string to number
            Number(
              //getting the second part of the string, the one after operator
              this.state.scrValue.split(
                operators.filter(operator =>
                  this.state.scrValue.includes(operator)
                )
              )[1]
            )
          ) + symb //adding the symbol of the new operation at the end
      });
    }
  }

  updateScreen(e) {

    switch (e.target.value) {
      case "C": {
        this.setState({ scrValue: "0" });
        break;
      }
      case "←": {
        //check the length of screen value
        if (this.state.scrValue.length > 1)
          this.setState({
            scrValue: this.state.scrValue.slice(0, -1),
            symb: null
          });
        else this.setState({ scrValue: "0" });
        break;
      }
      case ".": {
        if (
          this.checkString(this.state.scrValue) &&
          !this.state.scrValue.includes(".")
        )
          this.setState({ scrValue: this.state.scrValue + "." });
        else if (
          this.checkString(this.state.scrValue.slice(0, -1)) &&
          !this.state.scrValue.includes(".")
        )
          this.setState({ scrValue: this.state.scrValue.slice(0, -1) + "." });
        else if (
          this.state.scrValue.split(
            operators.filter(operator => this.state.scrValue.includes(operator))
          )[1].length > 0 &&
          !this.state.scrValue
            .split(
              operators.filter(operator =>
                this.state.scrValue.includes(operator)
              )
            )[1]
            .includes(".")
        )
          this.setState({
            scrValue: this.state.scrValue + "."
          });
        break;
      }
      case "+": {
        if (this.state.scrValue.includes("+"))
          this.setState({
            scrValue:
              this.state.scrValue
                .split("+")
                .reduce((a, b) => Number(a) + Number(b)) + "+"
          });
        if (this.checkString(this.state.scrValue))
          this.setState({ scrValue: this.state.scrValue + e.target.value });
        else this.replacesymbol("+");
        break;
      }
      case "-": {
        if (this.state.scrValue.includes("-"))
          this.setState({
            scrValue:
              this.state.scrValue
                .split("-")
                .reduce((a, b) => Number(a) - Number(b)) + "-"
          });
        if (this.checkString(this.state.scrValue))
          this.setState({ scrValue: this.state.scrValue + e.target.value });
        else this.replacesymbol("-");
        break;
      }
      case "*": {
        if (
          this.state.scrValue.includes("*") &&
          this.state.scrValue.split("*")[1] !== ""
        )
          this.setState({
            scrValue:
              this.state.scrValue
                .split("*")
                .reduce((a, b) => Number(a) * Number(b)) + "*"
          });
        if (this.checkString(this.state.scrValue))
          this.setState({ scrValue: this.state.scrValue + e.target.value });
        else this.replacesymbol("*");
        break;
      }
      case "/": {
        if (
          this.state.scrValue.includes("/") &&
          this.state.scrValue.split("/")[1] !== ""
        )
          this.setState({
            scrValue:
              this.state.scrValue
                .split("/")
                .reduce((a, b) => Number(a) / Number(b)) + "/"
          });
        if (this.checkString(this.state.scrValue))
          this.setState({ scrValue: this.state.scrValue + e.target.value });
        else this.replacesymbol("/");
        break;
      }
      case "√": {
        if (this.checkString(this.state.scrValue))
          this.setState({ scrValue: String(Math.sqrt(this.state.scrValue).toPrecision(6)) });
        else if (this.checkString(this.state.scrValue.slice(0, -1)))
          this.setState({
            scrValue: String(Math.sqrt(this.state.scrValue.slice(0, -1).toPrecision(6)))
          });
        else
          this.setState({
            scrValue:
              this.state.scrValue.split(
                operators.filter(operator =>
                  this.state.scrValue.includes(operator)
                )
              )[0] +
              operators.filter(operator =>
                this.state.scrValue.includes(operator)
              ) +
              String(
                Math.sqrt(
                  this.state.scrValue.split(
                    operators.filter(operator =>
                      this.state.scrValue.includes(operator)
                    )
                  )[1]
                ).toPrecision(6)
              )
          });
        break;
      }
      case "%": {

        if (this.checkString(this.state.scrValue))
          this.setState({ scrValue: "0" });
        else if (this.checkString(this.state.scrValue.slice(0, -1)))
          this.setState({
            scrValue:
              this.state.scrValue +
              String(
                ((this.state.scrValue.slice(0, -1) *
                  this.state.scrValue.slice(0, -1)) /
                  100).toPrecision(6)
              )
          });
        else
          this.setState({
            scrValue:
              this.state.scrValue.split(
                operators.filter(operator =>
                  this.state.scrValue.includes(operator)
                )
              )[0] +
              operators.filter(operator =>
                this.state.scrValue.includes(operator)
              ) +
              String(
                ((this.state.scrValue.split(
                  operators.filter(operator =>
                    this.state.scrValue.includes(operator)
                  )
                )[0] *
                  this.state.scrValue.split(
                    operators.filter(operator =>
                      this.state.scrValue.includes(operator)
                    )
                  )[1]) /
                  100).toPrecision(6)
              )
          });
          this.checklength(e);
        break;
      }
      case "=": {
        this.checklength(e);
        if (this.checkString(this.state.scrValue)) break;
        if (this.state.scrValue.slice(-1) === ".") {
          this.setState({ scrValue: this.state.scrValue.slice(0, -1) });
          break;
        }
        if (this.checkString(this.state.scrValue.slice(0, -1)))
          this.setState({
            scrValue: operations[this.state.scrValue.slice(-1)](
              Number(this.state.scrValue.slice(0, -1)),
              Number(this.state.scrValue.slice(0, -1))
            )
          });
        else this.replacesymbol("");
        flag = true;
        break;
      }
      default: {
        //check if '0' is the initial value

        this.state.scrValue === "0" ||
        (flag && this.checkString(this.state.scrValue))
          ? this.setState({ scrValue: e.target.value })
          : this.setState({ scrValue: this.state.scrValue + e.target.value });

        flag = false;
        this.checklength(e);


        break;
      }
    }

  }

  render() {
    return (
      <div className="App">
        <Screen scrValue={this.state.scrValue} />
        <div className="clearContainer">
          <Button text={"←"} onClick={e => this.updateScreen(e)} />
          <Button text={"C"} onClick={e => this.updateScreen(e)} />
        </div>
        <div className="numsContainer">
          {nums.map(num => (
            <Button text={num} onClick={e => this.updateScreen(e)} />
          ))}
        </div>
        <div className="symbsetContainer">
          {symbset.map(symb => (
            <Button text={symb} onClick={e => this.updateScreen(e)} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
