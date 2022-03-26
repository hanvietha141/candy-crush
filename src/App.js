import { useEffect, useState } from "react";
// import {imgSrc} from './img'
import "./App.scss";

import BlueCandy from './img/blue-candy.png'
import GreenCandy from './img/green-candy.png'
import OrangeCandy from './img/orange-candy.png'
import PurpleCandy from './img/purple-candy.png'
import RedCandy from './img/red-candy.png'
import YellowCandy from './img/yellow-candy.png'
import BlankCandy from './img/blank.png'

const width = 8;
const candyColors = [BlueCandy, GreenCandy, OrangeCandy, PurpleCandy, RedCandy, YellowCandy];

function App() {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [rowIndexIgnor, setRowIndexIgnor] = useState([]);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < Math.pow(width, 2); i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  const checkForCollumOf3 = () => {
    for (let i = 0; i < width * width - 2 * width - 1; i++) {
      const collumOf3 = [i, i + width, i + width + width];
      const decidedColor = currentColorArrangement[i];
      if (
        collumOf3.every(
          (candy) => currentColorArrangement[candy] === decidedColor
        )
      ) {
        collumOf3.forEach((candy) => (currentColorArrangement[candy] = BlankCandy));
        return true;
      }
    }
  };

  const checkForCollumOf4 = () => {
    for (let i = 0; i < width * width - 2 * width - 1; i++) {
      const collumOf4 = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      if (
        collumOf4.every(
          (candy) => currentColorArrangement[candy] === decidedColor
        )
      ) {
        collumOf4.forEach((candy) => (currentColorArrangement[candy] = BlankCandy));
      }
    }
  };

  const checkForCollumOf5 = () => {
    for (let i = 0; i < width * width - 2 * width - 1; i++) {
      const collumOf5 = [
        i,
        i + width,
        i + width * 2,
        i + width * 3,
        i + width * 4,
      ];
      const decidedColor = currentColorArrangement[i];
      if (
        collumOf5.every(
          (candy) => currentColorArrangement[candy] === decidedColor
        )
      ) {
        collumOf5.forEach((candy) => (currentColorArrangement[candy] = BlankCandy));
      }
    }
  };

  const indexIgnor = () => {
    const ignorArray = [];
    for (let i = width - 2; i <= width * width; i += 8) {
      ignorArray.push(i, i + 1);
    }
    setRowIndexIgnor(ignorArray);
  };

  const checkForRowOf3 = () => {
    for (let i = 0; i < width * width; i++) {
      const RowOf3 = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      if (rowIndexIgnor.includes(i)) continue;
      if (
        RowOf3.every((candy) => currentColorArrangement[candy] === decidedColor)
      ) {
        RowOf3.forEach((candy) => (currentColorArrangement[candy] = BlankCandy));
      }
    }
  };

  const checkForRowOf4 = () => {
    for (let i = 0; i < width * width; i++) {
      const RowOf4 = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      if (rowIndexIgnor.includes(i)) continue;
      if (
        RowOf4.every((candy) => currentColorArrangement[candy] === decidedColor)
      ) {
        RowOf4.forEach((candy) => (currentColorArrangement[candy] = BlankCandy));
      }
    }
  };

  const checkForRowOf5 = () => {
    for (let i = 0; i < width * width; i++) {
      const RowOf5 = [i, i + 1, i + 2, i + 3, i + 4];
      const decidedColor = currentColorArrangement[i];
      if (rowIndexIgnor.includes(i)) continue;
      if (
        RowOf5.every((candy) => currentColorArrangement[candy] === decidedColor)
      ) {
        RowOf5.forEach((candy) => (currentColorArrangement[candy] = BlankCandy));
      }
    }
  };

  const firstRow = [];
  for (let i = 0; i < width; i++) {
    firstRow.push(i);
  }

  const dropDown = () => {
    for (let i = 0; i < width * width; i++) {
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && currentColorArrangement[i] === BlankCandy) {
        currentColorArrangement[i] =
          candyColors[Math.floor(Math.random() * candyColors.length)];
      }

      if (currentColorArrangement[i + width] === BlankCandy) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = BlankCandy;
      }
    }
  };

  useEffect(() => {
    createBoard();
    indexIgnor();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForCollumOf5();
      checkForCollumOf4();
      checkForCollumOf3();
      checkForRowOf5();
      checkForRowOf4();
      checkForRowOf3();
      dropDown();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 750);
    return () => clearInterval(timer);
  }, [
    checkForCollumOf3,
    checkForCollumOf4,
    checkForCollumOf5,
    checkForRowOf3,
    checkForRowOf4,
    checkForRowOf5,
    currentColorArrangement,
  ]);

  const getChoices = (e) => {
    if (choice1) {
      setChoice2(e.target.name);
    } else {
      setChoice1(e.target.name);
    }
  };

  const isNearby = () => {
    if (
      choice1 + 1 == choice2 ||
      choice1 - 1 == choice2 ||
      choice1 + width == choice2 ||
      choice1 - width == choice2 ||
      choice2 + 1 == choice1 ||
      choice2 - 1 == choice1 ||
      choice2 + width == choice1 ||
      choice2 - width == choice1
    ) {
      return true;
    } else {
      setChoice1(null);
      setChoice2(null);
      return false;
    }
  };

  const moveCandy = () => {
    if ((choice1, choice2)) {
      let temp = currentColorArrangement[choice1];
      currentColorArrangement[choice1] = currentColorArrangement[choice2];
      currentColorArrangement[choice2] = temp;
      setCurrentColorArrangement([...currentColorArrangement]);
      if (
        checkForCollumOf3() ||
        checkForCollumOf4() ||
        checkForCollumOf5() ||
        checkForRowOf3() ||
        checkForRowOf4() ||
        checkForRowOf5()
      ) {
      } else {
        setTimeout(() => {
          temp = currentColorArrangement[choice1];
          currentColorArrangement[choice1] = currentColorArrangement[choice2];
          currentColorArrangement[choice2] = temp;
          setCurrentColorArrangement([...currentColorArrangement]);
        }, 750);
      }
      setTimeout(() => {
        setChoice1(null);
        setChoice2(null);
      }, 150);
    }
  };

  useEffect(() => {
    if ((choice1, choice2)) {
      if (isNearby()) {
        moveCandy();
      }
    }
    checkForCollumOf5();
    checkForCollumOf4();
    checkForCollumOf3();
    checkForRowOf5();
    checkForRowOf4();
    checkForRowOf3();
    dropDown();
  }, [choice1, choice2]);

  return (
    <div className="App">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => {
          return (
            <img
              onClick={getChoices}
              key={index}
              name={index}
              // style={{ background: candyColor }}
              src={candyColor}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
