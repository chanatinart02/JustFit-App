import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyChart = ({ activities }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tracking History (Mins)",
      },
    },
  };

  const activityGroups = {};
  activities.forEach((activity) => {
    if (!activityGroups[activity.typeOfActivity]) {
      activityGroups[activity.typeOfActivity] = [];
    }
    activityGroups[activity.typeOfActivity].push(activity);
  });

  const datasets = [];
  const bgColors = {
    Jogging: "rgba(255, 99, 132, 1)",
    Abs: "rgba(54, 162, 235, 1)",
    Yoga: "rgba(255, 206, 86, 1)",
    Pilates: "rgba(153, 102, 255, 1)",
    Zumba: "rgba(255, 159, 64, 1)",
  };

  let labels = [];

  for (const [type, group] of Object.entries(activityGroups)) {
    const durations = group.map((activity) => activity.duration);
    const formattedDates = group.map((activity) =>
      dayjs(activity.dateOfActivity).format("DD/MM/YYYY")
    );

    labels = formattedDates;

    const backgroundColor = bgColors[type];
    const borderColor = bgColors[type];

    datasets.push({
      label: type,
      data: durations,
      backgroundColor,
      borderColor,
    });
  }

  const data = {
    labels,
    datasets,
  };

  return <Line options={options} data={data} />;
};

export default MyChart;
