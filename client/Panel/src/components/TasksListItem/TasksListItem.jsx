import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import TextArea from '../TextArea';
import { updateTaskField, deleteTaskField } from '../../store/Tasks/tasksSlice/tasksSlice';
import { updateTask, deleteTask } from '../../store/Tasks/tasksThunk/tasksThunk';
import { debounce } from '../../Core/utils';
import { useState, useCallback } from 'react';
import { addSubTasks, getSubTasks } from '../../store/SubTasks/subTasksThunk/subTasksThunk';
import { updateSubTaskField, deleteSubTaskField } from '../../store/SubTasks/subTasksSlice/subTasksSlice';
import { getSubTasksSelectors } from '../../store/SubTasks/subTasksSelectors/subTasksSelectors';
import { Draggable } from 'react-beautiful-dnd';

import './TasksListItem.scss';

const TasksListItem = ({ task, projectId, isSubTask = false, position }) => {
  const dispatch = useDispatch();

  const [isSubTasksOpen, setIsSubTasksOpen] = useState(false);

  const subTasks = useSelector(getSubTasksSelectors)(task._id);

  const isFinished = task.status === 'finished';

  const handleUsersSearchUpdate = useCallback(
    debounce((value, fieldName) => dispatch(updateTask({ id: task._id, [fieldName]: value })), 500),
    [],
  );

  const handleUsersSearch = (value, fieldName) => {
    if (!isSubTask) {
      dispatch(updateTaskField({ fieldName, fieldValue: value, id: task._id }));
    } else {
      dispatch(
        updateSubTaskField({ parentTaskId: task.parentTask, subTaskId: task._id, fieldName, fieldValue: value }),
      );
    }

    handleUsersSearchUpdate(value, fieldName);
  };

  const handleDeleteTask = () => {
    if (!isSubTask) {
      dispatch(deleteTaskField(task._id));
    } else {
      dispatch(deleteSubTaskField({ parentTaskId: task.parentTask, subTaskId: task._id }));
    }

    dispatch(deleteTask({ id: task._id }));
  };

  const handleAddSubTasks = () => {
    dispatch(addSubTasks({ projectId, parentTaskId: task._id }));
    dispatch(getSubTasks({ projectId, parentTaskId: task._id }));
    setIsSubTasksOpen(true);
  };

  const handleGetSubTasks = () => {
    if (!isSubTasksOpen) {
      dispatch(getSubTasks({ projectId, parentTaskId: task._id }));
    }
    setIsSubTasksOpen((prevState) => !prevState);
  };

  return (
    <Draggable draggableId={`${task._id}`} index={position} isDragDisabled={isSubTask}>
      {(provided) => (
        <div {...provided?.draggableProps} ref={provided?.innerRef}>
          <li className="tasksListItemWrapper">
            <div
              className={cn('deleteIconWrapperList', {
                isDisabledDndIconWrapperList: isSubTask,
              })}
              {...provided?.dragHandleProps}
            >
              <div
                onClick={handleGetSubTasks}
                className={cn('handleGetSubTasksIcon', {
                  activeGetSubTaskIcon: isSubTasksOpen,
                })}
              >
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 -4.5 20 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-220.000000, -6684.000000)" fill="#000000">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path
                          d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"
                          id="arrow_down-[#338]"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div onClick={handleDeleteTask}>
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#a10808"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                  <g id="SVGRepo_iconCarrier">
                    <path d="M10 12V17" stroke="#ec1313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 12V17" stroke="#ec1313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 7H20" stroke="#ec1313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                      stroke="#ec1313"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                      stroke="#ec1313"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="contentWrapper">
              <TextArea
                className="tasksListItemTitle"
                placeholder="Enter task title"
                onChange={(value) => handleUsersSearch(value, 'title')}
                value={task.title}
              />
              <TextArea
                className="tasksListItemDescription"
                placeholder="Enter task description"
                onChange={(value) => handleUsersSearch(value, 'description')}
                value={task.description}
              />

              <div className="checkboxWrapper">
                {!isSubTask && (
                  <>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={isFinished}
                      onChange={() => {
                        const currentStatus = isFinished ? 'pending' : 'finished';

                        handleUsersSearch(currentStatus, 'status');
                      }}
                    />
                    <h1>Finished</h1>
                  </>
                )}
              </div>

              <button className="addSubTaskButton" onClick={handleAddSubTasks}>
                Add subtask
              </button>
            </div>
          </li>
          {isSubTasksOpen && (
            <ul className="subTasksList">
              {subTasks.map((subTask) => (
                <TasksListItem key={subTask._id} task={subTask} projectId={projectId} isSubTask />
              ))}
            </ul>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TasksListItem;