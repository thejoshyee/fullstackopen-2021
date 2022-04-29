export const filterText = (filterText) => ({
    type: 'FILTER',
    data: filterText
})

const filterReducer = (state = null, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.data
        default:
            return state
    }
}

export default filterReducer