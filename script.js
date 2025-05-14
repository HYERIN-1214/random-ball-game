let names = [];
let positions = [];
let speeds = [];
let obstacles = [];
let isRunning = false;

function addName() {
    const nameInput = document.getElementById("name-input");
    const name = nameInput.value.trim();
    if (name !== "" && !names.includes(name)) {
        names.push(name);
        positions.push(0);
        speeds.push(2 + Math.random() * 3);
        const nameList = document.getElementById("name-list");
        const li = document.createElement("li");
        li.textContent = name;
        nameList.appendChild(li);
        nameInput.value = "";
    }
}

function generateObstacles() {
    const obs = [];
    for (let i = 0; i < 10; i++) {
        obs.push({
            left: Math.random() * 90 + '%',
            size: Math.random() * 40 + 20,
            speed: Math.random() * 3 + 2,
        });
    }
    return obs;
}

function startRace() {
    if (names.length === 0 || isRunning) return;
    
    obstacles = generateObstacles();
    isRunning = true;
    updateRace();
}

function updateRace() {
    if (!isRunning) return;

    const track = document.querySelector(".race-track");
    track.innerHTML = "";

    names.forEach((name, index) => {
        // Move the balls
        const speedChange = Math.random() > 0.7 ? (Math.random() * 4 - 2) : 0;
        positions[index] += speeds[index] + speedChange;
        
        if (positions[index] >= 700) {
            isRunning = false;
            alert(`🏆 ${name}가 커피 당첨입니다!`);
            return;
        }

        // Create ball
        const ball = document.createElement("div");
        ball.className = "ball";
        ball.style.top = `${positions[index]}px`;
        ball.style.left = `${(index + 1) * (90 / (names.length + 1))}%`;
        ball.textContent = name;
        track.appendChild(ball);
    });

    // Create obstacles
    obstacles.forEach(obstacle => {
        const obs = document.createElement("div");
        obs.className = "obstacle";
        obs.style.width = `${obstacle.size}px`;
        obs.style.height = `${obstacle.size}px`;
        obs.style.left = obstacle.left;
        obs.style.top = `${Math.random() * 700}px`;
        track.appendChild(obs);
    });

    // Continue the race
    requestAnimationFrame(updateRace);
}
