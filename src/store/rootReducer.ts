import authReducer from "./reducers/authReducers";
import historyReducer from "./reducers/historyReducer";
import informationReducer from "./reducers/informationReducer";
import transactionReducer from "./reducers/transactionReducer";

const rootReducers = {
  auth: authReducer,
  transaction: transactionReducer,
  information: informationReducer,
  history: historyReducer,
};
export default rootReducers;
