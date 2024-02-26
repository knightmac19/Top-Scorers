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
    const firstElRank = parseInt(a.id);
    const secondElRank = parseInt(b.id);
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
