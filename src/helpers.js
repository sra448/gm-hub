import { useReducer } from 'react';
import { concat, lensIndex, lensPath, set } from 'ramda';

// Custom hooks

const itemsReducer = (items, action) => {
  const id = items.indexOf(action.item);

  switch (action.type) {
    case 'add':
      return concat(items, [action.item]);

    case 'remove':
      return set(lensIndex(id), null, items);

    case 'set':
      return set(lensPath([id, action.prop]), action.value, items);

    default:
      return items;
  }
};

export const useRecordList = initialItems => {
  const [items, dispatch] = useReducer(itemsReducer, initialItems || []);

  const addItem = item => {
    dispatch({ type: 'add', item });
  };

  const removeItem = item => {
    dispatch({ type: 'remove', item });
  };

  const setItem = (item, prop, value) => {
    dispatch({ type: 'set', item, prop, value });
  };

  return [items.filter(x => x), addItem, setItem, removeItem];
};

// Helpers

export const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
