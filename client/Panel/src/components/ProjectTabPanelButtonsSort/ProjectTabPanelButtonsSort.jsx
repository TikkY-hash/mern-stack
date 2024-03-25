import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Sort as SortIcon, DragIndicator as DragIndicatorIcon } from '@mui/icons-material';

const buttons = [
  { key: 'createdAt', icon: <SortIcon /> },
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
