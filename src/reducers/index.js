import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import UserReducer from './user-reducer';
import CasesReducer from './cases-reducer';
import CaseReducer from './case-reducer';
import CityReducer from './city-reducer';
import EntityReducer from './entity-reducer';
import StripeReducer from './stripe-reducer';
import PlanReducer from './plan-reducer';
import PaymentReducer from './payment-reducer';
import PaymentsReducer from './payments-reducer';
import InactiveCasesReducer from './inactive-cases-reducer';
import PublicReducer from './public-reducer';

export default combineReducers({
  authState: AuthReducer,
  userState: UserReducer,
  casesState: CasesReducer,
  InactiveCasesState: InactiveCasesReducer,
  caseState: CaseReducer,
  citiesState: CityReducer,
  entitiesState: EntityReducer,
  stripeState: StripeReducer,
  planState: PlanReducer,
  paymentState: PaymentReducer,
  paymentsState: PaymentsReducer,
  publicState: PublicReducer
});
