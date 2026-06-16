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

const teamBuildPage =
document.getElementById(
    "teamBuildPage"
);

const playerInputs =
document.getElementById(
    "playerInputs"
);

const allowDuplicate =
document.getElementById(
    "allowDuplicate"
);

const startBtn =
document.getElementById(
    "startBtn"
);

const rerollChampionBtn =
document.getElementById(
    "rerollChampionBtn"
);

const teamBuildBtn =
document.getElementById(
    "teamBuildBtn"
);

const backToResultBtn =
document.getElementById(
    "backToResultBtn"
);

const moveToTeam1Btn =
document.getElementById(
    "moveToTeam1Btn"
);

const moveToTeam2Btn =
document.getElementById(
    "moveToTeam2Btn"
);

const rollFirstPickBtn =
document.getElementById(
    "rollFirstPickBtn"
);

const firstPickResult =
document.getElementById(
    "firstPickResult"
);

const countdown =
document.getElementById(
    "countdown"
);

const currentPlayerName =
document.getElementById(
    "currentPlayerName"
);

const allPlayersReveal =
document.getElementById(
    "allPlayersReveal"
);

const finalResultContainer =
document.getElementById(
    "finalResultContainer"
);

const availablePlayers =
document.getElementById(
    "availablePlayers"
);

const team1Players =
document.getElementById(
    "team1Players"
);

const team2Players =
document.getElementById(
    "team2Players"
);

/* ================================= */
/* STATE */
/* ================================= */

let champions = [];

let players = [];

let results = [];

let selectedPlayerCard =
null;

let firstPickTeam =
null;

/* ================================= */
/* UTIL */
/* ================================= */

function sleep(ms){

    return new Promise(
        resolve =>
        setTimeout(
            resolve,
            ms
        )
    );
}

function shuffle(array){

    const arr =
    [...array];

    for(
        let i =
        arr.length - 1;
        i > 0;
        i--
    ){

        const j =
        Math.floor(
            Math.random()
            *
            (
                i + 1
            )
        );

        [
            arr[i],
            arr[j]
        ]
        =
        [
            arr[j],
            arr[i]
        ];
    }

    return arr;
}

/* ================================= */
/* PLAYER INPUT UI */
/* ================================= */

function createPlayerInputs(){

    playerInputs.innerHTML =
    "";

    for(
        let i = 1;
        i <= 10;
        i++
    ){

        const row =
        document.createElement(
            "div"
        );

        row.className =
        "player-row";

        row.innerHTML = `

        <div class="player-top">

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

        </div>

        <div class="lane-select">

            <label>
                <input
                    type="checkbox"
                    class="lane-checkbox"
                    value="TOP"
                    checked
                >
                탑
            </label>

            <label>
                <input
                    type="checkbox"
                    class="lane-checkbox"
                    value="JUNGLE"
                    checked
                >
                정글
            </label>

            <label>
                <input
                    type="checkbox"
                    class="lane-checkbox"
                    value="MID"
                    checked
                >
                미드
            </label>

            <label>
                <input
                    type="checkbox"
                    class="lane-checkbox"
                    value="ADC"
                    checked
                >
                원딜
            </label>

            <label>
                <input
                    type="checkbox"
                    class="lane-checkbox"
                    value="SUP"
                    checked
                >
                서폿
            </label>

        </div>

        `;

        playerInputs.appendChild(
            row
        );
    }
}

createPlayerInputs();

/* ================================= */
/* LOAD CHAMPIONS */
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
            "챔피언 로드 완료",
            champions.length
        );

    }
    catch(error){

        console.error(
            error
        );

        alert(
            "챔피언 데이터를 불러오지 못했습니다."
        );
    }
}

loadChampions();
/* ================================= */
/* LANE DATA */
/* ================================= */

const laneData = {

Aatrox:["TOP"],
Ahri:["MID"],
Akali:["TOP","MID"],
Akshan:["MID","ADC"],
Alistar:["SUP"],
Amumu:["JUNGLE"],
Anivia:["MID"],
Annie:["MID","SUP"],
Aphelios:["ADC"],
Ashe:["ADC","SUP"],
AurelionSol:["MID"],
Azir:["MID"],

Bard:["SUP"],
Belveth:["JUNGLE"],
Blitzcrank:["SUP"],
Brand:["MID","SUP"],
Braum:["SUP"],

Caitlyn:["ADC"],
Camille:["TOP"],
Cassiopeia:["MID"],
ChoGath:["TOP"],
Corki:["MID","ADC"],

Darius:["TOP"],
Diana:["JUNGLE","MID"],
DrMundo:["TOP"],
Draven:["ADC"],

Ekko:["MID","JUNGLE"],
Elise:["JUNGLE"],
Evelynn:["JUNGLE"],
Ezreal:["ADC"],

Fiddlesticks:["JUNGLE"],
Fiora:["TOP"],
Fizz:["MID"],

Galio:["MID","SUP"],
Gangplank:["TOP"],
Garen:["TOP"],
Gnar:["TOP"],
Gragas:["TOP","JUNGLE"],
Graves:["JUNGLE"],
Gwen:["TOP"],

Hecarim:["JUNGLE"],
Heimerdinger:["MID"],

Illaoi:["TOP"],
Irelia:["TOP","MID"],
Ivern:["JUNGLE"],

Janna:["SUP"],
JarvanIV:["JUNGLE"],
Jax:["TOP"],
Jayce:["TOP","MID"],
Jhin:["ADC"],
Jinx:["ADC"],

Kaisa:["ADC"],
Kalista:["ADC"],
Karma:["SUP","MID"],
Karthus:["JUNGLE"],
Kassadin:["MID"],
Katarina:["MID"],
Kayle:["TOP"],
Kayn:["JUNGLE"],
Kennen:["TOP"],
Khazix:["JUNGLE"],
Kindred:["JUNGLE"],
Kled:["TOP"],
KogMaw:["ADC"],

Leblanc:["MID"],
LeeSin:["JUNGLE"],
Leona:["SUP"],
Lillia:["JUNGLE"],
Lissandra:["MID"],
Lucian:["ADC"],
Lulu:["SUP"],
Lux:["MID","SUP"],

Malphite:["TOP"],
Malzahar:["MID"],
Maokai:["TOP","JUNGLE","SUP"],
MasterYi:["JUNGLE"],
MissFortune:["ADC"],
Mordekaiser:["TOP"],
Morgana:["MID","SUP"],

Nami:["SUP"],
Nasus:["TOP"],
Nautilus:["SUP"],
Neeko:["MID","SUP"],
Nidalee:["JUNGLE"],
Nilah:["ADC"],
Nocturne:["JUNGLE"],
Nunu:["JUNGLE"],

Olaf:["TOP","JUNGLE"],
Orianna:["MID"],
Ornn:["TOP"],

Pantheon:["TOP","MID"],
Poppy:["TOP","JUNGLE"],
Pyke:["SUP"],

Qiyana:["MID"],
Quinn:["TOP"],

Rakan:["SUP"],
Rammus:["JUNGLE"],
RekSai:["JUNGLE"],
Rell:["SUP"],
Renata:["SUP"],
Renekton:["TOP"],
Rengar:["JUNGLE"],
Riven:["TOP"],
Rumble:["TOP"],

Ryze:["MID"],

Samira:["ADC"],
Sejuani:["JUNGLE"],
Senna:["ADC","SUP"],
Seraphine:["MID","SUP"],
Sett:["TOP"],
Shaco:["JUNGLE"],
Shen:["TOP"],
Shyvana:["JUNGLE"],
Singed:["TOP"],
Sion:["TOP"],
Sivir:["ADC"],
Skarner:["JUNGLE"],
Smolder:["ADC"],
Sona:["SUP"],
Soraka:["SUP"],
Swain:["MID","SUP"],
Sylas:["MID"],
Syndra:["MID"],

TahmKench:["SUP","TOP"],
Taliyah:["MID","JUNGLE"],
Talon:["MID"],
Taric:["SUP"],
Teemo:["TOP"],
Thresh:["SUP"],
Tristana:["ADC"],
Trundle:["TOP","JUNGLE"],
Tryndamere:["TOP"],
TwistedFate:["MID"],
Twitch:["ADC"],

Udyr:["JUNGLE"],
Urgot:["TOP"],

Varus:["ADC"],
Vayne:["ADC"],
Veigar:["MID"],
Velkoz:["MID","SUP"],
Vex:["MID"],
Vi:["JUNGLE"],
Viego:["JUNGLE"],
Viktor:["MID"],
Vladimir:["MID"],
Volibear:["TOP","JUNGLE"],

Warwick:["JUNGLE"],
Wukong:["TOP","JUNGLE"],

Xayah:["ADC"],
Xerath:["MID","SUP"],
XinZhao:["JUNGLE"],

Yasuo:["TOP","MID"],
Yone:["TOP","MID"],
Yorick:["TOP"],
Yuumi:["SUP"],

Zac:["JUNGLE"],
Zed:["MID"],
Zeri:["ADC"],
Ziggs:["MID","ADC"],
Zilean:["MID","SUP"],
Zoe:["MID"],
Zyra:["MID","SUP"]

};

/* ================================= */
/* COLLECT PLAYERS */
/* ================================= */

function collectPlayers(){

    players = [];

    const rows =
    document.querySelectorAll(
        ".player-row"
    );

    rows.forEach(
        row => {

            const name =
            row.querySelector(
                ".player-name"
            )
            .value
            .trim();

            if(!name)
            return;

            const count =
            Number(
                row.querySelector(
                    ".champion-count"
                ).value
            );

            const lanes =
            [
                ...row.querySelectorAll(
                    ".lane-checkbox:checked"
                )
            ].map(
                cb => cb.value
            );

            players.push({

                name,
                count,
                lanes

            });

        }
    );

    return players.length > 0;
}

/* ================================= */
/* ASSIGN CHAMPIONS */
/* ================================= */

function assignChampions(){

    results = [];

    const duplicateAllowed =
    allowDuplicate.checked;

    let globalUsedIds = [];

    players.forEach(
        player => {

            let lanePool =
            champions.filter(
                champion => {

                    const lanes =
                    laneData[
                        champion.id
                    ] || [];

                    return player.lanes.some(
                        lane =>
                        lanes.includes(
                            lane
                        )
                    );
                }
            );

            if(
                !duplicateAllowed
            ){

                lanePool =
                lanePool.filter(
                    champion =>
                    !globalUsedIds.includes(
                        champion.id
                    )
                );
            }

            const selected =
            shuffle(
                lanePool
            ).slice(
                0,
                player.count
            );

            selected.forEach(
                champion => {

                    globalUsedIds.push(
                        champion.id
                    );

                }
            );

            results.push({

                player:
                player.name,

                champions:
                selected,

                lanes:
                player.lanes

            });

        }
    );
}
/* ================================= */
/* CREATE CARD */
/* ================================= */

function createHiddenCard(){

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

                <img>

                <p></p>

            </div>

        </div>

    `;

    return card;
}

/* ================================= */
/* BUILD REVEAL BOARD */
/* ================================= */

function buildRevealBoard(){

    allPlayersReveal.innerHTML =
    "";

    results.forEach(
        result => {

            const row =
            document.createElement(
                "div"
            );

            row.className =
            "reveal-player-row";

            row.dataset.player =
            result.player;

            row.innerHTML = `

                <div
                    class="reveal-player-name"
                >
                    ${result.player}
                </div>

                <div
                    class="reveal-champion-list"
                >
                </div>

            `;

            const championList =
            row.querySelector(
                ".reveal-champion-list"
            );

            result.champions.forEach(
                () => {

                    championList.appendChild(
                        createHiddenCard()
                    );

                }
            );

            allPlayersReveal.appendChild(
                row
            );

        }
    );
}

/* ================================= */
/* COUNTDOWN */
/* ================================= */

async function runCountdown(){

    countdown.textContent =
    "3";

    await sleep(
        333
    );

    countdown.textContent =
    "2";

    await sleep(
        333
    );

    countdown.textContent =
    "1";

    await sleep(
        334
    );

    countdown.textContent =
    "";

}

/* ================================= */
/* REVEAL ONE PLAYER */
/* ================================= */

async function revealPlayer(
    result
){

    const rows =
    document.querySelectorAll(
        ".reveal-player-row"
    );

    rows.forEach(
        row =>
        row.classList.remove(
            "active"
        )
    );

    const activeRow =
    [...rows].find(
        row =>
        row.dataset.player
        ===
        result.player
    );

    if(
        !activeRow
    )
    return;

    activeRow.classList.add(
        "active"
    );

    currentPlayerName.textContent =
    result.player;

    await runCountdown();

    const cards =
    activeRow.querySelectorAll(
        ".champion-card"
    );

    result.champions.forEach(
        (
            champion,
            index
        ) => {

            const card =
            cards[index];

            card.querySelector(
                ".card-front img"
            ).src =
            `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.id}.png`;

            card.querySelector(
                ".card-front p"
            ).textContent =
            champion.name;

        }
    );

    await sleep(
        250
    );

    cards.forEach(
        card => {

            card
            .querySelector(
                ".flip-card"
            )
            .classList.add(
                "flipped"
            );

        }
    );

    await sleep(
        1000
    );
}

/* ================================= */
/* START REVEAL */
/* ================================= */

async function startReveal(){

    for(
        let i = 0;
        i < results.length;
        i++
    ){

        await revealPlayer(
            results[i]
        );

    }

    showFinalPage();
}
/* ================================= */
/* SHOW FINAL PAGE */
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
/* FINAL RESULT RENDER */
/* ================================= */

function renderFinalResults(){

    finalResultContainer.innerHTML =
    "";

    results.forEach(
        result => {

            const playerCard =
            document.createElement(
                "div"
            );

            playerCard.className =
            "result-player";

            playerCard.innerHTML = `

                <h3>
                    ${result.player}
                </h3>

                <div
                    class="result-champion-list"
                >

                    ${result.champions.map(
                        (
                            champion,
                            index
                        ) => `

                        <div
                            class="result-champion"
                        >

                            <label>

                                <input
                                    type="checkbox"
                                    class="champion-reroll"
                                    data-player="${result.player}"
                                    data-index="${index}"
                                >

                                리롤

                            </label>

                            <img
                                src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.id}.png"
                            >

                            <p>
                                ${champion.name}
                            </p>

                        </div>

                        `
                    ).join("")}

                </div>

            `;

            finalResultContainer.appendChild(
                playerCard
            );

        }
    );
}

/* ================================= */
/* CHAMPION REROLL */
/* ================================= */

function rerollSelectedChampions(){

    const checks =
    document.querySelectorAll(
        ".champion-reroll:checked"
    );

    if(
        checks.length === 0
    ){

        alert(
            "리롤할 챔피언을 선택하세요."
        );

        return;
    }

    checks.forEach(
        checkbox => {

            const playerName =
            checkbox.dataset.player;

            const championIndex =
            Number(
                checkbox.dataset.index
            );

            const playerResult =
            results.find(
                p =>
                p.player
                ===
                playerName
            );

            if(
                !playerResult
            )
            return;

            /* 플레이어 라인 */

            const playerLanes =
            playerResult.lanes;

            /* 현재 플레이어 챔피언 */

            const currentIds =
            playerResult.champions.map(
                c => c.id
            );

            /* 같은 라인 챔피언만 */

            const lanePool =
            champions.filter(
                champion => {

                    const lanes =
                    laneData[
                        champion.id
                    ] || [];

                    const laneMatch =
                    playerLanes.some(
                        lane =>
                        lanes.includes(
                            lane
                        )
                    );

                    return (
                        laneMatch &&
                        !currentIds.includes(
                            champion.id
                        )
                    );
                }
            );

            if(
                lanePool.length === 0
            )
            return;

            const newChampion =
            lanePool[
                Math.floor(
                    Math.random()
                    *
                    lanePool.length
                )
            ];

            playerResult.champions[
                championIndex
            ] =
            newChampion;

        }
    );

    renderFinalResults();
}

/* ================================= */
/* REROLL BUTTON */
/* ================================= */

rerollChampionBtn.addEventListener(
    "click",
    rerollSelectedChampions
);
/* ================================= */
/* CREATE DRAFT CARD */
/* ================================= */

function createDraftCard(
    player
){

    const card =
    document.createElement(
        "div"
    );

    card.className =
    "draft-player-card";

    card.dataset.player =
    player.player;

    card.innerHTML = `

        <div
            class="draft-player-header"
        >

            <div
                class="draft-player-name"
            >
                ${player.player}
            </div>

            <div
                class="draft-player-champions"
            >

                ${player.champions.map(
                    champion => `

                    <img
                        class="mini-champion"
                        src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.id}.png"
                        title="${champion.name}"
                    >

                    `
                ).join("")}

            </div>

        </div>

    `;

    card.addEventListener(
        "click",
        () => {

            document
            .querySelectorAll(
                ".draft-player-card"
            )
            .forEach(
                c =>
                c.classList.remove(
                    "selected"
                )
            );

            card.classList.add(
                "selected"
            );

            selectedPlayerCard =
            card;
        }
    );

    return card;
}

/* ================================= */
/* BUILD TEAM BOARD */
/* ================================= */

function buildDraftBoard(){

    availablePlayers.innerHTML =
    "";

    team1Players.innerHTML =
    "";

    team2Players.innerHTML =
    "";

    selectedPlayerCard =
    null;

    results.forEach(
        player => {

            availablePlayers.appendChild(
                createDraftCard(
                    player
                )
            );

        }
    );
}

/* ================================= */
/* OPEN TEAM BUILD */
/* ================================= */

function openTeamBuilder(){

    finalPage.classList.add(
        "hidden"
    );

    teamBuildPage.classList.remove(
        "hidden"
    );

    buildDraftBoard();

    firstPickResult.textContent =
    "결과 : 미정";
}

/* ================================= */
/* MOVE PLAYER */
/* ================================= */

function moveSelectedPlayer(
    targetContainer
){

    if(
        !selectedPlayerCard
    ){

        alert(
            "플레이어를 먼저 선택하세요."
        );

        return;
    }

    targetContainer.appendChild(
        selectedPlayerCard
    );

    selectedPlayerCard
    .classList.remove(
        "selected"
    );

    selectedPlayerCard =
    null;
}

/* ================================= */
/* TEAM MOVE */
/* ================================= */

moveToTeam1Btn.addEventListener(
    "click",
    () => {

        moveSelectedPlayer(
            team1Players
        );

    }
);

moveToTeam2Btn.addEventListener(
    "click",
    () => {

        moveSelectedPlayer(
            team2Players
        );

    }
);

/* ================================= */
/* RANDOM FIRST PICK */
/* ================================= */

rollFirstPickBtn.addEventListener(
    "click",
    async () => {

        rollFirstPickBtn.disabled =
        true;

        const teams =
        [
            "1팀",
            "2팀"
        ];

        for(
            let i = 0;
            i < 20;
            i++
        ){

            const randomTeam =
            teams[
                Math.floor(
                    Math.random() * 2
                )
            ];

            firstPickResult.textContent =
            randomTeam;

            await sleep(
                100
            );
        }

        const winner =
        teams[
            Math.floor(
                Math.random() * 2
            )
        ];

        firstPickTeam =
        winner;

        firstPickResult.textContent =
        `🎉 ${winner} 선!`;

        rollFirstPickBtn.disabled =
        false;
    }
);

/* ================================= */
/* TEAM BUILD BUTTON */
/* ================================= */

teamBuildBtn.addEventListener(
    "click",
    () => {

        openTeamBuilder();

    }
);

/* ================================= */
/* BACK TO RESULT */
/* ================================= */

backToResultBtn.addEventListener(
    "click",
    () => {

        teamBuildPage.classList.add(
            "hidden"
        );

        finalPage.classList.remove(
            "hidden"
        );

    }
);

/* ================================= */
/* START BUTTON */
/* ================================= */

startBtn.addEventListener(
    "click",
    async () => {

        if(
            champions.length === 0
        ){

            alert(
                "챔피언 정보를 불러오는 중입니다."
            );

            return;
        }

        const valid =
        collectPlayers();

        if(
            !valid
        ){

            alert(
                "플레이어 이름을 입력해주세요."
            );

            return;
        }

        assignChampions();

        buildRevealBoard();

        setupPage.classList.add(
            "hidden"
        );

        revealPage.classList.remove(
            "hidden"
        );

        await startReveal();

    }
);

/* ================================= */
/* DEBUG */
/* ================================= */

console.log(
    "LOL Random Champion Picker Ready"
);