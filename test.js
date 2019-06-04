let bot = require("./bot"); //Don't change this
bot.hostURL = 'http://denaliai19-matthesby1.c9users.io'; //Put the server url/IP adress here!
bot.key = "t2kbpd99n6a"; //Set your bot key to this string!
/* TEST CODE */
bot.testHostURL = 'http://hive-ai-werepigcat123.c9users.io'; //Put the server url/IP adress here!
bot.testKey = "testrun"; //Do Not Change This Key!
bot.isTest = false;
//improve flowetr, steal, avoid? 
let noFlowerTurns = 0;
let someoneFollow = 0;
/* End Test Code */
/***************************************************/
//Write your code in this function!!!
bot.direction = function(game) {
    /* ~~~ Determines and Organizes Data About The Game ~~~ */
    let stepsToBase = bot.findDistance(game.myBot.pos, game.myBase.pos);
    let turnsLeft = game.totalTurns-game.turn;
    let enemyBots = [];
    let enemyBases = [];
    let nearFlowerBase = false;
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
    for (let i = 0; i < game.flowers.length; i++) 
    {
        if (game.flowers[i].pollen > mostFlower.pollen) 
        {
            mostFlower = game.flowers[i];
        }
    }
    let bestFlower = game.flowers[0];
    let flowerNum = 0;
    let biggestRate = 0;
    let biggestRatePlayer = game.myBot;
    let mostFlowerNum = 0;
    for(let i = 0; i < game.flowers.length; i++)
    {
        if(game.flowers[i].pollen/bot.findDistance(game.myBot.pos, game.flowers[i].pos) > flowerNum)
        {
            flowerNum = game.flowers[i].pollen/bot.findDistance(game.myBot.pos, game.flowers[i].pos);
            bestFlower = game.flowers[i];
        }
    }
    // sum later, repl.it, linear algebra, adding to flower methods
    for(let i = 0; i < game.flowers.length; i++)
    {
        flowerNum = game.flowers[i].pollen/bot.findDistance(game.myBot.pos, game.flowers[i].pos);
        for(let j = 0; j < game.flowers.length; j++)
        {
            if(bot.findDistance(game.flowers[i].pos, game.flowers[j].pos) == 2)
            {
                flowerNum += game.flowers[j].pollen/bot.findDistance(game.myBot.pos, game.flowers[j].pos);
                findFlower(i, j);
            }
        }
        if(flowerNum > mostFlowerNum)
        {
            mostFlowerNum = flowerNum;
        }
    }
    
    function findFlower(i, p)
    {
        for(let j = 0; j < game.flowers.length; j++)
        {
            if(bot.findDistance(game.flowers[p].pos, game.flowers[j].pos) == 2)
            {
                flowerNum += game.flowers[p].pollen/bot.findDistance(game.myBot.pos, game.flowers[p].pos);
            }
        }
    }
    let dirs = ["north", "east", "south", "west"];
    /* ~~ This code decides what to do ~~ */
    let task = "flower";

    
    
    if(game.myBot.pollen > 250)
    {
        task = "myBaseImportant";
    }
    // i need the length of a square, and the distance inbetween players.
    for(let i = 0; i < game.players.length; i++)
    {
        if(game.players[i] > biggestRatePlayer && bot.findDistance(game.myBot.pos, biggestRatePlayer.pos) <= 6)
        {
            biggestRatePlayer = game.players[i];
        }
    }
    if(biggestRatePlayer.id != game.myBot.id && biggestRatePlayer.pollen - 200 > game.myBot.pollen)
    {
        task = "chase most";
    }
    // if(game.myBot.pollen < enemyMostPollen)
    // {
    //     // let valueArray = [];
        
    //     // for(let i = 0; i < enemyBots.length; i++)
    //     // {
    //     //     let playerWorth = game.flowers[i].pollen/bot.findDistance(game.myBot.pos, game.flowers[i].pos);
    //     //     valueArray.push(playerWorth);
    //     // }
    //     for(let i = 0; i < enemyBots.length; i++)
    //     {
    //         if(enemyBots[i].pollen/bot.findDistance(game.myBot.pos, enemyBots[i].pos) > biggestRate && enemyBots[i].pollen/bot.findDistance(game.myBot.pos, enemyBots[i].pos) > 40 && enemyBots[i].pollen > game.myBot.pollen+50 && bot.findDistance(game.myBot.pos, enemyBots[i].pos) <= 3)
    //         {
    //             biggestRate = enemyBots[i].pollen/bot.findDistance(game.myBot.pos, enemyBots[i].pos);
    //             biggestRatePlayer = enemyBots[i];
    //             task = "chase most";
    //         }
    //     }
    //     if(biggestRate > 100)
    //     {
            
    //     }
    // }
    let bigFlower = game.flowers[0];
    // improve on how to go back to base, and when, also to do: when and how to steal
    for(let i = 0; i < game.flowers.length; i++)
    {
        if(bot.findDistance(game.myBot.pos, game.flowers[i].pos) <= 3)
        {
            for (let j = 0; j < game.flowers.length; j++) 
            {
                if (game.flowers[j].pollen > bigFlower.pollen) 
                {
                    bigFlower = game.flowers[j];
                    nearFlowerBase = true;
                }
            }
        }
    }
    console.log(bigFlower);
    let stealFrom = [];
    let bestBase = game.myBase;
    if(noFlowerTurns == 0)
    {
        noFlowerTurns = 3;
    }
    else
    {
        noFlowerTurns--;
    }
    for(let i = 0; i < game.bases.length; i++)
    {
        if(bot.findDistance(game.myBot.pos, game.bases[i].pos) <= 10 && game.bases[i].pos[0] != game.myBase.pos[0] && game.bases[i].pollen >= 200 && bot.findDistance(game.players[i].pos, game.bases[i].pos) >= 2)
        {
            stealFrom.push(game.bases[i]);
            task = "steal";
        }
    }
    let botOnMyBase = game.myBot;
    for(let i = 0; i < game.players[i]; i++)
    {
        if(bot.findDistance(botOnMyBase.pos, game.myBase.pos) <= 2)
        {
            botOnMyBase = game.players[i];
        }
    }
    if(stepsToBase*game.players.length >= turnsLeft)
    {
        task = "myBaseImportant";
    }
    if(game.myBase.pollen > 0 && botOnMyBase.id != game.myBot.id)
    {
        task = "myBaseImportant";
    }
    for(let i = 0; i < game.players.length; i++)
    {
        if(bot.findDistance(game.players[i].pos, game.myBase.pos) == 1 && bot.findDistance(game.myBot.pos, game.myBase.pos) == 2)
        {
            task = "myBaseImportant";
        }
        else if(bot.findDistance(game.players[i].pos, game.myBase.pos) <= 2 && bot.findDistance(game.myBot.pos, game.myBase.pos) <= 6)
        {
           // task = "myBaseImportant";
        }
    }
    let personFollow = game.myBot;
    for(let i = 0; i < game.players[i]; i++)
    {
        if(bot.findDistance(game.myBot.pos, game.players[i].pos) <= 3)
        {
            if(someoneFollow <= 3)
            {
                someoneFollow++;
            }
            else
            {
                someoneFollow = 0;
                //bot.avoidSpace(game.players[i].pos);
            }
        }
    }
    for(var i = 0; i < game.players.length; i++)
        {
            if(bot.findDistance(game.players[i].pos, game.bases[i].pos) == 1)
            {
                if(game.players[i].id == game.myBot.id)
                {
                    bot.avoidSpace(game.bases[i]);
                }
            }
        }
    // incorperate on base, and when I should steal from enemies
    //The condition should check to see if your bot's pollen is less than enemyMostPollen's pollen.  You might want to also check if they're close to your bot, and perhaps even check to make sure they have a lot more pollen than you.
    /* ~~This code decides how to do it ~~ */
    for(let i = 0; i < game.players.length; i++)
    {
        if (game.players[i].pollen+300 < game.myBot.pollen)
        {
            if(game.players[i].id != game.myBot.id)
            {
                // get the other player position, and hashmap, chancing after someone could need an improvement
               // bot.avoid(game.players[i].pos);
            }
        }
        if(bot.findDistance(game.players[i].pos, game.bases[i].pos) <= 2)
        {
            if(game.players[i].id != game.myBot.id)
            {
                bot.avoidSpace(game.bases[i].pos);
            }
        }
    }
    for(var i = 0; i < game.players.length; i++)
    {
        // if(game.myBot.pos[0] == game.bases.pos[0] && )
        // {
            
        // }
    }
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
        //if(nearFlowerBase && bigFlower.pollen > 10)
        //{
           // myDir = bot.nextStep(game.myBot.pos, bigFlower.pos);
        //}
        //else
        //{
            myDir = bot.nextStep(game.myBot.pos, game.myBase.pos);
        //}
    }
   else if (task == "myBaseImportant")
    {
        bot.clearAvoid();
        for(var i = 0; i < game.players.length; i++)
        {
            if(bot.findDistance(game.players[i].pos, game.bases[i].pos) == 1)
            {
                if(game.players[i].id == game.myBot.id)
                {
                    bot.avoidSpace(game.bases[i]);
                }
            }
        }
        console.log("Going to the base right now (quick)");
        myDir = bot.nextStep(game.myBot.pos, game.myBase.pos);
    }
  else  if (task == "chase most")
    {
        console.log("Going chase someone right now");
        myDir = bot.nextStep(game.myBot.pos, game.biggestRatePlayer.pos);
    }
    else if(task == "steal")
    {
        //  if(stealFrom.length > 1)
        //  {
            for(let i = 0; i < stealFrom.length; i++)
            {
                if(stealFrom[i].pollen > bestBase.pollen)
                {
                    bestBase = stealFrom[i];
                }
            }
        //     if(bestBase.id != game.myBase.id)
        //     {
        //         myDir = bot.nextStep(game.myBot.pos, bestBase.pos);
        //     }
        //  }
        // else if(stealFrom.length == 1 && bestBase.id != game.myBase.id)
        // {
            myDir = bot.nextStep(game.myBot.pos, bestBase.pos);
        // }
        
    }
    else
    {
        console.log("Going towards the direction of the flower is located in.");
        myDir = bot.nextStep(game.myBot.pos, bestFlower.pos);
    }
    
    return myDir;
} //DO NOT CHANGE ANYTHING BELOW THIS LINE
bot();