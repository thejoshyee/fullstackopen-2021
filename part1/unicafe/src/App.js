import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <h2>Statistics</h2>
      { good || neutral || bad ? 
      <div>
        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="All" value={good + bad + neutral}/>
        <StatisticLine text="Average" value={good + neutral + bad / 3}/>
        <StatisticLine text="Positive" value={good / (good + neutral + bad)  * 100}/>
      </div>
        : "No feedback given." }
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td><td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Button = ({onClick, text}) => {

  return (
    <button onClick={onClick}>{text}</button>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const toggleGood = () => {
    setGood(prevGood => prevGood + 1)
  }

  const toggleBad = () => {
    setBad(prevBad => prevBad + 1)

  }

  const toggleNeutral = () => {
    setNeutral(prevNeutral => prevNeutral + 1)

  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={toggleGood} text="Good" />
      <Button onClick={toggleBad} text="Neutral" />
      <Button onClick={toggleNeutral} text="Bad" />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App