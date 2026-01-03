// DOM Elements
const inputTemp = document.getElementById("inputTemp");
const outputTemp = document.getElementById("outputTemp");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const buttons = document.querySelectorAll(".keypad button");
const factText = document.getElementById("factText");
const dynamicText = document.getElementById("dynamicText");

// --- Temperature Conversion ---
buttons.forEach(btn => btn.addEventListener("click", () => handleInput(btn.textContent)));
inputTemp.addEventListener("input", convertTemperature);
fromUnit.addEventListener("change", convertTemperature);
toUnit.addEventListener("change", convertTemperature);

function handleInput(value) {
  if (value === "C") inputTemp.value = "0";
  else if (value === "←") inputTemp.value = inputTemp.value.slice(0, -1) || "0";
  else inputTemp.value = inputTemp.value === "0" ? value : inputTemp.value + value;
  convertTemperature();
}

function convertTemperature() {
  const value = parseFloat(inputTemp.value);
  if (isNaN(value)) return (outputTemp.value = "");
  let result =
    fromUnit.value === "C" && toUnit.value === "F"
      ? (value * 9) / 5 + 32
      : fromUnit.value === "F" && toUnit.value === "C"
      ? ((value - 32) * 5) / 9
      : value;
  outputTemp.value = result.toFixed(2);
}

// --- Typing Animation for Subtitle ---
const texts = [
  "Instant temperature conversion with AI-powered facts.",
  "Fast, simple, and accurate conversions.",
];
let textIndex = 0, charIndex = 0;
function typeWriter() {
  if (charIndex < texts[textIndex].length) {
    dynamicText.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 60);
  } else {
    setTimeout(() => {
      dynamicText.textContent = "";
      charIndex = 0;
      textIndex = (textIndex + 1) % texts.length;
      typeWriter();
    }, 2200);
  }
}
typeWriter();

// --- Random Facts Fetch ---
async function getFact() {
  try {
    const res = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
    const data = await res.json();
    factText.textContent = data.text;
  } catch {
    const fallbackFacts = [
      "Water freezes at 0°C and boils at 100°C.",
      "The Fahrenheit scale was proposed in 1724.",
      "Absolute zero is -273.15°C, the coldest possible temperature.",
      "Temperature affects how fast sound travels."
    ];
    factText.textContent = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
  }
}
getFact();
setInterval(getFact, 10000); // new fact every 10 seconds
