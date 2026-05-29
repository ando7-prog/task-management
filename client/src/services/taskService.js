//  connects Dashboard ↔ Backend APIs
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const getToken = () => {

  return localStorage.getItem('token');

};

export const createTask = async (taskData) => {

  const response = await axios.post(
    `${API_URL}/create`,
    taskData,
    {
      headers: {
        Authorization: getToken()
      }
    }
  );

  return response.data;

};

export const getTasks = async () => {

  const response = await axios.get(
    API_URL,
    {
      headers: {
        Authorization: getToken()
      }
    }
  );

  return response.data;

};

export const deleteTask = async (id) => {

  const response = await axios.delete(
    `${API_URL}/delete/${id}`,
    {
      headers: {
        Authorization: getToken()
      }
    }
  );

  return response.data;

};
export const updateTask = async (id, taskData) => {

  const response = await axios.put(
    `${API_URL}/update/${id}`,
    taskData,
    {
      headers: {
        Authorization: getToken()
      }
    }
  );

  return response.data;

};