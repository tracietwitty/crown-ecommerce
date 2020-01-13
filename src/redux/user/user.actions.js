import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
	//action type must match what the reducer expects (see user.reducer.js)
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user
});
