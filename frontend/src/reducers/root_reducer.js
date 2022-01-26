import { combineReducers } from "redux"
import EntitiesReducer from "./entities_reducer"
import SessionReducer from "./session_reducer"

const RootReducer = combineReducers({
  session: SessionReducer,
  entities: EntitiesReducer
})

export default RootReducer