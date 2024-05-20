import { AxiosError, AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { EntityId, PayloadAction } from '@reduxjs/toolkit';

import { ResponseError } from '@/interfaces/api-response.interface';
import { CreateUserDto, UpdateUserDto, UserFilter, UserResponse, UsersResponse } from '../interfaces/users.interface';

import UserApi from '../api/users.api';

import slices from './users.slice';

export function* list(action: PayloadAction<{ filter: UserFilter }>) {
  try {
    const response: AxiosResponse<UsersResponse> = yield call(() => UserApi.list(action.payload.filter));

    yield put(slices.actions.listSuccess(response.data));
  } catch (error) {
    yield put(slices.actions.listFailure(error as AxiosError<ResponseError>));
  }
}

export function* create(action: PayloadAction<CreateUserDto>) {
  try {
    const response: AxiosResponse<UserResponse> = yield call(() => UserApi.create(action.payload));

    yield put(slices.actions.createSuccess(response.data));
  } catch (error) {
    const err = error as AxiosError<ResponseError>;

    yield put(slices.actions.createFailure(err));
  }
}

export function* read(action: PayloadAction<EntityId>) {
  try {
    const response: AxiosResponse<UserResponse> = yield call(() => UserApi.read(action.payload));

    yield put(slices.actions.readSuccess(response.data));
  } catch (error) {
    yield put(slices.actions.readFailure(error as AxiosError<ResponseError>));
  }
}

export function* update(action: PayloadAction<{ id: EntityId; data: UpdateUserDto }>) {
  try {
    const response: AxiosResponse<UserResponse> = yield call(() =>
      UserApi.update(action.payload.id, action.payload.data)
    );

    yield put(
      slices.actions.updateSuccess({
        params: action.payload.data,
        response: response.data
      })
    );
  } catch (error) {
    const err = error as AxiosError<ResponseError>;

    yield put(slices.actions.updateFailure(err));
  }
}

export function* destroy(action: PayloadAction<EntityId>) {
  try {
    const response: AxiosResponse<UserResponse> = yield call(() => UserApi.destroy(action.payload));

    yield put(slices.actions.destroySuccess(response.data));
  } catch (error) {
    yield put(slices.actions.destroyFailure(error as AxiosError<ResponseError>));
  }
}

export function* bulkDestroy(action: PayloadAction<{ ids: EntityId[] }>) {
  try {
    const response: AxiosResponse<UsersResponse> = yield call(() => UserApi.bulkDestroy(action.payload));

    yield put(slices.actions.bulkDestroySuccess(response.data));
  } catch (error) {
    yield put(slices.actions.bulkDestroyFailure(error as AxiosError<ResponseError>));
  }
}

export default function* watcher() {
  yield all([
    takeLatest(slices.actions.listRequest.type, list),
    takeLatest(slices.actions.createRequest.type, create),
    takeLatest(slices.actions.readRequest.type, read),
    takeLatest(slices.actions.updateRequest.type, update),
    takeLatest(slices.actions.destroyRequest.type, destroy),
    takeLatest(slices.actions.bulkDestroyRequest.type, bulkDestroy)
  ]);
}
