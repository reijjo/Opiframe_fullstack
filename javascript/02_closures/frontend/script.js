window.onload = function () {
  fontSizer = changeFontSize();

  const biggerButton = document.getElementById("bigger");
  biggerButton.onclick = fontSizer.bigger;
  const smallerButton = document.getElementById("smaller");
  smallerButton.onclick = fontSizer.smaller;
};

// Change font size
const changeFontSize = function () {
  let fontSize = 16;
  document.body.style.fontSize = fontSize + "px";

  function changeSize(val) {
    fontSize += val;
    document.body.style.fontSize = fontSize + "px";
  }

  return {
    bigger: function () {
      changeSize(2);
    },
    smaller: function () {
      changeSize(-2);
    },
  };
};

// Start
const makeCounter = function () {
  let privateCounter = 0;

  function changeByVal(val) {
    privateCounter += val;
  }

  return {
    increment: function () {
      changeByVal(1);
    },
    decrement: function () {
      changeByVal(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
};

function start() {
  let counter1 = makeCounter();
  let counter2 = makeCounter();

  console.log("Counter 1 value", counter1.value());
  console.log("Counter 2 value", counter2.value());

  counter1.increment();
  counter1.increment();
  counter1.increment();

  console.log("Counter 1 value", counter1.value());
  console.log("Counter 2 value", counter2.value());

  counter2.decrement();
  counter2.decrement();
  counter2.decrement();

  console.log("Counter 1 value", counter1.value());
  console.log("Counter 2 value", counter2.value());
}
