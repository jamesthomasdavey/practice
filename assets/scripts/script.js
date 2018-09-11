const app = (() => {
  const squareDivs = document.querySelectorAll(".square");
  const rgbWinningColorSpan = document.querySelector("#rgb__winning-color");
  const difficultyForm = document.querySelector("#difficulty");
  const resetButton = document.querySelector("#reset");
  const messageSpan = document.querySelector("#message");

  const state = {
    colors: null,
    winningColor: null,
    isOver: false,
    isHard: true
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 256);
  };

  const getRandomColor = () => {
    return `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
  };

  const assignColors = () => {
    let numberOfColors = state.isHard ? 6 : 3;
    state.colors = Array(numberOfColors)
      .fill("")
      .map(() => getRandomColor());
  };

  const assignWinningColor = () => {
    state.winningColor =
      state.colors[Math.floor(Math.random() * state.colors.length)];
  };

  const win = () => {
    squareDivs.forEach((squareDiv, index) => {
      setTimeout(() => {
        squareDiv.style.backgroundColor = state.winningColor;
      }, index * 50);
    });
    document.querySelector("#heading").style.background = state.winningColor;
    resetButton.style.color = state.winningColor;
    messageSpan.textContent = "Correct!";
    messageSpan.style.color = state.winningColor;
    document.querySelector("input + label").style.color = state.winningColor;
    document.querySelector("input:checked + label").style.background =
      state.winningColor;
    document.querySelector("input:checked + label").style.color = "white";
    state.isOver = true;
  };

  const checkColor = e => {
    if (e.target.style.backgroundColor === state.winningColor) {
      win();
    } else {
      e.target.style.backgroundColor = "transparent";
      messageSpan.textContent = "Try Again";
    }
  };

  const listeners = () => {
    squareDivs.forEach(squareDiv => {
      squareDiv.addEventListener("click", e => {
        if (!state.isOver) {
          checkColor(e);
        }
      });
    });

    difficultyForm.addEventListener("change", () => {
      state.isHard = !state.isHard;
      render();
    });

    resetButton.addEventListener("click", render);
  };

  const render = () => {
    messageSpan.textContent = "";
    state.isOver = false;
    assignColors();
    assignWinningColor();
    rgbWinningColorSpan.textContent = state.winningColor.toUpperCase();
    squareDivs.forEach((squareDiv, index) => {
      setTimeout(() => {
        squareDiv.style.backgroundColor = state.colors[index];
        squareDiv.style.display = "block";
      }, index * 50);
      if (!state.isHard && index > 2) {
        squareDiv.style.backgroundColor = "transparent";
        squareDiv.style.display = "none";
      }
    });
  };

  const init = () => {
    render();
    listeners();
  };

  return {
    init
  };
})();

app.init();
