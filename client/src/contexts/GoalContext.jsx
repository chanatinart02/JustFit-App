import React, { createContext, useContext, useState } from "react";

const GoalContext = createContext();

export const useGoal = () => useContext(GoalContext);

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [loadingGoals, setLoadingGoals] = useState(false);

  return (
    <GoalContext.Provider
      value={{
        goals,
        setGoals,
        loadingGoals,
        setLoadingGoals,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
