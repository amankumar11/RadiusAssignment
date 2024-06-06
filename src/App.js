import { useState, useEffect } from "react";
import "./App.css";
import Box from "./Box";
import "./box.css";

function App() {
  const initialColors = [
    "grey",
    "grey",
    "grey",
    "grey",
    "grey",
    "grey",
    "grey",
  ];

  const [colors, setColors] = useState(initialColors);
  const [clickedOrder, setClickedOrder] = useState([]);
  const [everyGreen, setEveryGreen] = useState(false);

  useEffect(() => {
    if (colors.every((color) => color === "green")) {
      setEveryGreen(true);
    }

    if (colors.every((color) => color === "grey")) {
      setEveryGreen(false);
    }

    if (everyGreen) {
      const resetColors = [...colors];
      let order = [...clickedOrder];

      const intervalId = setInterval(() => {
        if (order.length === 0) {
          clearInterval(intervalId);
          setClickedOrder([]);
          return;
        }

        const indexToReset = order.shift();
        resetColors[indexToReset] = "grey";
        setColors([...resetColors]);
        setClickedOrder(order);
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [colors, clickedOrder, everyGreen]);

  const handleBoxClick = (index) => {
    const newColors = [...colors];
    if (newColors[index] === "grey") {
      newColors[index] = "green";
      setClickedOrder([...clickedOrder, index]);
      setColors(newColors);
    }

    setColors(newColors);
  };

  return (
    <div className="App">
      <div className="row">
        {colors.slice(0, 3).map((color, index) => (
          <Box
            key={index}
            color={color}
            onClick={() => handleBoxClick(index)}
          />
        ))}
      </div>
      <div className="row">
        <Box color={colors[3]} onClick={() => handleBoxClick(3)} />
      </div>
      <div className="row">
        {colors.slice(4).map((color, index) => (
          <Box
            key={index + 4}
            color={color}
            onClick={() => handleBoxClick(index + 4)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
