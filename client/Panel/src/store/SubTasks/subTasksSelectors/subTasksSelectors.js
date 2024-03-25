import { createSelector } from '@reduxjs/toolkit';

const getSubTasks = (state) => state.subTasks.subTasks;

export const getSubTasksSelectors = createSelector(
  [getSubTasks, (state, parentTaskId) => parentTaskId],
  (subTasks, parentTaskId) => {
    return subTasks[parentTaskId] || [];
  },
);
