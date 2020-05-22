import actions from '../actions/city-actions';

const getInitialState = () => {
  return {
    cities: []
  };
};

const CityReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actions.GET_CITIES:
      let cities = action.payload.cities.slice();
      for (let i in cities) {
        cities[i].key = cities[i].id;
      }
      return { cities };
    default:
      return state;
  }
};

export default CityReducer;
