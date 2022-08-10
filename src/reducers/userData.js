export default (state = null, action) => {
    switch (action.type) {
        case "userData":
            return {

                token: action.token,
                userName: action.userName,
                fullName: action.fullName,
                group: action.group
            }
        default:
            return state;
    }
};