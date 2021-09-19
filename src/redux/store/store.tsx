import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleWare from "redux-saga";

import { rootReducer } from "../rootReducer";
import { rootSaga } from "../rootSaga";

const sagaMiddleWare = createSagaMiddleWare();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (applyMiddleware) => applyMiddleware().concat(sagaMiddleWare),
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
sagaMiddleWare.run(rootSaga);
