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

const harryKane = exampleResponse[0].response[1];
// console.log(topScorer);

// imgWrapper.appendChild(playerImg);
// const cardTopLeft = document.querySelector(".card-top-left");
const playerCards = document.querySelector(".player-cards");

const createSeasonString = (yearString) => {
  const nextYear = parseInt(`${yearString[2]}${yearString[3]}`) + 1;

  return `${yearString}-${nextYear.toString()}`;
};

const createH5CardBtm = (title, value) => {
  const element = document.createElement("h5");
  const elementTitle = document.createElement("span");
  const elementValue = document.createElement("span");
  elementTitle.textContent = title;
  elementValue.textContent = value;
  element.appendChild(elementTitle);
  element.appendChild(elementValue);

  return element;
};

const createPlayerCard = (player, rank) => {
  const seasonYear = player.statistics[0].league.season.toString();

  const data = {
    id: player.player.id,
    name: player.player.name,
    firstname: player.player.firstname,
    lastname: player.player.lastname,
    age: player.player.age,
    photo: player.player.photo,
    teamName: player.statistics[0].team.name,
    teamLogo: player.statistics[0].team.logo,
    season: createSeasonString(seasonYear),
    rank: rank,
    goals: player.statistics[0].goals.total,
    shots: player.statistics[0].shots.total,
    onTarget: player.statistics[0].shots.on,
    assists: player.statistics[0].goals.assists,
    penalties: player.statistics[0].penalty.scored,
    appearances: player.statistics[0].games.appearences,
    minutes: player.statistics[0].games.minutes,
  };

  // create player card wrapper div
  const playerCardWrapper = document.createElement("div");
  playerCardWrapper.classList.add("player-card-wrapper");
  playerCardWrapper.setAttribute("id", `${data.rank}`);

  // create player card div
  const playerCard = document.createElement("div");
  playerCard.classList.add("player-card");

  // create card top div
  const cardTop = document.createElement("div");
  cardTop.classList.add("card-top");

  // create card top left div
  const cardTopLeft = document.createElement("div");
  cardTopLeft.classList.add("card-top-left");

  // create img-wrapper div
  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("img-wrapper");
  const playerImg = document.createElement("img");
  playerImg.setAttribute("src", `${data.photo}`);
  playerImg.setAttribute("alt", `${data.name}`);

  // append img div to img-wrapper
  imgWrapper.appendChild(playerImg);

  // create card top left text
  const topLeftText = document.createElement("div");
  topLeftText.classList.add("top-left-text");

  // create h4 for firstname
  // create h4 for middle & lastname
  const playerFirst = document.createElement("h4");
  playerFirst.textContent = data.name;

  // const playerLast = document.createElement("h4");
  // playerLast.textContent = data.lastname;

  // create team-age div
  const teamAge = document.createElement("div");
  teamAge.classList.add("team-age");

  // create h5
  // create em for team name
  // append em to h5
  // create h5 for age
  // append both h5's to team-age div
  const team = document.createElement("h5");
  const italicizedName = document.createElement("em");
  italicizedName.textContent = data.teamName;
  team.appendChild(italicizedName);

  const age = document.createElement("h5");
  age.textContent = `Age: ${data.age}`;

  teamAge.appendChild(team);
  teamAge.appendChild(age);

  // append both h4's and team-age to top-left-text div
  topLeftText.appendChild(playerFirst);
  // topLeftText.appendChild(playerLast);
  topLeftText.appendChild(teamAge);

  // append img-wrapper and top-left-text to top left div
  cardTopLeft.appendChild(imgWrapper);
  cardTopLeft.appendChild(topLeftText);

  // create card top right div
  const cardTopRight = document.createElement("div");
  cardTopRight.classList.add("card-top-right");

  const seasonH5 = document.createElement("h5");
  const seasonH5Span = document.createElement("span");
  seasonH5Span.textContent = data.season;
  seasonH5.appendChild(seasonH5Span);

  const rankH5 = document.createElement("h5");
  const rankH5Span = document.createElement("span");
  rankH5Span.textContent = `Rank: ${data.rank}`;
  rankH5.appendChild(rankH5Span);

  const goalsH5 = document.createElement("h5");
  const goalsH5Span = document.createElement("span");
  goalsH5Span.textContent = `Goals: ${data.goals}`;
  goalsH5.appendChild(goalsH5Span);

  cardTopRight.appendChild(seasonH5);
  cardTopRight.appendChild(rankH5);
  cardTopRight.appendChild(goalsH5);

  // append top left and top right div's to card top div
  cardTop.appendChild(cardTopLeft);
  cardTop.appendChild(cardTopRight);

  // create card-btm div
  const cardBtm = document.createElement("div");
  cardBtm.classList.add("card-btm");

  // create card-btm-left div
  const cardBtmLeft = document.createElement("div");
  cardBtmLeft.classList.add("card-btm-left");

  // create img-wrapper div
  const teamImgWrapper = document.createElement("div");
  teamImgWrapper.classList.add("img-wrapper");
  const teamImg = document.createElement("img");
  teamImg.setAttribute("src", `${data.teamLogo}`);
  teamImg.setAttribute("alt", `${data.teamName}`);

  // append img div to img-wrapper
  teamImgWrapper.appendChild(teamImg);
  cardBtmLeft.appendChild(teamImgWrapper);

  // create card-btm-right div
  const cardBtmRight = document.createElement("div");
  cardBtmRight.classList.add("card-btm-right");

  const shotsH5 = createH5CardBtm("Shots: ", data.shots);
  const onTargetH5 = createH5CardBtm("On target: ", data.onTarget);
  const assistsH5 = createH5CardBtm("Assists: ", data.assists);
  const penaltiesH5 = createH5CardBtm("Penalties: ", data.penalties);
  const appearancesH5 = createH5CardBtm("Appearances: ", data.appearances);
  const minutesH5 = createH5CardBtm("Minutes: ", data.minutes);

  // append h5's to card-btm-right
  cardBtmRight.appendChild(shotsH5);
  cardBtmRight.appendChild(onTargetH5);
  cardBtmRight.appendChild(assistsH5);
  cardBtmRight.appendChild(penaltiesH5);
  cardBtmRight.appendChild(appearancesH5);
  cardBtmRight.appendChild(minutesH5);

  // append card-btm-left and card-btm-right to card-btm
  cardBtm.appendChild(cardBtmLeft);
  cardBtm.appendChild(cardBtmRight);
  // append card-top and card-btm to card
  playerCard.appendChild(cardTop);
  playerCard.appendChild(cardBtm);

  // create button, add attributes
  const addToFavBtn = document.createElement("button");
  addToFavBtn.classList.add("btn", "add-fav-btn");
  addToFavBtn.dataset.player = data.id;
  addToFavBtn.textContent = "Favorite ";
  const plusIcon = document.createElement("i");
  plusIcon.classList.add("fas", "fa-plus");
  addToFavBtn.appendChild(plusIcon);

  // append card and button to card wrapper
  playerCardWrapper.appendChild(playerCard);
  playerCardWrapper.appendChild(addToFavBtn);

  return playerCardWrapper;
};

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

const sortPlayerCards = (direction) => {
  const parentContainer = document.querySelector(".player-cards");
  const arrayOfItems = Array.from(allPlayerCards);

  const sortDesc = (a, b) => {
    const firstElId = parseInt(a.id);
    const secondElId = parseInt(b.id);

    if (firstElId < secondElId) {
      return 1;
    } else if (firstElId > secondElId) {
      return -1;
    } else {
      return 0;
    }
  };
  const sortAsc = (a, b) => {
    const firstElId = parseInt(a.id);
    const secondElId = parseInt(b.id);
    if (firstElId > secondElId) {
      return 1;
    } else if (firstElId < secondElId) {
      return -1;
    } else {
      return 0;
    }
  };

  if (direction === "desc") {
    arrayOfItems.sort(sortDesc);
  } else {
    arrayOfItems.sort(sortAsc);
  }

  arrayOfItems.forEach((item) => {
    parentContainer.appendChild(item);
  });
};

sortBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const direction = btn.dataset.sort;

    sortPlayerCards(direction);
  });
});
