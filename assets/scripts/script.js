const app = (() => {
  const state = {
    playerOneScore: 0,
    playerTwoScore: 0,
    maxScore: 5,
    isOver: false
  };

  const reset = () => {
    state.playerOneScore = 0;
    state.playerTwoScore = 0;
    state.isOver = false;
  };

  const render = () => {
    document.querySelector(".max-score").textContent = state.maxScore;
    document.querySelector(".score__player-one").textContent =
      state.playerOneScore;
    document.querySelector(".score__player-two").textContent =
      state.playerTwoScore;
    if (state.isOver) {
      if (state.playerOneScore > state.playerTwoScore) {
        document.querySelector(".score__player-one").style.color = "green";
      } else {
        document.querySelector(".score__player-two").style.color = "green";
      }
    } else {
      document.querySelector(".score__player-one").style.color = "black";
      document.querySelector(".score__player-two").style.color = "black";
    }
  };

  const checkIfOver = () => {
    if (
      state.playerOneScore >= state.maxScore ||
      state.playerTwoScore >= state.maxScore
    ) {
      state.isOver = true;
    }
  };

  const listeners = () => {
    document.body.addEventListener("click", e => {
      if (!state.isOver) {
        if (e.target.classList.contains("button__player-one")) {
          state.playerOneScore++;
        } else if (e.target.classList.contains("button__player-two")) {
          state.playerTwoScore++;
        }
        checkIfOver();
      }
      if (e.target.classList.contains("reset")) {
        reset();
      }
      render();
    });

    document
      .querySelector(".max-score__input")
      .addEventListener("input", function() {
        state.maxScore = this.value;
        reset();
        render();
      });
  };

  const init = () => {
    listeners();
  };

  return {
    init
  };
})();

app.init();
