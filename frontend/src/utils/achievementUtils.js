import api from './api';

/**
 * Check and unlock achievements for current user
 */
export const checkAndUnlockAchievements = async () => {
  try {
    const response = await api.post('/achievements/check');
    return response.data;
  } catch (error) {
    console.error('Error checking achievements:', error);
    throw error;
  }
};

/**
 * Get all achievements for current user
 */
export const getUserAchievements = async () => {
  try {
    const response = await api.get('/achievements');
    return response.data;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
};

/**
 * Get achievement statistics
 */
export const getAchievementStats = async () => {
  try {
    const response = await api.get('/achievements/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching achievement stats:', error);
    throw error;
  }
};
