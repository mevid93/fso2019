import React from 'react'

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

export default Course