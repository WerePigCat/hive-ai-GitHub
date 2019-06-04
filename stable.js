let bot = require("./bot"); //Don't change this
bot.hostURL = 'http://denaliai19-matthesby1.c9users.io'; //Put the server url/IP adress here!
bot.key = "t2kbpd99n6a"; //Set your bot key to this string!
/* TEST CODE */
bot.testHostURL = 'http://hive-ai-werepigcat123.c9users.io'; //Put the server url/IP adress here!
bot.testKey = "testrun"; //Do Not Change This Key!
bot.isTest = false;
/* End Test Code */
/***************************************************/
//Write your code in this function!!!
bot.direction = function(game) {
    /* ~~~ Determines and Organizes Data About The Game ~~~ */
    let stepsToBase = bot.findDistance(game.myBot.pos, game.myBase.pos);
    let turnsLeft = game.totalTurns-game.turn;
    let enemyBots = [];
    let enemyBases = [];
    let enemyMostPollen = enemyBots[0];
    let myDir = "none";
    for (let i = 0; i < game.players.length; i++) // adds all other bots to the enemy botarray
    {
        if (game.players[i].id != game.myBot.id) {
            enemyBases.push(game.bases[i]); // addsall other bases to the enemy bases array
            enemyBots.push(game.players[i]);
        }
    }
    for (let i = 0; i < enemyBots.length; i++)
    {
        if(enemyBots[i].pollen > enemyMostPollen)
        {
            enemyMostPollen = enemyBots[i];
        }
    }
    //  to do list: add a loop to determine the pollen per square, and have a run away thing.  
    let mostFlower = game.flowers[0];
    for (let i = 0; i < game.flowers.length; i++) {
        if (game.flowers[i].pollen > mostFlower.pollen) 
        {
            mostFlower = game.flowers[i];
        }
    }
    let bestFlower = game.flowers[0];
    let flowerNum = 0;
    for(let i = 0; i < game.flowers.length; i++)
    {
        if(game.flowers[i].pollen/bot.findDistance(game.myBot.pos, game.flowers[i].pos) > flowerNum)
        {
            flowerNum = game.flowers[i].pollen/bot.findDistance(game.myBot.pos, game.flowers[i].pos);
            bestFlower = game.flowers[i];
        }
    }
    let dirs = ["north", "east", "south", "west"];
    /* ~~ This code decides what to do ~~ */
    let task = "flower";

    if(game.myBot.pollen > 350)
    {
        task = "myBase";
    }
    else if(stepsToBase*game.players.length >= turnsLeft)
    {
        task = "myBase";
    }
    // i need the length of a square, and the distance inbetween players.
    else if(game.myBot.pollen < enemyMostPollen)
    {
        // let valueArray = [];
        let biggestRate = 0;
        let biggestRatePlayer = enemyBots[0];
        // for(let i = 0; i < enemyBots.length; i++)
        // {
        //     let playerWorth = game.flowers[i].pollen/bot.findDistance(game.myBot.pos, game.flowers[i].pos);
        //     valueArray.push(playerWorth);
        // }
        for(let i = 0; i < enemyBots.length; i++)
        {
            if(enemyBots[i].pollen/bot.findDistance(game.myBot.pos, enemyBots[i].pos) > biggestRate && enemyBots[i].pollen/bot.findDistance(game.myBot.pos, enemyBots[i].pos) > 40 && enemyBots[i].pollen > game.myBot.pollen+50)
            {
                biggestRate = enemyBots[i].pollen/bot.findDistance(game.myBot.pos, enemyBots[i].pos);
                biggestRatePlayer = enemyBots[i];
                task = "chase most";
            }
        }
    }
    //The condition should check to see if your bot's pollen is less than enemyMostPollen's pollen.  You might want to also check if they're close to your bot, and perhaps even check to make sure they have a lot more pollen than you.
    /* ~~This code decides how to do it ~~ */
    if (task == "none") {
        console.log("Going random!");
        myDir = dirs[Math.floor(Math.random() * 4)];

    }
    else if (task == "flower") {
        console.log("Going towards the direction of the flower is located in.");
        myDir = bot.nextStep(game.myBot.pos, bestFlower.pos);
    }
    else if (task == "myBase")
    {
        console.log("Going to the base right now");
        myDir = bot.nextStep(game.myBot.pos, game.myBase.pos);
    }
    else if (task == "chase most")
    {
        console.log("Going chase someone right now");
        myDir = bot.nextStep(game.myBot.pos, game.biggestRatePlayer.pos);
    }
    for(let i = 0; i < game.players.length; i++)
    {
        if (game.players[i].pollen < game.myBot.pollen)
        {
            if(game.players[i].id != game.myBot.id)
            {
                // get the other player position, and hashmap
                bot.avoid(game.players[i].pos);
            }
        }
        if(game.players[i].pos == game.bases[i].pos)
        {
            if(game.players[i].id != game.myBot.id)
            {
                bot.avoid(game.players[i].pos);
            }
        }
    }
    return myDir;
} //DO NOT CHANGE ANYTHING BELOW THIS LINE
bot();