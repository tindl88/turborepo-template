import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { FileEntity } from '../interfaces/files.interface';

import { FileDialogType } from '../constants/files.constant';

interface IState {
  type: FileDialogType;
  selectedItems: FileEntity[];
}

interface IActions {
  setType: (type: FileDialogType) => void;
  clear: () => void;
  setSelectedItems: (items: FileEntity[]) => void;
  setSelectedItem: (type: FileDialogType, item: FileEntity) => void;
}
export const useFileDialogState = create<IState & IActions>()(
  devtools(
    immer(set => ({
      type: 'single',
      selectedItems: [],
      setType: type => {
        set(state => {
          state.type = type;
        });
      },
      setSelectedItems: items => {
        set(state => {
          state.selectedItems = items;
        });
      },
      setSelectedItem: (type, item) => {
        set(state => {
          if (type === 'single') {
            state.selectedItems = [item];
          } else if (type === 'multiple') {
            const isSelected = state.selectedItems.some(x => x.id === item.id);

            if (isSelected) {
              state.selectedItems = state.selectedItems.filter(x => x.id !== item.id);
            } else {
              state.selectedItems = [...state.selectedItems, item];
            }
          }
        });
      },
      clear: () => {
        set(state => {
          state.selectedItems = [];
        });
      }
    })),
    { enabled: process.env.NODE_ENV === 'development' }
  )
);
