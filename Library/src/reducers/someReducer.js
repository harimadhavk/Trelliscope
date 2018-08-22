
const someReducer = (state = { name : 'hello world' }, action) => {
  switch (action.type) {
    case "NAME_CHANGE":
      return { name : action.name}
    default:
  }
  return state;
};

export default someReducer;
