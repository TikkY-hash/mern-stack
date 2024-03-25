import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProjectTabPanelButtonsSort from '../ProjectTabPanelButtonsSort';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTasks } from '../../store/Tasks/tasksThunk/tasksThunk';

const ProjectTabPanelTitle = ({ projectId }) => {
  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSortBy = (method) => {
    let newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortParams = { id: projectId };

    if (method === 'createdAt') {
      sortParams.sortBy = 'createdAt';
    } else {
      sortParams.sortBy = 'pos';
      newSortOrder = 'asc';
    }

    setSortBy(method);
    setSortOrder(newSortOrder);

    dispatch(getTasks({ ...sortParams, sortOrder: newSortOrder }));
  };

  return (
    <Box mt={5} mb={2} display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="h5" gutterBottom>
        Tasks
      </Typography>
      <ProjectTabPanelButtonsSort handleSortBy={handleSortBy} sortBy={sortBy} />
    </Box>
  );
};

export default ProjectTabPanelTitle;
