let yek = "2a7a383dd204nsj38af21pcbfba9e3acedc4bhsmc2f1e804b9";
const racecar = (str) => {
  let result = [];
  for (let i = str.length; i >= 0; i--) {
    result.push(str[i]);
  }
  return (yek = result.join(""));
};
racecar(yek);

const queryUrl =
  "https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=39&season=";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": yek,
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
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

const createSeasonString = (yearString) => {
  const nextYear = parseInt(`${yearString[2]}${yearString[3]}`) + 1;

  return `${yearString}-${nextYear.toString()}`;
};

const state = {
  collection: [],
};

const goBtn = document.querySelector(".go-btn");
const playerCards = document.querySelector(".player-cards");
const favCards = document.querySelector(".favorites");
const pageSeasonH3 = document.querySelector(".page-season");
const pageGoalsH3 = document.querySelector(".page-goals");
const pageMinutesH3 = document.querySelector(".page-minutes");

let pageSeasonString = "";
const initializeState = (array) => {
  for (let i = 0; i < array.length; i++) {
    const player = {
      id: array[i].player.id,
      name: array[i].player.name,
      firstname: array[i].player.firstname,
      lastname: array[i].player.lastname,
      age: array[i].player.age,
      photo: array[i].player.photo,
      teamName: array[i].statistics[0].team.name,
      teamLogo: array[i].statistics[0].team.logo,
      season: createSeasonString(
        array[i].statistics[0].league.season.toString()
      ),
      rank: i + 1,
      goals: array[i].statistics[0].goals.total,
      shots: array[i].statistics[0].shots.total,
      onTarget: array[i].statistics[0].shots.on,
      assists: array[i].statistics[0].goals.assists,
      penalties: array[i].statistics[0].penalty.scored,
      appearances: array[i].statistics[0].games.appearences,
      minutes: array[i].statistics[0].games.minutes,
    };
    state.collection.push(player);
  }
};

const setPageSeasonString = (array) => {
  return (pageSeasonString = createSeasonString(
    array[0].statistics[0].league.season.toString()
  ));
};

const generateAllPlayerCards = (array) => {
  playerCards.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    playerCards.appendChild(createPlayerCard(array[i]));
  }
};

const findPlayer = (array, id) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) {
      return array[i];
    }
  }
  return false;
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

const createPlayerCard = (player) => {
  // create player card wrapper div
  const playerCardWrapper = document.createElement("div");
  playerCardWrapper.classList.add("player-card-wrapper");
  playerCardWrapper.setAttribute("id", `${player.id}`);
  playerCardWrapper.dataset.rank = player.rank;

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
  playerImg.setAttribute("src", `${player.photo}`);
  playerImg.setAttribute("alt", `${player.name}`);

  // append img div to img-wrapper
  imgWrapper.appendChild(playerImg);

  // create card top left text
  const topLeftText = document.createElement("div");
  topLeftText.classList.add("top-left-text");

  // create h4 for name
  const playerFirst = document.createElement("h4");
  playerFirst.textContent = player.name;

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
  italicizedName.textContent = player.teamName;
  team.appendChild(italicizedName);

  const age = document.createElement("h5");
  age.textContent = `Age: ${player.age}`;

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
  seasonH5Span.textContent = player.season;
  seasonH5.appendChild(seasonH5Span);

  const rankH5 = document.createElement("h5");
  const rankH5Span = document.createElement("span");
  rankH5Span.textContent = `Rank: ${player.rank}`;
  rankH5.appendChild(rankH5Span);

  const goalsH5 = document.createElement("h5");
  const goalsH5Span = document.createElement("span");
  goalsH5Span.textContent = `Goals: ${player.goals}`;
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
  teamImg.setAttribute("src", `${player.teamLogo}`);
  teamImg.setAttribute("alt", `${player.teamName}`);

  // append img div to img-wrapper
  teamImgWrapper.appendChild(teamImg);
  cardBtmLeft.appendChild(teamImgWrapper);

  // create card-btm-right div
  const cardBtmRight = document.createElement("div");
  cardBtmRight.classList.add("card-btm-right");

  const shotsH5 = createH5CardBtm("Shots: ", player.shots);
  const onTargetH5 = createH5CardBtm("On target: ", player.onTarget);
  const assistsH5 = createH5CardBtm("Assists: ", player.assists);
  const penaltiesH5 = createH5CardBtm("Penalties: ", player.penalties);
  const appearancesH5 = createH5CardBtm("Appearances: ", player.appearances);
  const minutesH5 = createH5CardBtm("Minutes: ", player.minutes);

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
  addToFavBtn.dataset.player = player.id;
  addToFavBtn.textContent = "Favorite ";
  const plusIcon = document.createElement("i");
  plusIcon.classList.add("fas", "fa-plus");
  addToFavBtn.appendChild(plusIcon);

  // append card and button to card wrapper
  playerCardWrapper.appendChild(playerCard);
  playerCardWrapper.appendChild(addToFavBtn);

  return playerCardWrapper;
};

const createStatH6 = (title, value) => {
  const favStat = document.createElement("div");
  favStat.classList.add("fav-stat");

  const titleH6 = document.createElement("h6");
  titleH6.classList.add("stat-title");
  titleH6.textContent = title;

  const valueH6 = document.createElement("h6");
  valueH6.textContent = value;

  favStat.appendChild(titleH6);
  favStat.appendChild(valueH6);

  return favStat;
};

const createFavCard = (player) => {
  const favCard = document.createElement("div");
  favCard.classList.add("fav-card");
  favCard.dataset.playerId = player.id;

  const favCardTop = document.createElement("div");
  favCardTop.classList.add("fav-card-top");

  const timesIcon = document.createElement("i");
  timesIcon.classList.add("fas", "fa-times");

  const favImgWrapper = document.createElement("div");
  favImgWrapper.classList.add("img-wrapper");

  const playerImg = document.createElement("img");
  playerImg.setAttribute("src", `${player.photo}`);
  playerImg.setAttribute("alt", `${player.name}`);

  favImgWrapper.appendChild(playerImg);

  const playerName = document.createElement("h4");
  playerName.textContent = player.name;

  favCardTop.appendChild(timesIcon);
  favCardTop.appendChild(favImgWrapper);
  favCardTop.appendChild(playerName);

  const horizRule = document.createElement("hr");

  const favCardBtm = document.createElement("div");
  favCardBtm.classList.add("fav-card-btm");

  const seasonStat = createStatH6("Season", player.season);
  const goalsStat = createStatH6("Goals", player.goals);
  const rankStat = createStatH6("Rank", player.rank);

  favCardBtm.appendChild(seasonStat);
  favCardBtm.appendChild(goalsStat);
  favCardBtm.appendChild(rankStat);

  // appending

  favCard.appendChild(favCardTop);
  favCard.appendChild(horizRule);
  favCard.appendChild(favCardBtm);

  return favCard;
};

const rmFromCollection = (id) => {
  const player = state.collection.findIndex((player) => player.id == id);
  return state.collection.splice(player, 1);
};

let allPlayerCards = document.querySelectorAll(".player-card-wrapper");
const sortBtn = document.querySelectorAll(".sort-btn");
const favButton = document.querySelectorAll(".add-fav-btn");

const sortPlayerCards = (direction) => {
  const parentContainer = document.querySelector(".player-cards");
  const arrayOfItems = Array.from(allPlayerCards);

  const sortDesc = (a, b) => {
    const firstElRank = parseInt(a.dataset.rank);
    const secondElRank = parseInt(b.dataset.rank);

    if (firstElRank < secondElRank) {
      return 1;
    } else if (firstElRank > secondElRank) {
      return -1;
    } else {
      return 0;
    }
  };
  const sortAsc = (a, b) => {
    const firstElRank = parseInt(a.dataset.rank);
    const secondElRank = parseInt(b.dataset.rank);
    if (firstElRank > secondElRank) {
      return 1;
    } else if (firstElRank < secondElRank) {
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
  btn.addEventListener("click", (e) => {
    const direction = btn.dataset.sort;

    sortPlayerCards(direction);
  });
});

document.body.addEventListener("click", async (e) => {
  if (
    e.target.classList[1] === "add-fav-btn" ||
    e.target.classList[1] === "fa-plus"
  ) {
    let playerId = "0";
    let topEl = "";
    if (e.target.classList[0] === "fas") {
      playerId = e.target.parentElement.parentElement.id;
      topEl = e.target.parentElement.parentElement;
    } else {
      playerId = e.target.parentElement.id;
      topEl = e.target.parentElement;
    }
    const player = await findPlayer(state.collection, playerId);
    const newCard = createFavCard(player);

    favCards.appendChild(newCard);
    playerCards.removeChild(document.getElementById(playerId));
    allPlayerCards = document.querySelectorAll(".player-card-wrapper");
  }
});

// click listener for times icon:
document.body.addEventListener("click", async (e) => {
  if (e.target.classList[1] === "fa-times") {
    const playerId = e.target.parentElement.parentElement.dataset.playerId;

    const player = await findPlayer(state.collection, playerId);

    playerCards.appendChild(createPlayerCard(player));
    allPlayerCards = document.querySelectorAll(".player-card-wrapper");

    favCards.removeChild(
      document.querySelector(`[data-player-id="${playerId}"]`)
    );
  }
});

const makeAPICall = async (url, season, options) => {
  try {
    const response = await fetch(`${url}${season}`, options);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

const resetFavorites = () => {
  while (favCards.childNodes.length > 2) {
    favCards.removeChild(favCards.lastChild);
  }
};

const resetPlayerCards = () => {
  while (playerCards.firstChild) {
    playerCards.removeChild(playerCards.lastChild);
  }
};

goBtn.addEventListener("click", async (e) => {
  const season = e.target.previousElementSibling.value;

  const data = await makeAPICall(queryUrl, season, options);

  state.collection = [];
  await initializeState(data.response);

  resetPlayerCards();
  resetFavorites();

  pageSeasonH3.textContent = setPageSeasonString(data.response);
  pageGoalsH3.textContent = getTotalGoals(data.response);
  pageMinutesH3.textContent = getTotalMinutes(data.response);

  // create player cards
  await generateAllPlayerCards(state.collection);
  allPlayerCards = document.querySelectorAll(".player-card-wrapper");
});
