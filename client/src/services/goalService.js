import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;
export const fetchGoalsApi = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}goals/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching Goals data:", error);
    throw error;
  }
};

export const createGoal = async (goalData, token) => {
  try {
    const response = await axios.post(`${API_URL}goals/`, goalData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error("Error creating goal:", error);
    throw error;
  }
};

export const deleteGoalApi = async (goalId, token) => {
  await axios.delete(`${API_URL}goals/${goalId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateGoalStatusApi = async (goalId, newStatus, token) => {
  try {
    await axios.put(
      `${API_URL}goals/${goalId}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error updating goal status:", error);
    throw error;
  }
};
