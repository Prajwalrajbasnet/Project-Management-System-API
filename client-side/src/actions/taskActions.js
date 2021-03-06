import { FETCH_TASKS_BEGIN, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE } from '../constants/actionNames';
import taskService from '../services/taskService';

export function fetchTasksBegin() {
  return {
    type: FETCH_TASKS_BEGIN,
  };
}

export function fetchTasksSuccess(tasks) {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
  };
}

export function fetchTasksFailure(error) {
  return {
    type: FETCH_TASKS_FAILURE,
    payload: error,
  };
}

export function fetchTasks(projectId) {
  return (dispatch) => {
    dispatch(fetchTasksBegin());
    return taskService
      .getAllTasks(projectId)
      .then((res) => {
        dispatch(fetchTasksSuccess(res.data));
      })
      .catch((error) => dispatch(fetchTasksFailure(error)));
  };
}

export function addTask(newTask, originalTasks, id, resolve) {
  return (dispatch) => {
    newTask.project_id = id;
    return taskService
      .createTask(newTask)
      .then((res) => {
        const addedTask = [...originalTasks, newTask];
        dispatch(fetchTasksSuccess(addedTask));
        resolve();
      })
      .catch((error) => {
        console.log(error);
        resolve();
        dispatch(fetchTasksFailure(error));
      });
  };
}

export function updateTask(updatedTask, oldTask, originaTasks, resolve) {
  return (dispatch) => {
    return taskService
      .updateTask(updatedTask.task_id, updatedTask)
      .then((res) => {
        const tasksList = [...originaTasks];
        tasksList[oldTask.tableData.id] = updatedTask;
        dispatch(fetchTasksSuccess(tasksList));
        resolve();
      })
      .catch((error) => {
        console.log(error);
        resolve();
        dispatch(fetchTasksFailure(error));
      });
  };
}

export function deleteTask(oldTask, originalTasks, resolve) {
  return (dispatch) => {
    return taskService
      .deleteTask(oldTask.task_id)
      .then((res) => {
        const tasksList = [...originalTasks];
        tasksList.splice(oldTask.tableData.id, 1);
        dispatch(fetchTasksSuccess(tasksList));
        resolve();
      })
      .catch((error) => {
        console.log(error);
        resolve();
        dispatch(fetchTasksFailure(error));
      });
  };
}
