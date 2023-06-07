import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import authenSlice from "./authenSlice";
import userSlice from "./userSlice";
import courseSlice from "./courseSlice";
import blogSlice from "./blogSlice";
import contactSlice from "./contactSlice";
import feedbackSlice from "./feedbackSlice";
import supportSlice from "./supportSlice";
import chapterSlice from "./chapterSlice";
import lessonSlice from "./lessonSlice";
import testSlice from "./testSlice";
import questionSlice from "./questionSlice";
import blogCategorySlice from "./blogCategorySlice";
import blogDetailSlice from "./blogDetailSlice";
import paymentSlice from "./paymentSlice";
import dashboardSlice from "./dashboardSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducers = combineReducers({
  authen: authenSlice.reducer,
  user: userSlice.reducer,
  course: courseSlice.reducer,
  blog: blogSlice.reducer,
  contact: contactSlice.reducer,
  feedback: feedbackSlice.reducer,
  support: supportSlice.reducer,
  chapter: chapterSlice.reducer,
  lesson: lessonSlice.reducer,
  test: testSlice.reducer,
  question: questionSlice.reducer,
  blogCategory: blogCategorySlice.reducer,
  blogDetails : blogDetailSlice.reducer,
  payment : paymentSlice.reducer,
  dashboard : dashboardSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };