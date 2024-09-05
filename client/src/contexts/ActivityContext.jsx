import React, { createContext, useContext, useState } from "react";

const ActivityContext = createContext();

export const useActivities = () => useContext(ActivityContext);

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <ActivityContext.Provider
      value={{
        activities,
        setActivities,
        selectedActivity,
        setSelectedActivity,
        loading,
        setLoading,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
