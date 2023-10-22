import React, { createContext, useContext, useState } from "react";

const ActivityContext = createContext();

export const useActivities = () => useContext(ActivityContext);

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  return (
    <ActivityContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivityContext.Provider>
  );
};
