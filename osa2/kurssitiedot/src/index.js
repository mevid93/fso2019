import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <div>
      <h2>{props.course.name}</h2>
    </div>
  )
}


const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}


const Content = ({ course }) => {

  const rows = () => course.parts.map(part =>
    <Part key={part.id} part={part} />
  )

  return (
    <div>
      {rows()}
    </div>
  )
}


const Total = ({ course }) => {
  const sum = course.parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <div>
      <p><strong>total of {sum} exercises</strong></p>
    </div>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const rows = () => courses.map((course, i) =>
    <Course key={i} course={course} />
  )

  return (
    <div>
      <h1>Web development curriculum</h1>
      {rows()}
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))