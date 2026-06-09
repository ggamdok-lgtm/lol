/* ================================= */
/* DOM */
/* ================================= */

const setupPage =
document.getElementById(
    "setupPage"
);

const revealPage =
document.getElementById(
    "revealPage"
);

const finalPage =
document.getElementById(
    "finalPage"
);

const playerInputs =
document.getElementById(
    "playerInputs"
);

const startBtn =
document.getElementById(
    "startBtn"
);

const restartBtn =
document.getElementById(
    "restartBtn"
);

const allowDuplicate =
document.getElementById(
    "allowDuplicate"
);

const currentPlayerIndex =
document.getElementById(
    "currentPlayerIndex"
);

const revealPlayerName =
document.getElementById(
    "revealPlayerName"
);

const countdown =
document.getElementById(
    "countdown"
);

const championRevealArea =
document.getElementById(
    "championRevealArea"
);

const revealMessage =
document.getElementById(
    "revealMessage"
);

const finalResultContainer =
document.getElementById(
    "finalResultContainer"
);

/* ================================= */
/* 상태 */
/* ================================= */

let champions = [];

let players = [];

let finalResults = [];

let currentPlayer = 0;

/* ================================= */
/* 플레이어 입력칸 생성 */
/* ================================= */

function createPlayerInputs(){

    playerInputs.innerHTML = "";

    for(let i=1;i<=10;i++){

        const row =
        document.createElement("div");

        row.className =
        "player-row";

        row.innerHTML = `
            <input
                class="player-name"
                placeholder="플레이어 ${i}"
            >

            <select
                class="champion-count"
            >
                <option value="1">
                    1개
                </option>

                <option value="2">
                    2개
                </option>

                <option value="3">
                    3개
                </option>

                <option value="4">
                    4개
                </option>

                <option value="5">
                    5개
                </option>
            </select>
        `;

        playerInputs.appendChild(
            row
        );
    }
}

createPlayerInputs();

/* ================================= */
/* 챔피언 데이터 로드 */
/* ================================= */

async function loadChampions(){

    try{

        const response =
        await fetch(
        "https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion.json"
        );

        const data =
        await response.json();

        champions =
        Object.values(
            data.data
        );

        console.log(
            "챔피언 로딩 완료",
            champions.length
        );

    }
    catch(error){

        console.error(error);

        alert(
            "챔피언 데이터를 불러오지 못했습니다."
        );
    }
}

loadChampions();

/* ================================= */
/* 유틸 */
/* ================================= */

function shuffle(array){

    const copied =
    [...array];

    for(
        let i =
        copied.length - 1;

        i > 0;

        i--
    ){

        const j =
        Math.floor(
            Math.random() *
            (i + 1)
        );

        [
            copied[i],
            copied[j]
        ] =
        [
            copied[j],
            copied[i]
        ];
    }

    return copied;
}

function sleep(ms){

    return new Promise(
        resolve =>
        setTimeout(
            resolve,
            ms
        )
    );
}

/* ================================= */
/* 플레이어 수집 */
/* ================================= */

function collectPlayers(){

    players = [];

    const rows =
    document.querySelectorAll(
        ".player-row"
    );

    rows.forEach(row => {

        const name =
        row.querySelector(
            ".player-name"
        )
        .value
        .trim();

        const count =
        Number(
            row.querySelector(
                ".champion-count"
            ).value
        );

        if(!name) return;

        players.push({

            name,

            count

        });

    });

    return players.length > 0;
}

/* ================================= */
/* 챔피언 배정 */
/* ================================= */

function assignChampions(){

    finalResults = [];

    const duplicateAllowed =
    allowDuplicate.checked;

    let availablePool =
    shuffle(champions);

    players.forEach(player => {

        let selected = [];

        if(duplicateAllowed){

            selected =
            shuffle(champions)
            .slice(
                0,
                player.count
            );
        }
        else{

            if(
                availablePool.length <
                player.count
            ){

                alert(
                    "챔피언 수가 부족합니다."
                );

                return;
            }

            selected =
            availablePool.splice(
                0,
                player.count
            );
        }

        finalResults.push({

            player:
            player.name,

            champions:
            selected

        });

    });
}

/* ================================= */
/* 시작 버튼 */
/* ================================= */

startBtn.addEventListener(
    "click",
    startDraw
);

function startDraw(){

    if(
        champions.length === 0
    ){

        alert(
            "챔피언 데이터를 로딩중입니다."
        );

        return;
    }

    const valid =
    collectPlayers();

    if(!valid){

        alert(
            "플레이어 이름을 입력해주세요."
        );

        return;
    }

    assignChampions();

    currentPlayer = 0;

    setupPage.classList.add(
        "hidden"
    );

    revealPage.classList.remove(
        "hidden"
    );

    startRevealSequence();
}

/* ================================= */
/* 공개 시작 */
/* ================================= */

async function startRevealSequence(){

    if(
        currentPlayer >=
        finalResults.length
    ){

        showFinalPage();

        return;
    }

    const result =
    finalResults[
        currentPlayer
    ];

    await revealPlayer(
        result
    );

    currentPlayer++;

    startRevealSequence();
}

/* ================================= */
/* 플레이어 공개 */
/* ================================= */

async function revealPlayer(
    result
){

    championRevealArea.innerHTML =
    "";

    revealMessage.textContent =
    "";

    currentPlayerIndex.textContent =
    currentPlayer + 1;

    revealPlayerName.textContent =
    result.player;

    await runCountdown();

    for(
        let i = 0;
        i < result.champions.length;
        i++
    ){

        const champion =
        result.champions[i];

        await revealChampionCard(
            champion
        );
    }

    revealMessage.textContent =
    `${result.player} 추첨 완료`;

    await sleep(1500);
}

/* ================================= */
/* 카운트다운 */
/* ================================= */

async function runCountdown(){

    countdown.style.display =
    "block";

    countdown.textContent = "3";

    await sleep(800);

    countdown.textContent = "2";

    await sleep(800);

    countdown.textContent = "1";

    await sleep(800);

    countdown.textContent = "";

    countdown.style.display =
    "none";
}

/* ================================= */
/* 카드 공개 */
/* ================================= */

async function revealChampionCard(
    champion
){

    const card =
    document.createElement(
        "div"
    );

    card.className =
    "champion-card";

    card.innerHTML = `

        <div class="flip-card">

            <div
                class="card-face card-back"
            >
                ?
            </div>

            <div
                class="card-face card-front"
            >

                <img
                src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.id}.png"
                alt="${champion.name}"
                >

                <p>
                    ${champion.name}
                </p>

            </div>

        </div>

    `;

    championRevealArea.appendChild(
        card
    );

    await sleep(700);

    const flipCard =
    card.querySelector(
        ".flip-card"
    );

    flipCard.classList.add(
        "flipped"
    );

    await sleep(1400);
}

/* ================================= */
/* 최종 결과 화면 */
/* ================================= */

function showFinalPage(){

    revealPage.classList.add(
        "hidden"
    );

    finalPage.classList.remove(
        "hidden"
    );

    renderFinalResults();
}

/* ================================= */
/* 최종 결과 출력 */
/* ================================= */

function renderFinalResults(){

    finalResultContainer.innerHTML =
    "";

    finalResults.forEach(
    result => {

        const playerCard =
        document.createElement(
            "div"
        );

        playerCard.className =
        "result-player";

        const championHtml =
        result.champions
        .map(champion => {

            return `
                <div
                    class="result-champion"
                >

                    <img
                    src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.id}.png"
                    alt="${champion.name}"
                    >

                    <p>
                        ${champion.name}
                    </p>

                </div>
            `;

        })
        .join("");

        playerCard.innerHTML = `

            <h3>
                ${result.player}
            </h3>

            <div
                class="result-champion-list"
            >

                ${championHtml}

            </div>

        `;

        finalResultContainer.appendChild(
            playerCard
        );

    });
}

/* ================================= */
/* 다시 추첨 */
/* ================================= */

restartBtn.addEventListener(
    "click",
    restartDraw
);

function restartDraw(){

    location.reload();
}