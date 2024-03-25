import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProject } from '../../Project/projectThunk/projectThunk';

import { deleteProjectReducer } from '../../Projects/projectsSlice/projectsSlice';
import { updateStatusAndVisibility } from '../../Snackbar/snackbarSlice/snackbarSlice';

import axios from '../../../utils';

export const getProjects = createAsyncThunk('projects/get', async (params, thunkAPI) => {
  try {
    const response = await axios.get('projects', {
      params,
    });

    if (response.data.length) {
      thunkAPI.dispatch(getProject({ id: response.data[0]._id }));
    }

    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'success', isShow: true }));

    return response.data;
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'error', isShow: true }));
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const addProjects = createAsyncThunk('projects/post', async ({ projectData, selectedTab }, thunkAPI) => {
  try {
    const response = await axios.post('projects', projectData);

    const project = thunkAPI.getState().project.project;

    if (!selectedTab && Object.keys(project).length === 0) {
      const id = response.data._id;
      thunkAPI.dispatch(getProject({ id }));
    }

    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'success', isShow: true }));
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'error', isShow: true }));
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const updateProject = createAsyncThunk('project/update', async (params, thunkAPI) => {
  try {
    const response = await axios.patch(`project/${params.id}`, params);

    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'success', isShow: true }));

    thunkAPI.dispatch(getProject({ id: response.data._id }));

    return response.data;
  } catch (error) {
    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'error', isShow: true }));
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const deleteProject = createAsyncThunk('projects/delete', async (params, thunkAPI) => {
  try {
    await axios.delete(`project/${params.id}`);

    thunkAPI.dispatch(deleteProjectReducer(params.id));

    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'success', isShow: true }));
  } catch (error) {
    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'error', isShow: true }));
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
