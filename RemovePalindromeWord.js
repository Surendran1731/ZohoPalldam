const readline=require('readline')

const rl=readline.createInterface({
     input:process.stdin
});

const userInput=[];

rl.on('line',(input)=>{
     userInput.push(input)
});

function isPalindrome(word) {
     let start = 0;
     let end = word.length - 1;
   
     //start index vandhu end index vidda kammiya irukara varaikum
     while (start < end) {
       // Compare characters from both ends
       if (word[start] !== word[end]) {
         return false; // Not a palindrome
       }
       start++;
       end--;
     }
     return true; // Is a palindrome
   }
   
   function removePalindromicWords(sentence) {
     let result = ""; // To store the final sentence
     let word = "";   // To build the current word
   
     for (let i = 0; i <= sentence.length; i++) {
       // Check if the current character is not a space
       if (i < sentence.length && sentence[i] !== ' ') {
         word += sentence[i]; // Build the word
       } else {
         // If we hit a space or the end, check the word
         if (word && !isPalindrome(word)) {
           result += word + " "; // Add non-palindromic word to result
         }
         word = ""; // Reset for the next word
       }
     }
   
     return result.trim(); // Trim any extra space at the end
   }
   

rl.on('close',()=>{
     let sentence=String(userInput[0]); 
     console.log(removePalindromicWords(sentence));
})