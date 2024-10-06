const readline=require('readline')

const rl=readline.createInterface({
     input:process.stdin
});

const userInput=[];

rl.on('line',(input)=>{
     userInput.push(input)
});

function versionCompare(v1, v2) {
     let i = 0, j = 0;  // Indexes for both version strings
   
     while (i < v1.length || j < v2.length) {
       let vnum1 = 0, vnum2 = 0;  // To store each version's number part
   
       // Extract number from v1 until we hit a dot or end of string
       while (i < v1.length && v1[i] !== '.') {
         vnum1 = vnum1 * 10 + (v1[i] - '0');  // Build the number
         i++;
       }
   
       // Extract number from v2 until we hit a dot or end of string
       while (j < v2.length && v2[j] !== '.') {
         vnum2 = vnum2 * 10 + (v2[j] - '0');  // Build the number
         j++;
       }
   
       // Compare the numeric parts of v1 and v2
       if (vnum1 > vnum2) return 1;
       if (vnum1 < vnum2) return -1;
   
       // Move past the dot to compare the next part of the versions
       i++;
       j++;
     }
   
     return 0;  // Versions are equal if no difference is found
   }


rl.on('close',()=>{
// Example usage
const version1 = String(userInput[0]);
const version2 = String(userInput[1]);

const result = versionCompare(version1, version2);
if (result < 0) {
  console.log(version1 + " is smaller");
} else if (result > 0) {
  console.log(version2 + " is smaller");
} else {
  console.log("Both versions are equal");
}
})