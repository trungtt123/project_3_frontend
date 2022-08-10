export default (state = null, action) => {
    switch (action.type) {
        
        case "listGroups":
            //console.log(action.listGroups);
            return action.listGroups;
            
        default:
            // /console.log(action);
            return state;
    }
};