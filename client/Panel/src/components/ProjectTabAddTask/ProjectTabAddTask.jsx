import { TextField } from '@mui/material';
import { useState } from 'react';
import { addTasks } from '../../store/Tasks/tasksThunk/tasksThunk';
import { addSubTasks } from '../../store/SubTasks/subTasksThunk/subTasksThunk';
import { useDispatch } from 'react-redux';

const ProjectTabAddTask = ({ projectId, placeholder, label, isSubTask = false, task }) => {
  const dispatch = useDispatch();
  const [taskTitle, setTask] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && taskTitle.trim() !== '') {
      if (!isSubTask) {
        dispatch(addTasks({ id: projectId, title: taskTitle }));
      } else {
        dispatch(addSubTasks({ projectId, parentTaskId: task._id, title: taskTitle }));
      }
      setTask('');
    }
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={taskTitle}
      onChange={(e) => setTask(e.target.value)}
      onKeyDown={handleKeyDown}
      sx={{
        marginBottom: '12px',
        width: '298px',
      }}
      fullWidth
    />
  );
};

export default ProjectTabAddTask;
