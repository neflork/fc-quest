let images = document.getElementById("images");
let text = document.getElementById("text");
let btnBox = document.getElementById("btnBox");
let input = document.getElementById("input");

let name;


input.onkeypress = function(event) {

    if (event.key == "Enter" || event.keyCode == 13) {
        name = input.value;
        // console.log(name)
        input.parentNode.removeChild(input);

        moveNextStep(scenario.two);
    }
}


let changeText = function(words) {
    text.innerHTML = words.replace("Твоё имя", name);
};

let changeImage = function(img) {
    images.style.backgroundImage = "url(" + img + ")";
};

let changeButtons = function(buttonList) {
    btnBox.innerHTML = "";

    for (let i = 0; i < buttonList.length; i++) {
        btnBox.innerHTML += "<button onClick=" + buttonList[i][1] +  ">" + buttonList[i][0] +  "</button";
    }
};

let moveNextStep = function(s) {
    changeText(s.text);
    changeImage(s.image);
    changeButtons(s.buttons);
};

let box = document.querySelector(".box");
let app = document.querySelector(".app");
let body = document.querySelector("body");

let startGame = function() {
    box.parentNode.removeChild(box);
    app.classList.add("activeApp");
    body.classList.add("activeBody");
}


let scenario = {
    one: {
        image: "https://i.pinimg.com/564x/28/5d/c1/285dc1d12bdbae205a7152cabdce85a1.jpg",
        text: "Вы наконец-то решили вернуться домой. Ваше имя?\n"
    },

    two: {
        image: "images/scenario-2.jpg",
        text: "Твоё имя, вы так промокли! Не мудрено, на улице идет сильный дождь. Однако можно было взять зонт... <br/> Что бы вы хотели сделать? ",
        buttons: [["Взять зонт и пойти дальше по делам", "moveNextStep(scenario.three)"], ["Зайти в дом, привести себя в порядок и чем-то занять свободное время", "moveNextStep(scenario.four)"]]
    },

    three: {
        image: "https://i.pinimg.com/564x/19/d8/d5/19d8d5516e11472c93da8c746b14c247.jpg",
        text: "По дороге вы встрелили своего друга и поспорили с ним. В случае вешей победы в игре, он выполнит ваше желание.",
        buttons: [["Продолжить...", "moveNextStep(scenario.four)"]]
    },

    four: {
        image: "https://i.pinimg.com/564x/37/33/ed/3733edffa1c8cb4f9835010faf3f868a.jpg",
        text: "Однако у вас есть выбор:",
        buttons: [["Сыграть в игру - 'Крестики-нолики'", "moveNextStep(scenario.five)"], ["Дальше пойти по делам", "moveNextStep(scenario.three)"]]
    },

    five: {
        image: "https://i.pinimg.com/564x/c7/35/d7/c735d786c378d5b268cee53f9477c56b.jpg",
        text: "", 
        buttons: [["Начать игру", "startGame()"], ["Всё-же отказаться и уйти", "moveNextStep(scenario.six)"]]
    },
    
    six: {
        image: "https://i.pinimg.com/564x/21/f7/08/21f7084857ead254deaafc8b48356420.jpg",
        text: "Вы благополучно отказались от игры и ушли по делам..."
    }
}


// TicTac Game:

let items = document.getElementsByClassName("app_block")
let movePlayer = true;
let game = true;

//Ход (нажатие на ячейку)
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function() {

        if (!this.classList.contains("active")) {

            if (movePlayer) {
                if (this.innerHTML == "") {
                    this.classList.add("active");
                    this.classList.add("active_x");
                    this.innerHTML = "x";
                }

                let result = checkMap();

                if (result.val) {
                    game = false;
                    setTimeout(function() {
                        exit(result);
                    }, 1);
                }

                movePlayer = !movePlayer;
            }

            if (game) {
                setTimeout(function() {
                    botMove();
                }, 200);
            }

        }

    });
}

function getRandomInt(value) {
    return Math.floor(Math.random() * Math.floor(value));
}

function botMove() {
    let items = document.querySelectorAll(".app_block:not(.active)");
    let step = getRandomInt(items.length);

    items[step].innerHTML = "o";
    items[step].classList.add("active");
    items[step].classList.add("active_o");

    let result = checkMap();

    if (result.val) {
        game = false;
        setTimeout(function() {
            exit(result);
        }, 1);
    }

    movePlayer = !movePlayer;
}

function checkMap() {
    let block = document.querySelectorAll(".app_block");
    let items = [];

    for (let i = 0; i < block.length; i++)
        items.push(block[i].innerHTML);
    
    console.log(items)
    
    if ( items[0] == "x" && items[1] == "x" && items[2] == "x" || 
        items[3] == "x" && items[4] == "x" && items[5] == "x" || 
        items[6] == "x" && items[7] == "x" && items[8] == "x" || 
        items[0] == "x" && items[3] == "x" && items[6] == "x" || 
        items[1] == "x" && items[4] == "x" && items[7] == "x" || 
        items[2] == "x" && items[5] == "x" && items[8] == "x" || 
        items[0] == "x" && items[4] == "x" && items[8] == "x" || 
        items[6] == "x" && items[4] == "x" && items[2] == "x" )
        return { val: true, win: "Игрок" }
        
    else if ( items[0] == "o" && items[1] == "o" && items[2] == "o" || 
            items[3] == "o" && items[4] == "o" && items[5] == "o" || 
            items[6] == "o" && items[7] == "o" && items[8] == "o" || 
            items[0] == "o" && items[3] == "o" && items[6] == "o" || 
            items[1] == "o" && items[4] == "o" && items[7] == "o" || 
            items[2] == "o" && items[5] == "o" && items[8] == "o" || 
            items[0] == "o" && items[4] == "o" && items[8] == "o" || 
            items[6] == "o" && items[4] == "o" && items[2] == "o" )
        return { val: true, win: "Бот" }

    else if (items.includes("") == 0) 
        return {val: true, win: "Ничья"}

    return {val: false}
}

function exit(obj) {
    alert("GAME OVER! Winner of the game: " + obj.win);
    location.reload();
}


moveNextStep(scenario.one);