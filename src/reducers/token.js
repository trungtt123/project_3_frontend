export default (state = null, action) => {
    switch (action.type) {
        case "token":
            return action.payload
            
        default:
            return state;
    }
};