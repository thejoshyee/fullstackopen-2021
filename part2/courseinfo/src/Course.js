import React from 'react'

const Content = ({ exercises }) => {
    return (
        exercises.map(part => {
            return <li key={part.id}>{part.name} {part.exercises}</li>
        })
    )
}

const Total = ({ exercises }) => {

    //take exercises object and return new object with just exercises 
    const totalExercises = exercises.reduce((total, number) => {
        return { "exercises": total.exercises + number.exercises }
    }).exercises
    
    return (
        <p>
            <b>Total Number of Exercises: {totalExercises}</b>
        </p>
    )
}

const Course = ({ course }) => { 
    return (
        <>
            <h1>{course.name}</h1>
            <Content exercises={course.parts} />
            <Total exercises={course.parts}/>
        </>
    )
}


export default function Courses({ courses }) {
  return (
    <div>
        {courses.map(course => <Course key={course.id} course={course} /> )}
    </div>
  )
}
