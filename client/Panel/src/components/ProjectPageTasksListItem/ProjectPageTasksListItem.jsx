import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import TextArea from '../TextArea';
import { useState } from 'react';
import { getSubTasks } from '../../store/SubTasks/subTasksThunk/subTasksThunk';
import { getSubTasksSelectors } from '../../store/SubTasks/subTasksSelectors/subTasksSelectors';

import './ProjectPageTasksListItem.scss';

const TasksListItem = ({ task, projectId }) => {
  const dispatch = useDispatch();

  const [isSubTasksOpen, setIsSubTasksOpen] = useState(false);

  const subTasks = useSelector(getSubTasksSelectors)(task._id);

  const isFinished = task.status === 'finished';

  const handleGetSubTasks = () => {
    if (!isSubTasksOpen) {
      dispatch(getSubTasks({ projectId, parentTaskId: task._id }));
    }
    setIsSubTasksOpen((prevState) => !prevState);
  };

  return (
    <>
      <li className="projectTasksListItemWrapper">
        <div className="taskTitleWrapper">
          <div onClick={handleGetSubTasks} className="subTasksIconWrapper">
            <div
              className={cn('subTaskIcon', {
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
            <h1 className="taskTitle">{task.title}</h1>
          </div>
          <div className="statusWrapper">
            {isFinished ? (
              <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM11.52,17L6,12.79l1.83-2.37L11.14,13l4.51-5.08,2.24,2Z" />
              </svg>
            ) : (
              <svg fill="#000000" width="26px" height="26px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>
                    {`.cls-1 {
                fill: none;
                 }`}
                  </style>
                </defs>
                <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM8,18a2,2,0,1,1,2-2A2,2,0,0,1,8,18Zm8,0a2,2,0,1,1,2-2A2,2,0,0,1,16,18Zm8,0a2,2,0,1,1,2-2A2,2,0,0,1,24,18Z" />
                <path
                  id="inner-path"
                  className="cls-1"
                  d="M10,16a2,2,0,1,1-2-2A2,2,0,0,1,10,16Zm6-2a2,2,0,1,0,2,2A2,2,0,0,0,16,14Zm8,0a2,2,0,1,0,2,2A2,2,0,0,0,24,14Z"
                />
                <rect
                  id="_Transparent_Rectangle_"
                  data-name="<Transparent Rectangle>"
                  className="cls-1"
                  width="32"
                  height="32"
                />
              </svg>
            )}
          </div>
        </div>
        <h1 className="taskDescription">Description: </h1>
        <p className="taskDescription">{task.description}</p>
      </li>
      {isSubTasksOpen && (
        <ul className="subTasksList">
          {subTasks.map((subTask) => (
            <TasksListItem key={subTask._id} task={subTask} projectId={projectId} isSubTask />
          ))}
        </ul>
      )}
    </>
  );
};

export default TasksListItem;
