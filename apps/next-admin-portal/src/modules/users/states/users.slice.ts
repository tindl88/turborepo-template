import { AxiosError } from 'axios';
import { assign, difference } from 'lodash-es';
import { createEntityAdapter, createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';

import { ResponseError } from '@/interfaces/api-response.interface';
import { ReduxBaseState } from '@/interfaces/state.interface';
import {
  CreateUserDto,
  UpdateUserDto,
  UserEntity,
  UserFilter,
  UserResponse,
  UsersResponse
} from '../interfaces/users.interface';

export const entityAdapter = createEntityAdapter<UserEntity, EntityId>({
  selectId: item => item.id
});

export interface IInitialState extends ReduxBaseState {
  ids: EntityId[];
  entities: { [key: string]: UserEntity };
  selected: EntityId[];
  filter?: UserFilter;
  detail?: UserEntity;
}

export const initialState: IInitialState = entityAdapter.getInitialState<IInitialState>({
  ids: [],
  entities: {},
  selected: []
});

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /*****************************************************************
    LIST
    *****************************************************************/
    listRequest(state, _action: PayloadAction<{ filter?: UserFilter }>) {
      state.isFetching = true;
    },
    listSuccess: (state, action: PayloadAction<UsersResponse>) => {
      const { data, meta, message, statusCode } = action.payload;

      state.isFetching = false;
      state.fetchedAt = new Date().toISOString();
      state.message = message;
      state.statusCode = statusCode;
      state.error = undefined;
      state.meta = meta;
      state.detail = undefined;
      entityAdapter.setAll(state, data);
    },
    listFailure: (state, action: PayloadAction<AxiosError<ResponseError>>) => {
      const responseData = action.payload.response?.data;

      state.isFetching = false;
      state.fetchedAt = new Date().toISOString();
      state.error = responseData?.error;
      state.statusCode = responseData?.statusCode;
      state.message = responseData?.message;
    },
    /*****************************************************************
    CREATE
    *****************************************************************/
    createRequest: (state, _action: PayloadAction<CreateUserDto>) => {
      state.isCreating = true;
      state.error = undefined;
      state.message = undefined;
      state.statusCode = undefined;
    },
    createSuccess: (state, action: PayloadAction<UserResponse>) => {
      const { error, message, statusCode } = action.payload;

      state.isCreating = false;
      state.createdAt = new Date().toISOString();
      state.error = error;
      state.message = message;
      state.statusCode = statusCode;
    },
    createFailure: (state, action: PayloadAction<AxiosError<ResponseError>>) => {
      const responseData = action.payload.response?.data;

      state.isCreating = false;
      state.createdAt = new Date().toISOString();
      state.error = responseData?.error;
      state.statusCode = responseData?.statusCode;
      state.message = responseData?.message;
    },
    /*****************************************************************
    READ
    *****************************************************************/
    readRequest: (state, _action: PayloadAction<EntityId>) => {
      state.isReading = true;
    },
    readSuccess: (state, action: PayloadAction<UserResponse>) => {
      const { data, message, statusCode } = action.payload;

      state.isReading = false;
      state.readedAt = new Date().toISOString();
      state.detail = data;
      state.error = undefined;
      state.message = message;
      state.statusCode = statusCode;
    },
    readFailure: (state, action: PayloadAction<AxiosError<ResponseError>>) => {
      const responseData = action.payload.response?.data;

      state.isReading = false;
      state.readedAt = new Date().toISOString();
      state.error = responseData?.error;
      state.statusCode = responseData?.statusCode;
      state.message = responseData?.message;
    },
    /*****************************************************************
    UPDATE
    *****************************************************************/
    updateRequest: (state, _action: PayloadAction<{ id: EntityId; data: UpdateUserDto }>) => {
      state.isUpdating = true;
      state.error = undefined;
      state.message = undefined;
      state.statusCode = undefined;
    },
    updateSuccess: (state, action: PayloadAction<{ params: unknown; response: UserResponse }>) => {
      const { response } = action.payload;
      const { data, error, message, statusCode } = response;

      state.isUpdating = false;
      state.updatedAt = new Date().toISOString();
      state.error = error;
      state.message = message;
      state.statusCode = statusCode;
      entityAdapter.updateOne(state, {
        id: data.id,
        changes: {
          status: data.status
        }
      });
    },
    updateFailure: (state, action: PayloadAction<AxiosError<ResponseError>>) => {
      const responseData = action.payload.response?.data;

      state.isUpdating = false;
      state.updatedAt = new Date().toISOString();
      state.error = responseData?.error;
      state.statusCode = responseData?.statusCode;
      state.message = responseData?.message;
    },
    /*****************************************************************
    DELETE
    *****************************************************************/
    destroyRequest: (state, _action: PayloadAction<EntityId>) => {
      state.isDeleting = true;
    },
    destroySuccess: (state, action: PayloadAction<UserResponse>) => {
      const { data, error, message, statusCode } = action.payload;

      state.isDeleting = false;
      state.deletedAt = new Date().toISOString();
      state.error = error;
      state.message = message;
      state.statusCode = statusCode;
      entityAdapter.updateOne(state, {
        id: data.id,
        changes: {
          status: data.status
        }
      });
    },
    destroyFailure: (state, action: PayloadAction<AxiosError<ResponseError>>) => {
      const responseData = action.payload.response?.data;

      state.isDeleting = false;
      state.deletedAt = new Date().toISOString();
      state.error = responseData?.error;
      state.statusCode = responseData?.statusCode;
      state.message = responseData?.message;
    },
    /*****************************************************************
    BULK DELETE
    *****************************************************************/
    bulkDestroyRequest(state, _action: PayloadAction<{ ids: EntityId[] }>) {
      state.isDeleting = true;
    },
    bulkDestroySuccess(state, action: PayloadAction<UsersResponse>) {
      const { data, message, statusCode } = action.payload;

      state.isDeleting = false;
      state.deletedAt = new Date().toISOString();
      state.message = message;
      state.error = undefined;
      state.statusCode = statusCode;
      state.selected = difference(
        state.selected,
        data.map(x => x.id)
      );
      entityAdapter.updateMany(
        state,
        data.map(item => {
          return {
            id: item.id,
            changes: {
              status: item.status
            }
          };
        })
      );
    },
    bulkDestroyFailure(state, action: PayloadAction<AxiosError<ResponseError>>) {
      const responseData = action.payload.response?.data;

      state.isDeleting = false;
      state.deletedAt = new Date().toISOString();
      state.error = responseData?.error;
      state.statusCode = responseData?.statusCode;
      state.message = responseData?.message;
    },
    /*****************************************************************
    RESET STATE
    *****************************************************************/
    reset(state) {
      state.isFetching = undefined;
      state.isCreating = undefined;
      state.isReading = undefined;
      state.isUpdating = undefined;
      state.isDeleting = undefined;

      state.fetchedAt = undefined;
      state.createdAt = undefined;
      state.readedAt = undefined;
      state.updatedAt = undefined;
      state.deletedAt = undefined;
      state.filteredAt = undefined;

      state.message = undefined;
      state.error = undefined;
      state.statusCode = undefined;
    },
    /*****************************************************************
    FILTER
    *****************************************************************/
    setFilter(state, action: PayloadAction<UserFilter>) {
      state.filteredAt = new Date().toISOString();

      state.filter = assign(state.filter, action.payload);
    },
    /*****************************************************************
    SELLECT
    *****************************************************************/
    selectAll(state, action: PayloadAction<EntityId[]>) {
      state.selected = action.payload;
    },
    selectSingle(state, action: PayloadAction<EntityId>) {
      const id = action.payload;
      const index = state.selected.indexOf(id);

      if (index !== -1) {
        state.selected.splice(index, 1);
      } else {
        state.selected.push(id);
      }
    }
  }
});

export default slice;
