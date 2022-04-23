import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'


const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }



  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>


      <div style={hideWhenVisible} >
        <button className='viewButton' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible} className='togglableHiddenContent'>
        <button onClick={toggleVisibility}>{props.closeLabel}</button>
        {props.children}
      </div>


    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  closeLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'


export default Togglable