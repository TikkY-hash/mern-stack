export const getSubTasksSelectors = (state) => (parentTaskId) => state.subTasks.subTasks[parentTaskId] || [];
