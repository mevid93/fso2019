import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({ clickFunction, text }) => (
  <button onClick={clickFunction}>
    {text}
  </button>
)

// statistiikka omassa komponentissa
const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good - bad) / (good + neutral + bad)}</p>
      <p>positive {good / (good + neutral + bad) * 100} %</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // funktiot tilan muuttamiseen
  const rateGood = () => {
    setGood(good + 1)
  }

  const rateNeutral = () => {
    setNeutral(neutral + 1)
  }

  const rateBad = () => {
    setBad(bad + 1)
  }

  // varsinainen dokumentti
  return (
    <div>
      <Header text={'give feedback'} />
      <Button clickFunction={() => rateGood()} text={'good'} />
      <Button clickFunction={() => rateNeutral()} text={'neutral'} />
      <Button clickFunction={() => rateBad()} text={'bad'} />
      <Header text={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)