import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
// import { userReducer } from './Auth/authSlice';
// import { booksReducer } from './Books/booksSlice';


const booksConfig = {
	key: 'books',
	storage,
	whitelist: ['books'],
};

const usersConfig = {
	key: 'auth',
	storage,
	whitelist: ['token'],
};


const rootReducer = combineReducers({
	// user: persistReducer(usersConfig, userReducer),
	// books: persistReducer(booksConfig, booksReducer),
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: rootReducer,


	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);