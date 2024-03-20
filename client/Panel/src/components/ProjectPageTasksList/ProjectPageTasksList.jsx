import { useDispatch } from 'react-redux';
import { getTasks } from '../../store/Tasks/tasksThunk/tasksThunk';
import { useSelector } from 'react-redux';
import { getTasksSelector } from '../../store/Tasks/tasksSelectors/tasksSelectors';
import ProjectPageTasksListItem from '../ProjectPageTasksListItem';
import { useEffect, useState } from 'react';
import ProjectPageFilters from '../ProjectPageFilters';
import './ProjectPageTasksList.scss';

const ProjectPageTasksList = ({ projectId }) => {
  const dispatch = useDispatch();

  const [filterType, setFilterType] = useState('all');

  const tasks = useSelector(getTasksSelector);

  const handleClickFilters = (status) => {
    dispatch(getTasks({ id: projectId, status }));
    setFilterType(status);
  };

  useEffect(() => {
    dispatch(getTasks({ id: projectId }));
  }, []);

  return (
    <div className="projectPageTasksWrapper">
      <h1 className="taskListTitle">Tasks</h1>
      <ProjectPageFilters value={filterType} setFilterType={handleClickFilters} />
      <ul className="projectPageTasksWrapper">
        {tasks.map((task) => (
          <ProjectPageTasksListItem key={task._id} task={task} projectId={projectId} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectPageTasksList;
