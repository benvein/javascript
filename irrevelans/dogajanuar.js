const text = "abcde";
const texttwo = "abbcde";

function vowelCount(str){
    const vowels = ["a", "e", "i", "o", "u"];
    let vowelCount = str.split('').filter(char => vowels.includes(char)).length;

    return vowelCount;
}

console.log(vowelCount(text));


function allUnique(str){
    for (let i = 0; i <= str.length; i++) {
        for (let j = i+1; j <= str.length; j++){
            if(str[i] == str[j]){
                return false;
            }
        }
        
    }

    return true;
}

console.log(allUnique(text))

function divisors(num){
    let divisors = [];

    for (let i = 2; i < num; i++) {
        if(num%i===0){
            divisors.push(i);
        }
        
    }

    if(divisors.length == 0){
        return `${num} is prime`;
    }

    return divisors;
}

console.log(divisors(12));

/*function filteringList(list){
    return list.filter(y => typeof y === 'number');
}

console.log(filteringList((1,2,'a','b')));*/