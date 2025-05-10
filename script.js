const tg = window.Telegram.WebApp;
tg.expand();

let currentScene = "start";
let scenes = {};

fetch("scenes.json")
  .then(response => response.json())
  .then(data => {
    scenes = data;
    renderScene(currentScene);
  });

function renderScene(name) {
  const scene = scenes[name];
  if (!scene) return;

  document.getElementById("scene-img").src = scene.image;
  document.getElementById("scene-text").textContent = scene.text;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";
  scene.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => {
      currentScene = choice.next;
      renderScene(currentScene);
    };
    choicesDiv.appendChild(btn);
  });
}
