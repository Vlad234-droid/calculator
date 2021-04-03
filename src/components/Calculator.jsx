import React, { useState, useEffect, useRef } from 'react';
import { Wrapper, AnswerBlock, GetNumbers, Answer, 
    FLexContainer, RowBlock, ExceptionH3 } from "./StyledCalculator";

import { adding, multiply, devide, subtract,
         isExists, keyMatch, refsToEmptyStr,
         keyMatchReg } from "./util";


const Calculator = () => {

    const calcAct = useRef({
        currentOperation: "",
        currentNumberBefore: "",
        currentNumberAfter: "",
        prevMemo: "",
    })

    const [numbersDisplay, setNumbersDisplay] = useState("");

    const [ results, setResults] = useState(null);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if(results === "Infinity" || results === "NaN") {
            alert("Never devide any numbers by zero, press OK and never do this")
            clear()
        }
    }, [results])

   
    const handleKeyDown = (e) => {
        let key = e.key;
        if (key === "Enter") {
            finalResult()
            return
        }
        if(e.shiftKey && key === "*") {
            key = "*"
        }
        if(e.shiftKey && key === "%") {
            key = "%"
        }

        const reg = new RegExp(/^\d+(\.\d+)?$/);
        if(keyMatchReg(key, reg)) {
            setNumbersDisplay((numbersDisplay) => (`${numbersDisplay}${key}`))
            if(calcAct.current.currentOperation === "") {
                calcAct.current.currentNumberBefore = calcAct.current.currentNumberBefore.concat(key);
            } else if (calcAct.current.currentOperation !== '') {
                calcAct.current.currentNumberAfter = calcAct.current.currentNumberAfter.concat(key);
            }
        }

        if(keyMatch(key)) {
            if(calcAct.current.currentOperation === "") {
                calcAct.current.currentOperation = key;
                setNumbersDisplay((numbersDisplay) => (`${numbersDisplay}${key}`));
            } else {
                const res = getResults(calcAct.current.currentNumberBefore, calcAct.current.currentNumberAfter, calcAct.current.currentOperation)
                const strRes = res.toString();
                calcAct.current.currentNumberBefore = strRes;
                calcAct.current.currentNumberAfter = "";
                setNumbersDisplay((numbersDisplay) => (`${numbersDisplay}${key}`));
                calcAct.current.currentOperation = key;
            }
            
        }
    };

    const clickOperation = (e) => {
        setNumbersDisplay((prev) => `${prev}${e.target.innerText}`)
        if(calcAct.current.currentOperation === '') {
            calcAct.current.currentOperation = e.target.innerText;
        } else if (calcAct.current.currentOperation !== '') {
            const res = getResults(calcAct.current.currentNumberBefore, calcAct.current.currentNumberAfter, calcAct.current.currentOperation)
            const strRes = res.toString();
            calcAct.current.currentNumberBefore = strRes;
            calcAct.current.currentNumberAfter = "";
            calcAct.current.currentOperation = e.target.innerText;
        }
    }

    const getItem = (e) => {
        let getedItem = e.target.innerText
        if( +getedItem === 0 && (numbersDisplay === "" || numbersDisplay === 0 )) return
        if(calcAct.current.currentOperation === "") {
            calcAct.current.currentNumberBefore = calcAct.current.currentNumberBefore.concat(getedItem);
        } else {
            calcAct.current.currentNumberAfter = calcAct.current.currentNumberAfter.concat(getedItem);
        }
        setNumbersDisplay((numbersDisplay) => (`${numbersDisplay}${getedItem}`))
    }

    const memory = () => {
        const res = getResults(
        calcAct.current.currentNumberBefore, 
        calcAct.current.currentNumberAfter, 
        calcAct.current.currentOperation) + Number(calcAct.current.prevMemo);
        const strRes = res.toString();
        calcAct.current.prevMemo = strRes;
        calcAct.current.currentNumberBefore = "";
        calcAct.current.currentNumberAfter = "";
        calcAct.current.currentOperation = "";
        setNumbersDisplay(() => "")
    }

    const memShowHandle = () => {
        setResults(() => Number(calcAct.current.prevMemo));
        calcAct.current.currentNumberBefore = calcAct.current.prevMemo;
        calcAct.current.currentNumberAfter = "";
        calcAct.current.currentOperation = "";
        setNumbersDisplay(() => calcAct.current.currentNumberBefore)
    }

    const getResults = (prev, next, operation) => {

        let isPointAppear = false;
        
        if(isExists(prev, next)) {
            isPointAppear = !isPointAppear;
        }   
        let toFixedCheckPoint = isPointAppear ? 1 : 0;

        switch(operation){
           case "+":
               if(!next.includes("%")) {
                   return (+prev + +next)
               } else {
                   return adding(prev, next, toFixedCheckPoint)
               }
           case "*":
               if(!next.includes("%")) {
                   return (+prev * +next)
               } else {
                   return multiply(prev, next, toFixedCheckPoint)
               }
           case "/":
               if(!next.includes("%")) {
                   return (+prev / +next)
               } else {
                   return devide(prev, next)
               }
           case "-":
               if(!next.includes("%")) {
                   return (+prev - +next)
               } else {
                   return subtract(prev, next, toFixedCheckPoint)
               }
           default:
               return operation
        }
    }  

    const finalResult = () => {
        const prev = calcAct.current.currentNumberBefore;
        const next = calcAct.current.currentNumberAfter;

        let isPointAppear = false;
        if(isExists(prev, next)) {
            isPointAppear = !isPointAppear;
        }   
        let toFixedCheckPoint = isPointAppear ? 1 : 0;
        
        switch(calcAct.current.currentOperation){
           case "+":
                if(!calcAct.current.currentNumberAfter.includes("%")) {
                   setResults(() => (+prev + +next).toFixed(toFixedCheckPoint))
                } else {
                   setResults(() => adding(prev, next, toFixedCheckPoint));
                }
                break
           case "*":
                if(!calcAct.current.currentNumberAfter.includes("%")) {
                   setResults(() => (+prev * +next).toFixed(toFixedCheckPoint))
                } else {
                   setResults(() => multiply(prev, next, toFixedCheckPoint))
                }
                break
           case "/":
                if(!calcAct.current.currentNumberAfter.includes("%")) {
                   setResults(() => (+prev / +next).toFixed(toFixedCheckPoint))
                } else { 
                   setResults(() => devide(prev, next));
                }
                break
           case "-":
                if(!calcAct.current.currentNumberAfter.includes("%")) {
                   setResults(() => (+prev - +next).toFixed(toFixedCheckPoint))
                } else {
                   setResults(() => subtract(prev, next, toFixedCheckPoint));
                }
                break
           default:
               return calcAct.current.currentOperation
        }
        if(results !== null || results <= -1) {
          const reverseResults = () => {
            const res = getResults(calcAct.current.currentNumberBefore, calcAct.current.currentNumberAfter, calcAct.current.currentOperation)
            const strRes = res.toString();
            calcAct.current.currentNumberBefore = strRes;
            calcAct.current.currentNumberAfter = "";
            calcAct.current.currentOperation = "";
            setResults(() => null)
            setNumbersDisplay(() => strRes)
          }
          reverseResults()
        }
    }

    const clear = () => {
        setNumbersDisplay(() => "")
        setResults(() => null)
        refsToEmptyStr(calcAct);
    }
    return(
        <Wrapper>
            <AnswerBlock>
                <GetNumbers data-testid="numbersDisplayed">
                    {numbersDisplay}
                </GetNumbers>
                <Answer>
                    {results}
                </Answer>
            </AnswerBlock>
            <FLexContainer>
                    <RowBlock>
                        <button style={{background: "#d0cccc"}} onClick={clear}>AC</button>
                        <button onClick={memory}>
                            ME
                        </button>
                        <button onClick={(e) => getItem(e)}>%</button>
                        <button onClick={(e) => clickOperation(e)}>/</button>
                    </RowBlock>
                    <RowBlock>
                        <button onClick={(e) => getItem(e)}>7</button>
                        <button onClick={(e) => getItem(e)}>8</button>
                        <button onClick={(e) => getItem(e)}>9</button>
                        <button onClick={(e) => clickOperation(e)}>*</button>
                    </RowBlock>
                    <RowBlock>
                        <button onClick={(e) => getItem(e)}>4</button>
                        <button  onClick={(e) => getItem(e)}>5</button>
                        <button onClick={(e) => getItem(e)}>6</button>
                        <button onClick={(e) => clickOperation(e)}>-</button>
                    </RowBlock>
                    <RowBlock>
                        <button onClick={(e) => getItem(e)}>1</button>
                        <button onClick={(e) => getItem(e)}>2</button>
                        <button onClick={(e) => getItem(e)}>3</button>
                        <button onClick={(e) => clickOperation(e)}>+</button>
                    </RowBlock>
                    <RowBlock>
                        <button onClick={(e) => getItem(e)}>.</button>
                        <button onClick={(e) => getItem(e)}>0</button>
                        <ExceptionH3 data-testid="results" onClick={finalResult}>=</ExceptionH3>
                        <button onClick={memShowHandle}>MRC</button>
                    </RowBlock>
                </FLexContainer>
        </Wrapper>
    );
}

export default Calculator;