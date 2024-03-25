import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { updateSubTaskField } from '../../store/SubTasks/subTasksSlice/subTasksSlice';
import { getSubTasks } from '../../store/SubTasks/subTasksThunk/subTasksThunk';
import './ProjectTabTasksListItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskField } from '../../store/Tasks/tasksSlice/tasksSlice';
import { updateTask } from '../../store/Tasks/tasksThunk/tasksThunk';
import { getSubTasksSelectors } from '../../store/SubTasks/subTasksSelectors/subTasksSelectors';
import { Draggable } from 'react-beautiful-dnd';
import ProjectTabTaskIcons from '../ProjectTabTaskIcons';
import ProjectTabAddTask from '../ProjectTabAddTask';

const ProjectTabTasksListItem = ({ task, projectId, isSubTask = false, position }) => {
  const dispatch = useDispatch();

  const subTasks = useSelector((state) => getSubTasksSelectors(state, task._id));

  const [taskTitle, setTask] = useState(task.title);
  const [isArrowUp, setIsArrowUp] = useState(true);

  useEffect(() => {
    setTask(task.title);
  }, [task]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && taskTitle.trim() !== '') {
      if (!isSubTask) {
        dispatch(updateTaskField({ fieldName: 'title', fieldValue: taskTitle, id: task._id }));
      } else {
        dispatch(
          updateSubTaskField({
            parentTaskId: task.parentTask,
            subTaskId: task._id,
            fieldName: 'title',
            fieldValue: taskTitle,
          }),
        );
      }
      dispatch(updateTask({ id: task._id, title: taskTitle }));
    }
  };

  const handleGetSubTasks = () => {
    if (isArrowUp) {
      dispatch(getSubTasks({ projectId, parentTaskId: task._id }));
    }
    setIsArrowUp((prevState) => !prevState);
  };

  return (
    <Draggable draggableId={`${task._id}`} index={position} isDragDisabled={isSubTask}>
      {(provided) => (
        <div {...provided?.draggableProps} ref={provided?.innerRef}>
          <TextField
            label="Task"
            placeholder="Task"
            value={taskTitle}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              marginBottom: '12px',
              width: '298px',
            }}
            InputProps={{
              endAdornment: (
                <ProjectTabTaskIcons
                  handleGetSubTasks={handleGetSubTasks}
                  isArrowUp={isArrowUp}
                  isSubTask={isSubTask}
                  provided={provided}
                  task={task}
                />
              ),
              classes: {
                root: 'customTextFieldRoot',
              },
            }}
          />
          {!isArrowUp && (
            <div className="subTasksWrapper">
              {subTasks.map((subTask, id) => (
                <ProjectTabTasksListItem
                  key={subTask._id}
                  task={subTask}
                  projectId={projectId}
                  isSubTask
                  position={id}
                />
              ))}
              <ProjectTabAddTask
                label="Add subtask"
                placeholder="Add subtask"
                projectId={projectId}
                isSubTask
                task={task}
              />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ProjectTabTasksListItem;
