import React from 'react';
import IconButton from '@mui/material/IconButton';
import { CalendarToday as CalendarIcon, DragIndicator as DragIndicatorIcon } from '@mui/icons-material';

const buttons = [
  { key: 'createdAt', icon: <CalendarIcon /> },
  { key: 'pos', icon: <DragIndicatorIcon /> },
];

const ProjectTabPanelButtonsSort = ({ handleSortBy, sortBy }) => (
  <div>
    {buttons.map(({ key, icon }) => (
      <IconButton key={key} onClick={() => handleSortBy(key)} color={sortBy === key ? 'primary' : 'default'}>
        {icon}
      </IconButton>
    ))}
  </div>
);

export default ProjectTabPanelButtonsSort;
