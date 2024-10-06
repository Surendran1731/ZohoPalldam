const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

const userInput = [];

rl.on('line', (input) => {
    userInput.push(input);
});

function isMatch(text, pattern) {
     let i = 0, j = 0;
     let starIndex = -1, match = 0;
   
     // Loop through the text
     while (i < text.length) {
       // Case 1: If characters match, or pattern contains '?'
       if (j < pattern.length && (pattern[j] === '?' || text[i] === pattern[j])) {
         i++;
         j++;
       }
       // Case 2: If pattern contains '*'
       else if (j < pattern.length && pattern[j] === '*') {
         starIndex = j;  // Mark the position of '*'
         match = i;  // Mark the position in text
         j++;  // Move past '*'
       }
       // Case 3: If mismatch, but we encountered a previous '*'
       else if (starIndex !== -1) {
         j = starIndex + 1;  // Reset pattern to after '*'
         match++;  // Increment text index
         i = match;  // Update i with new match index
       }
       // Case 4: No match
       else {
         return false;
       }
     }
   
     // Check if remaining pattern is only '*'
     while (j < pattern.length && pattern[j] === '*') {
       j++;
     }
   
     return j === pattern.length;  // True if pattern fully matched
   }


rl.on('close', () => {
    let string=String(userInput[0])
    let pattern=String(userInput[1])
    console.log(isMatch(string,pattern))
});