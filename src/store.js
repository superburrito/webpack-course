import { createStore, compose } from "redux"
import { testReducer } from "./reducers"

const preloadedState = {}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers()

export default initialState => {
  const store = createStore(testReducer, preloadedState, enhancer)
  if (module.hot) {
    module.hot.accept("./reducers", () =>
      store.replaceReducer(
        require("./reducers") /*.default if you use Babel 6+ */
      )
    )
  }

  return store
}
