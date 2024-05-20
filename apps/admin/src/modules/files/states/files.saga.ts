import { AxiosError, AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { EntityId, PayloadAction } from '@reduxjs/toolkit';

import { ResponseError } from '@/interfaces/api-response.interface';
import { CreateFileDto, FileFilter, FileResponse, FilesResponse, UpdateFileDto } from '../interfaces/files.interface';

import FileApi from '../api/files.api';

import slices from './files.slice';

export function* list(action: PayloadAction<{ filter: FileFilter }>) {
  try {
    const response: AxiosResponse<FilesResponse> = yield call(() => FileApi.list(action.payload.filter));

    yield put(slices.actions.listSuccess(response.data));
  } catch (error) {
    yield put(slices.actions.listFailure(error as AxiosError<ResponseError>));
  }
}

export function* create(action: PayloadAction<CreateFileDto>) {
  try {
    const response: AxiosResponse<FileResponse> = yield call(() => FileApi.create(action.payload));

    yield put(slices.actions.createSuccess(response.data));
  } catch (error) {
    yield put(slices.actions.createFailure(error as AxiosError<ResponseError>));
  }
}

export function* read(action: PayloadAction<EntityId>) {
  try {
    const response: AxiosResponse<FileResponse> = yield call(() => FileApi.read(action.payload));

    yield put(slices.actions.readSuccess(response.data));
  } catch (error) {
    yield put(slices.actions.readFailure(error as AxiosError<ResponseError>));
  }
}

export function* update(action: PayloadAction<{ id: EntityId; data: UpdateFileDto }>) {
  try {
    const response: AxiosResponse<FileResponse> = yield call(() =>
      FileApi.update(action.payload.id, action.payload.data)
    );

    yield put(
      slices.actions.updateSuccess({
        params: action.payload.data,
        response: response.data
      })
    );
  } catch (error) {
    yield put(slices.actions.updateFailure(error as AxiosError<ResponseError>));
  }
}

export function* destroy(action: PayloadAction<EntityId>) {
  try {
    const response: AxiosResponse<FileResponse> = yield call(() => FileApi.destroy(action.payload));

    yield put(slices.actions.destroySuccess(response.data));
  } catch (error) {
    yield put(slices.actions.destroyFailure(error as AxiosError<ResponseError>));
  }
}

export function* bulkDestroy(action: PayloadAction<{ ids: EntityId[] }>) {
  try {
    const response: AxiosResponse<FilesResponse> = yield call(() => FileApi.bulkDestroy(action.payload));

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
