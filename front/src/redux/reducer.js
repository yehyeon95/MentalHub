const initialState = {
    searchResult: [],
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULT':
            return {
                ...state,
                searchResult: action.payload,
            };
        default:
            return state;
    }
};

export default Reducer;
