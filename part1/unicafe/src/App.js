import React,{useState} from "react"


const App=()=> {
  let [good,setGood]=useState(0);
  let [neutral,setNeutral]=useState(0);
  let [bad,setBad]=useState(0);
  let [all,setAll]=useState(0);

  const handleGood=()=>{
    setGood(good+1);
    setAll(all+1);
  }
  const handleNeutral=()=>{
    setNeutral(neutral+1);
    setAll(all+1);
  }
  const handleBad=()=>{
    setBad(bad+1);
    setAll(all+1);
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  );
}
const Statistics =(props)=>{
  let {good,neutral,bad,all}=props;
  if(all>0){
    return(
      <div>
        <h2>statistics</h2>
        <table>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={all/3}/>
          <StatisticLine text="positive" value={all>0?good*100/all+" %":""}/>
        </table>
        
      </div>
    );
  }else{
    return(
      <p>No feedback given</p>
    );
  }
  
}
const StatisticLine=(props)=>{
  let {text,value}=props;
  return(
    <tbody>
        <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
}
const Button=(props)=>{
  let {handleClick,text}=props;
  return(
    <button onClick={handleClick}>{text}</button>
  );
}
export default App;
