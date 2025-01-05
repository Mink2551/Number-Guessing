let display = document.getElementById("display");
let LB = document.getElementById("leftBtn");
let RB = document.getElementById("rightBtn");
let listInCommand = 0;
let userInput = document.getElementById("userInput");
let userEnter = document.getElementById("Enter");
userInput.disabled = true;
userEnter.disabled = true;
let userNumber = 0;
let turn = 0;
let userInteract = NaN;
let AI_Life = 10; // AI life
let min = 1, max = 100; // Min and max values for guessing\
let AI_Guess
let Player_Life = 5;

let gameState = {
    command: 0,
};

display.value = "Press Start! To go next";

const handleCommand = (newCommand) => {
    gameState.command = newCommand;
    if (turn == 0) {
        checkCommand();
    } else if (turn == 1) {
        Game_play()
    } else if (turn == 3) {
        pass
    } else if (turn == 2) {
        return;
    }
};

const checkUserNumber = () => {
    let num = document.getElementById("userInput").value;
    num = Number(num);
    if (turn == 0) {
        if (!isNaN(num) && num > 0 && num < 101) {
            userNumber = num;
            listInCommand = 2;
            userInput.disabled = true;
            userEnter.disabled = true;
            checkCommand();
        } else {
            display.value = "Type number between 1-100";
        }
    } else if ( turn == 3) {
        if (!isNaN(num) && num > 0 && num < 101) {
            
            if (num == AI_Guess) {
                display.value = "You won. Congratulations!"
                setTimeout(function () {
                    location.reload(); // This will reload the page after 1 second
                }, 2000); // Delay of 1000 milliseconds (1 second)
            } else if (num > AI_Guess) {
                display.value = "Too High"
                Player_Life--
            } else if (num < AI_Guess) {
                display.value = "Too Low"
                Player_Life--
            }

            listInCommand = 3
            userInput.disabled = true;
            userEnter.disabled = true;
            setTimeout(function() {
                checkCommand();
            },1000)
        } else {
            display.value = "Type number between 1-100";
        }
    }
};

const checkCommand = () => {
    if (listInCommand == 0) {
        if (gameState.command == 2) {
            display.value = "⬆ : You Guess ⬇ : Me Guess";
            listInCommand++;
        }
    } else if (listInCommand == "waiting") {
        // Pass if waiting for input
    }
    
    else if (listInCommand == 1) {
        if (gameState.command == 1) {
            display.value = "Ok. Your turn";
            listInCommand = "waiting"
            setTimeout(function () {
                display.value = "Guess My number :)"
                userInput.disabled = false
                userEnter.disabled = false
                turn = 3
            }, 2000)
            setTimeout(function () {
                display.value = `You have ${Player_Life} life lefts`
            }, 1000)
            AI_Guess = AI(min,max)

        } else if (gameState.command == 3) {
            display.value = "Ok. Type your Number First";
            userInput.disabled = false;
            userEnter.disabled = false;
            userInput.placeholder = "Type Here...";
            listInCommand = "waiting";
        }
    } else if (listInCommand == 2) {
        turn = 2;
        display.value = "If it Correct press start.";

        setTimeout(function () {
            display.value = "OK?";
        }, 1000);

        setTimeout(function () {
            display.value = `I Have ${AI_Life} Life left`;
        }, 2000);

        setTimeout(function () {
            display.value = "⬆ : Too High ⬇ : Too Low";
        }, 3000);

        setTimeout(function () {
            aiTurn();
        }, 4000);
    } else if (listInCommand == 3) {
        if (Player_Life != 0) {
            setTimeout(function () {
                display.value = "Guess My number :)"
                userInput.disabled = false
                userEnter.disabled = false
                turn = 3
            }, 1000)
            display.value = `You have ${Player_Life} life lefts`
        } else {
            display.value = "You Lose HAHA"
            setTimeout(function() {
                display.value = `The number is ${AI_Guess}`
            },1000)
            setTimeout(function() {
                location.reload();
            },2500)
        }
    }
};

const AI = (minimum, maximum) => {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

const aiTurn = () => {
    if (AI_Life == 0) {
        display.value = "You won. Congratulations!";
    
        setTimeout(function () {
            location.reload(); // This will reload the page after 1 second
        }, 2000); // Delay of 1000 milliseconds (1 second)
    } 
    else {
        AI_Guess = AI(min, max);
        display.value = `Is it ${AI_Guess}?`;

        setTimeout(function () {
            listInCommand = "waiting"; // Wait for user input
            turn = 1;
            return
        }, 1000);
    }
};

const Game_play = () => {
    if (gameState.command == 1) {
        AI_Life--;
        max = AI_Guess - 1;  // Adjust the maximum range for the next guess
        display.value = `Too High! I have ${AI_Life} life left.`;
        setTimeout(() => {
            aiTurn(); // AI takes the next turn after feedback
        }, 1000);
    };

    if (gameState.command == 3) {
        AI_Life--;
        min = AI_Guess + 1;  // Adjust the minimum range for the next guess
        display.value = `Too Low! I have ${AI_Life} life left.`;
        setTimeout(() => {
            aiTurn(); // AI takes the next turn after feedback
        }, 1000);
    };

    if (gameState.command == 2) {
        display.value = "I guessed it right!";
        setTimeout(() => {
            display.value = "I won!";
        }, 1000);
        setTimeout(function () {
            location.reload(); // This will reload the page after 1 second
        }, 2000); // Delay of 1000 milliseconds (1 second)
    };
}