const readline=require('readline')

const rl=readline.createInterface({
     input:process.stdin
});

const userInput=[];

rl.on('line',(input)=>{
     userInput.push(input)
});

function isSubsequence(s, t) {
     let sIndex = 0; // Pointer for string s
     let tIndex = 0; // Pointer for string t
   
     // Loop through string t
     while (sIndex < s.length && tIndex < t.length) {
       // Compare characters, if they match, move the pointer of s
       if (s[sIndex] === t[tIndex]) {
         sIndex++;
       }  
       // Always move the pointer for t
       tIndex++;
     }
   
     // If we've traversed all of s, then s is a subsequence of t
     return sIndex === s.length;
   }


rl.on('close',()=>{
     let s=String(userInput[0]); 
     let t=String(userInput[1]); 
     console.log(isSubsequence(s, t));
})