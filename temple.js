const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

const userInput = [];

rl.on('line', (input) => {
    userInput.push(input);
});

rl.on('close', () => {
     // let string=String(userInput[0]); 
     const numbers = userInput[0].split(' ').map(number => Number(number));
    console.log(numbers);
});