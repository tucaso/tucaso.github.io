import actions from '../actions/entity-actions';

const getInitialState = () => {
  return {
    entities: []
  };
};

const EntityReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actions.GET_ENTITIES:
      let entities = action.payload.entities.Entities.slice();
      for (let i in entities) {
        entities[i].key = entities[i].id;
      }
      return { entities };
    case actions.REMOVE_ENTITIES:
      return getInitialState();
    default:
      return state;
  }
};

export default EntityReducer;
