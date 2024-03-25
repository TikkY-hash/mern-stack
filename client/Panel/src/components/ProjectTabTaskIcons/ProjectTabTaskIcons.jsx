import { InputAdornment, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import cn from 'classnames';
import { deleteTaskField } from '../../store/Tasks/tasksSlice/tasksSlice';
import { deleteSubTaskField } from '../../store/SubTasks/subTasksSlice/subTasksSlice';
import { deleteTask } from '../../store/Tasks/tasksThunk/tasksThunk';
import { useDispatch } from 'react-redux';
import './ProjectTabTaskIcons.scss';

const ProjectTabTaskIcons = ({ handleGetSubTasks, isArrowUp, isSubTask, provided, task }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    if (!isSubTask) {
      dispatch(deleteTaskField(task._id));
    } else {
      dispatch(deleteSubTaskField({ parentTaskId: task.parentTask, subTaskId: task._id }));
    }

    dispatch(deleteTask({ id: task._id }));
  };

  return (
    <InputAdornment position="end">
      <IconButton onClick={handleDeleteTask}>
        <DeleteIcon color="error" />
      </IconButton>
      <IconButton
        onClick={handleGetSubTasks}
        edge="end"
        className={cn('arrowIcon', {
          arrowIconDown: !isArrowUp,
        })}
      >
        <ArrowUpwardIcon />
      </IconButton>
      <div className="dndWrapper">
        {!isSubTask && (
          <IconButton {...provided?.dragHandleProps}>
            <DragIndicatorIcon />
          </IconButton>
        )}
      </div>
    </InputAdornment>
  );
};

export default ProjectTabTaskIcons;
