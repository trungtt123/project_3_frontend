export default (state = null, action) => {
    switch (action.type) {
        case "status_modal":
            return {

                title: action.title,
                description: action.description,
                style: action.style

            }
        default:
            return state;
    }
};