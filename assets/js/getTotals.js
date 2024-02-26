const getTotalGoals = (arr) => {
  const goals = arr.map((player) => {
    return player.statistics[0].goals.total;
  });

  const totalGoals = goals.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return totalGoals;
};

const getTotalMinutes = (arr) => {
  const minutes = arr.map((player) => {
    return player.statistics[0].games.minutes;
  });

  const totalMinutes = minutes.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return totalMinutes;
};
