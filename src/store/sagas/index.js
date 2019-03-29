import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga } from './auth';

export function* watchAuth() {
    // Listen for AUTH_INITIATE_LOGOUT action and execute logoutSaga.
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}
