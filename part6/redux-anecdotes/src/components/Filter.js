import React from 'react'
import { connect } from 'react-redux'
import { filterText } from '../reducers/filterReducer'

const Filter = props => {

    const handleChange = event => {
        props.filterText(event.target.value)
    }

    return (
        <div>
            Filter <input onChange={handleChange} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        filter: state.filter
    }
}

const mapDispatchToProps = {
    filterText
}

const connectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default connectedFilter