const initialCall = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

// initialCall(premScorersUrl, options);

const playerCards = document.querySelector(".player-cards");

const createSeasonString = (yearString) => {
  const nextYear = parseInt(`${yearString[2]}${yearString[3]}`) + 1;

  return `${yearString}-${nextYear.toString()}`;
};

const generateAllPlayerCards = (array) => {
  for (let i = 0; i < array.length; i++) {
    let rank = i + 1;
    playerCards.appendChild(createPlayerCard(array[i], rank));
  }
};

const pageSeasonString = createSeasonString(
  exampleResponse[0].response[0].statistics[0].league.season.toString()
);

const totalMinutes = getTotalMinutes(exampleResponse[0].response);
const totalGoals = getTotalGoals(exampleResponse[0].response);

const pageSeasonH3 = document.querySelector(".page-season");
const pageGoalsH3 = document.querySelector(".page-goals");
const pageMinutesH3 = document.querySelector(".page-minutes");

pageSeasonH3.textContent = pageSeasonString;
pageGoalsH3.textContent = totalGoals;
pageMinutesH3.textContent = totalMinutes;

generateAllPlayerCards(exampleResponse[0].response);
const allPlayerCards = document.querySelectorAll(".player-card-wrapper");
const sortBtn = document.querySelectorAll(".sort-btn");

sortBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const direction = btn.dataset.sort;

    sortPlayerCards(direction);
  });
});
