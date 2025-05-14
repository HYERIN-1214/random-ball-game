const app = document.getElementById("root");

app.innerHTML = `
    <h1>🚀 오늘의 커피는?</h1>
    <div class="container">
        <input type="text" id="nameInput" placeholder="팀원 이름 입력" />
        <button onclick="addName()">Add</button>
        <ul id="nameList"></ul>
        <button onclick="startRace()">Start Race</button>
        <div class="race-track" id="track"></div>
        <div id="winner" style="display: none; font-size: 2em; margin-top: 20px;"></div>
    </div>
`;

let names = [];
let positions = [];
let speeds = [];
let obstacles = [];

function addName() {
    const nameInput = document.getElementById("nameInput");
    const name = nameInput.value.trim();
    if (name) {
        names.push(name);
        const listItem = document.createElement("li");
        listItem.textContent = name;
        document.getElementById("nameList").appendChild(listItem);
        nameInput.value = "";
    }
}

function startRace() {
    const track = document.getElementById("track");
    track.innerHTML = "";
    positions = Array(names.length).fill(0);
    speeds = Array(names.length).map(() => 2 + Math.random() * 3);
    obstacles = generateObstacles();

    names.forEach((name, index) => {
        const ball = document.createElement("div");
        ball.className = "ball";
        ball.textContent = name;
        ball.style.left = `${(index + 1) * (90 / (names.length + 1))}%`;
        ball.style.top = "0%";
        track.appendChild(ball);
    });

    obstacles.forEach((obstacle) => {
        const obs = document.createElement("div");
        obs.className = "obstacle";
        obs.style.width = `${obstacle.size}px`;
        obs.style.height = `${obstacle.size}px`;
        obs.style.left = obstacle.left;
        obs.style.top = "-100px";
        track.appendChild(obs);
        moveObstacle(obs, obstacle.speed);
    });

    requestAnimationFrame(updatePositions);
}

function generateObstacles() {
    const obs = [];
    for (let i = 0; i < 15; i++) {
        obs.push({
            left: Math.random() * 100 + "%",
            size: Math.random() * 40 + 20,
            speed: Math.random() * 3 + 2,
        });
    }
    return obs;
}

function moveObstacle(obs, speed) {
    let pos = -100;
    function animate() {
        pos += speed;
        obs.style.top = `${pos}px`;
        if (pos < window.innerHeight) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

function updatePositions() {
    const track = document.getElementById("track");
    const balls = track.getElementsByClassName("ball");

    Array.from(balls).forEach((ball, index) => {
        positions[index] += speeds[index];
        ball.style.top = `${positions[index]}px`;

        if (positions[index] > track.clientHeight - 50) {
            declareWinner(names[index]);
        }
    });

    if (!document.getElementById("winner").textContent) {
        requestAnimationFrame(updatePositions);
    }
}

function declareWinner(winner) {
    const winnerDiv = document.getElementById("winner");
    winnerDiv.textContent = `🏆 ${winner}가 커피 당첨!`;
    winnerDiv.style.display = "block";
}
