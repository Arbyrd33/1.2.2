const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
const fifa14Cup = fifaData.filter(game => game["Year"] === 2014);
console.log(`All 2014 games:`, fifa14Cup, `... And those were all the games played in 2014.`);

const cup14Final = fifa14Cup.filter(stage => stage.Stage === 'Final');
console.log(`Of those games, here were the finalists:`, cup14Final, `As you can see, ${cup14Final[0][`Home Team Name`]} was the home team for this game.`);

//(b) Away Team name for 2014 world cup final
console.log(`The away team was ${cup14Final[0][`Away Team Name`]}.`);

//(c) Home Team goals for 2014 world cup final
console.log(`The home team scored ${cup14Final[0][`Home Team Goals`]} point that year...`);

//(d) Away Team goals for 2014 world cup final
console.log(`And the visitors scored ${cup14Final[0][`Away Team Goals`]}.`);
//(e) Winner of 2014 world cup final */
console.log(`By the skin of their teeth, ${cup14Final[0][`Home Team Name`]} won this game. It was a wild ride.`);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(array) {
    const fifaFinalists = array.filter(stage => stage["Stage"] === 'Final');
    return fifaFinalists;
 }
console.log(`Of all of the games...`, getFinals(fifaData), `Here is the data for all of the teams that made it to the final stage.`);


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, callback) {
    return callback(array).map(item => item.Year)
}
console.log(`The following list contains all of the years in the getFinals() dataset:`, getYears(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(array, callback) {
    return callback(array).map(goals => goals['Home Team Goals'] > goals['Away Team Goals'] ? goals['Home Team Name'] : goals['Away Team Name']);
}
console.log(getWinners(fifaData, getFinals), `... These are all of the winning teams for each of those previously listed years.`);


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, finalsCB, yearsCB, winnersCB) {
    let stringArray = [];
    for (let i = 0; i <= winnersCB(array, finalsCB).length; i++)
    stringArray.push(`In ${yearsCB(array, finalsCB)[i]}, ${winnersCB(array, finalsCB)[i]} won the world cup!`)
    stringArray.pop();
return stringArray;
}
console.log(getWinnersByYear(fifaData, getFinals, getYears, getWinners), `Go team!`);



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive a callback function in a parameter that will take getFinals (from task 2) as an argument and ensure you pass in the fifaData as its argument
 
 💡 HINT: Example of invocation: getAverageGoals(getFinals(fifaData));

 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
 
*/

function getAverageGoals(callback) {
    /* code here */
 const homePoints = callback?.reduce((accumulator, current) => {
    return accumulator + current["Home Team Goals"];
}, 0);
console.log(`Home: `, homePoints);

const awayPoints = callback?.reduce((accumulator, current) => {
    return accumulator + current["Away Team Goals"];
}, 0);
console.log(`Away: `, awayPoints);

const avgPoints = (homePoints + awayPoints) / callback?.length
console.log(`Altogether, both teams scored an average of ${avgPoints.toFixed(2)} points.`);
return avgPoints.toFixed(2);

}
getAverageGoals(getFinals(fifaData));



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

}



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
