import React from 'react';
import numeral from 'numeral';

import './calculator.css';

export default class Calculator extends React.Component {

    constructor(props) {

        super(props);      
        
        // val: current value shown in display
        // lastVal: previous value
        // mem: value in memory
        // lastOp: the name of the last operation
        // reset: if true next number typed replaces current value

        this.state = {val: '0', lastVal: '0', mem: 0, lastOp: '', reset: false};
    }

    op(name) {

        let { val, lastVal, lastOp, reset } = this.state;        

        val = parseFloat(val);
        lastVal = parseFloat(lastVal)

        if (lastVal) {

            //console.log('val = ' + val + ' lastVal = ' + lastVal + ' lastOp = ' + lastOp);

            switch (lastOp) {
                case 'divide':      val = lastVal / val; break;            
                case 'multiply':    val *= lastVal; break;
                case 'minus':       val = lastVal - val; break;
                case 'add':         val += lastVal; break;
                break;
            }
        }

        val = val.toString()
        lastVal = val;
        lastOp = name;
        reset = true;

        this.setState({ val, lastVal, lastOp, reset });
    }

    immediateOp(name) {

        // do operation immediately

        let { val, mem, lastOp, lastVal } = this.state;

        let x = parseFloat(val)

        switch (name) {
            case 'squareRoot': val = Math.sqrt(x); break;
            case 'plusMinus':  val = (val[0] == '-') ? val.substring(1) : '-' + val; break;
            case 'clear':       val = '0'; break;
            case 'allClear':    mem = 0; val = '0'; lastOp = ''; lastVal = '0'; break;      // clear memory as well         
            case 'percent':     
                                // make val a fraction then multiply by previous value
                                val = x / 100; 
                                val *= lastVal;
                                this.setState({ val: val.toString(), reset: true, lastVal: 0 });
                                return;
                                break;   
            case 'equals':     
                    this.op()
                    return
                    break
        }      
        
        this.setState({ val: val.toString(), mem: mem, reset: true, lastOp, lastVal });
    }

    off() { alert('power off') }

    memory(name) {

        let { val, mem } = this.state;

        val = parseFloat(val);

        switch (name) {
            
            case 'recall': 
                // value of memory is not changed

                val = mem.toString(); 
                this.setState({val: val.toString()}); 
                return; 
                break;

            case 'clear': mem = 0; break;
            case 'minus': mem -= val; break;
            case 'plus': mem += val; break;
        }

        this.setState({mem, reset: true});
    }

    number(n) {

        let { val, reset } = this.state;

        val = val.toString()

        if (reset) {

            // replace value

            val = n
        }
        else {

            if (val == 0 && val.indexOf('.') == -1) {

                // if current value is zero replace the number
                
                val = n.toString();
            }
            else
                val += n.toString();
        }

        this.setState({ val: val.toString(), reset: false});
    }

    point() {

        // decimal point

        let { val, reset } = this.state;

        if (reset) {

            // replace value
            
            val = '.'
        }
        else {

            val = val.toString()

            if (val.length < 1 || val.indexOf('.') == -1)
                val += '.';
        }

        this.setState({ val, reset: false });        
    }  

    onButtonClick(e) {

        const val = e.target.id;

        switch (val) {
            case 'btn-8': this.immediateOp('squareRoot'); break;
            case 'btn-9': this.off(); break;
            case 'btn-13': this.memory('clear'); break;
            case 'btn-14': this.memory('recall'); break;
            case 'btn-15': this.memory('minus'); break;
            case 'btn-16': this.memory('plus'); break;
            case 'btn-17': this.op('divide'); break;
            case 'btn-21': this.immediateOp('percent'); break;
            case 'btn-22': this.number(7); break;
            case 'btn-23': this.number(8); break;
            case 'btn-24': this.number(9); break;
            case 'btn-25': this.op('multiply'); break;
            case 'btn-29': this.immediateOp('plusMinus'); break;
            case 'btn-30': this.number(4); break;
            case 'btn-31': this.number(5); break;
            case 'btn-32': this.number(6); break;  
            case 'btn-33': this.op('minus'); break;    
            case 'btn-37': this.immediateOp('clear'); break;    
            case 'btn-38': this.number(1); break;
            case 'btn-39': this.number(2); break;
            case 'btn-40': this.number(3); break; 
            case 'btn-47': this.immediateOp('allClear'); break;    
            case 'btn-48': this.number(0); break;    
            case 'btn-49': this.point(); break;     
            case 'btn-50': this.immediateOp('equals'); break;      
            
            case 'btn-41': this.op('add'); break;
            case 'btn-44': this.op('add'); break;
            case 'btn-51': this.op('add'); break;
        }        
    }

    lpad (n, padString, length) {

        var str = n

        while (str.length < length)
            str = padString + str

        return str
    }

    render() {

        let { val } = this.state

        let buttons = []

        // each button is an image

        for (let i = 1; i < 56; i++) {
            buttons.push(<img id={'btn-' + i} src={"images/calc_" + this.lpad(i.toString(), '0', 2) + ".png"} key={i} onClick={this.onButtonClick.bind(this)} />)
        }

        let x = parseFloat(val)

        // format the display value to 10 decimal places

        let displayVal = numeral(x).format('0,0.[00000]')

        // put back the decimal point in the display

        if (val[val.length - 1] == '.')
            displayVal += '.'

        return (

            <div className='calculator-container'>
                {buttons}

                <div className='display'>
                    <span>{displayVal}</span>
                </div>
            </div>
        );
    }
}