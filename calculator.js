//DOM Element
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const valueEl = document.querySelector('.value');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percantageEl = document.querySelector('.percentage');

const additionEl = document.querySelector('.addition');
const substractionEl = document.querySelector('.substraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');


const decimalEl = document.querySelector('.decimal');
const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const numberElArray= [
    number0El, number1El, number2El, number3El, number4El,
     number5El, number6El, number7El, number8El, number9El
];

//variables
let ValueStrInMemory = null;
let operatorInMemory = null;


//functions
const getValueAsStr = () =>  valueEl.textContent.split(',').join('');

const getValueAsNum = () => {
    return parseFloat(getValueAsStr()); 
};

const setStrAsValue = (valueStr) => {
    if (valueStr [valueStr.length - 1] === '.'){
        valueEl.textContent += '.';
        return; 
    }


     const [WholeNumstr, decimalStr] = valueStr.split('.');
     if (decimalStr){
        valueEl.textContent = 
        parseFloat(WholeNumstr).toLocaleString() + '.' + decimalStr
     } else {
        valueEl.textContent = parseFloat(WholeNumstr).toLocaleString();
     }
    
}
const handleNumberClick = (numStr) => {
    const currentValueStr = getValueAsStr();
    if (currentValueStr === '0') {
       setStrAsValue(numStr);
    } else {
        setStrAsValue(currentValueStr + numStr);
    }
};
const getResultOfOperationAsStr = () => {
    const currentValueNum = getValueAsNum ();
    const ValueNumInMemory = parseFloat(ValueStrInMemory);
    let newValueNum;
    if (operatorInMemory === 'addition'){
        newValueNum = ValueNumInMemory + currentValueNum;
    } else if (operatorInMemory === 'subtraction'){
        newValueNum = ValueNumInMemory - currentValueNum;
    } else if (operatorInMemory === 'multiplication'){
        newValueNum = ValueNumInMemory * currentValueNum;
    } else if (operatorInMemory === 'division'){
        newValueNum = ValueNumInMemory / currentValueNum;
    }
    
    return newValueNum.toString();
}
const handleOperatorClick = (operation) => {
    const currentValueStr = getValueAsStr (); 
    
    if (!ValueStrInMemory) {
        ValueStrInMemory = currentValueStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }
    ValueStrInMemory = getResultOfOperationAsStr();
    operatorInMemory = operation;
    setStrAsValue('0');
};


//Add Event Listerners to functions
acEl.addEventListener('click', () => {
    setStrAsValue('0');
    ValueStrInMemory = null;
    operatorInMemory = null;
});
pmEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const currentValueStr = getValueAsStr();
    if (currentValueStr === '-0'){
         setStrAsValue('0');
         return;   
    }
    if (currentValueNum >= 0) {
        setStrAsValue('-' + currentValueStr);
    } else {
        setStrAsValue(currentValueStr.substring (1));
    }
});
percantageEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum ();
    const newValueNum = currentValueNum / 100;
    setStrAsValue(newValueNum.toString());
    ValueStrInMemory = null;
    operatorInMemory = null;
});

//Add Event listerners to Operators
additionEl.addEventListener('click', () => {
    handleOperatorClick('addition')
});
substractionEl.addEventListener('click', () => {
    handleOperatorClick('substraction')
});
multiplicationEl.addEventListener('click', () => {
    handleOperatorClick('multiplication')
});
divisionEl.addEventListener('click', () => {
    handleOperatorClick('division')
});
equalEl.addEventListener('click', () => {
    if (ValueStrInMemory) {
        setStrAsValue(getResultOfOperationAsStr());
        ValueStrInMemory = null;
        operatorInMemory = null; 
    }
});

//Add Event Listerners to numbers and decimals
for ( let i=0; i < numberElArray.length; i++){
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
}
decimalEl.addEventListener('click',() => {
     const currentValueStr = getValueAsStr();
     if (!currentValueStr.includes(',')) {
        setStrAsValue(currentValueStr + '.');
    }
});

// Set up the time
const updateTime = () => {    
    const currentTime = new Date();

    let currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime,1000);
updateTime();