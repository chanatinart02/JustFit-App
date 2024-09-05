import activities from "../constants/activitiesType";

export function calculateTime(hour, minute) {
  let totalMinutes = parseInt(hour, 10) * 60 + parseInt(minute, 10);
  return totalMinutes;
}

export function calculateEnergyBurn(activityType, duration) {
  const selectedActivity = activities.find(
    (activity) => activity.name === activityType
  );
  if (selectedActivity) {
    const caloriesPerMinute = selectedActivity.caloriesPerMinute;
    const totalCaloriesBurned = caloriesPerMinute * duration;
    return totalCaloriesBurned;
  } else {
    return 0;
  }
}

export function convertToHoursAndMinutes(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const hoursText = hours > 0 ? `${hours} hr` : "";
  const minutesText = minutes > 0 ? `${minutes} min` : "";

  return `${hoursText} ${minutesText}`.trim();
}

export function metersToKilometers(meters) {
  return meters / 1000; // 1 kilometer = 1000 meters
}

export const resetForm = (setFormData, setHour, setMinute, email) => {
  setFormData({
    typeOfActivity: "",
    title: "",
    dateOfActivity: "",
    duration: 0,
    energyBurn: 0,
    distance: 0,
    description: "",
    email,
  });
  setHour("");
  setMinute("");
};
