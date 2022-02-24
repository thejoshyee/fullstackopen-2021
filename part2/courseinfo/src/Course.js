import React from 'react'

export default function Course(props) {
    console.log(props)
  return (
    <div>
        {props.course.name}
    </div>
  )
}
