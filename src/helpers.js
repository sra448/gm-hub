import { useReducer } from "react";
import { lensPath, set, values } from "ramda";

const uuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

const itemsReducer = (items, action) => {
  switch (action.type) {
    case "add":
      const uid = uuid();
      return set(lensPath([uid]), { uid, ...action.values }, items);

    case "remove":
      return set(lensPath([action.item.uid]), null, items);

    case "set":
      return set(lensPath([action.item.uid, action.prop]), action.value, items);

    default:
      return items;
  }
};

// TODO: add default items
// TODO: don't rely on an object to ensure order
export const useRecordList = () => {
  const [items, dispatch] = useReducer(itemsReducer, {});

  const addItem = values => {
    dispatch({ type: "add", values });
  };

  const removeItem = item => {
    dispatch({ type: "remove", item });
  };

  const setItem = (item, prop, value) => {
    dispatch({ type: "set", item, prop, value });
  };

  return [values(items).filter(x => x), addItem, setItem, removeItem];
};
