import useSWR from 'swr';

import { APIs, fetcher, putter } from '../utils.js';

export function useTodoLists() {
  const { data = [], mutate } = useSWR({ url: APIs.TodoLists }, fetcher);

  return {
    data,
    async newList(newListName, icon) {

      // make sure the first letter of the query is capitalized to include ALL MUI icons
      // even if the user inputs all lowercase characters
      // const capitalizedIcon = icon ? icon.charAt(0).toUpperCase() + icon.slice(1) : 'List';

      return await mutate(
        await putter({
          url: APIs.TodoLists,
          icon: icon || 'List', // note: not using default param since an empty string is the default and won't be falsy
          // icon: capitalizedIcon,
          name: newListName,
        }),
        {
          populateCache: false,
          optimisticData: oldData => [
            ...oldData,
            { name: newListName, icon: icon || 'List', data: [] },
            // { name: newListName, icon: capitalizedIcon, data: [] },
          ],
        }
      );
    },
    async updateList(listToUpdate, newListName) {
      await mutate(
        await putter({
          url: APIs.TodoListsUpdate,
          id: listToUpdate,
          name: newListName,
        }),
        {
          populateCache: false,
          optimisticData: oldData =>
            oldData.map(d => {
              if (d.id === listToUpdate) {
                return { ...d, name: newListName };
              }
              return d;
            }),
        }
      );
    },
  };
}
