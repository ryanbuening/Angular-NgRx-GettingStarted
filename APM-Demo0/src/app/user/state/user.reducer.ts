import { createReducer, createAction, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user';
import * as UserActions from '../state/user.actions';

export interface UserState {
	currentUser: User;
	maskUserName: boolean;
}

const initialState: UserState = {
	currentUser: null,
	maskUserName: false
};

export const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getCurrentUser = createSelector(getUserFeatureState, (state) => state.currentUser);
export const getMaskUserName = createSelector(getUserFeatureState, (state) => state.maskUserName);

export const userReducer = createReducer(
	initialState,
	on(UserActions.toggleMaskUserName, (state): UserState => {
		return {
			...state,
			maskUserName: !state.maskUserName
		};
	})
);
