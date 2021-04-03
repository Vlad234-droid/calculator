export const adding = (prev, next, toFixedCheckPoint) => (+prev + ((+prev / 100) * (+next.slice(0, -1)))).toFixed(toFixedCheckPoint);
export const multiply = (prev, next, toFixedCheckPoint) => (+prev / 100) * (+next.slice(0, -1)).toFixed(toFixedCheckPoint);
export const devide = (prev, next) => Number((+prev) / (+next.slice(0, -1) / 100)).toFixed(1);
export const subtract = (prev, next, toFixedCheckPoint) => (+prev) - ((+prev / 100) * (+next.slice(0, -1))).toFixed(toFixedCheckPoint);
export const isExists = (prev, next) => {
  if(prev.toString().includes(".") 
    || next.toString().includes('.') 
    || prev.toString().includes("%")
    || next.toString().includes("%")) {
      return true
    } else {
      return false
    }
}
export const keyMatch = (key) => {
  if(key === "+" || key === "-" || key === "*" || key === "/") {
    return true
  } else {
    return false
  }
}
export const refsToEmptyStr = (calcAct) => {
    for(let item in calcAct.current) {
      calcAct.current[item] = ""
    }
}
export const keyMatchReg = (key, reg) => {
  if(key.match(reg) !== null || key === "." || key === "%") {
    return true
  } else {
    return false
  }
}



