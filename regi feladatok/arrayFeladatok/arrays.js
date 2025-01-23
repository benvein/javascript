const otosLottoSzamok = GetOtosLotteryNumbers();
console.log(otosLottoSzamok);

const tippek = GetOtosLotteryNumbers();
console.log(tippek);

let matchCount = GetNumberOfHits(tippek, otosLottoSzamok);
console.log(matchCount);

const monthlyNumbers = GetMonthlyLotteryArrayNumbers();
console.log(monthlyNumbers);

const monthlyOnlyOnce = GetMonthlyLotteryArrayNumbers(monthlyNumbers);
console.log(monthlyOnlyOnce);

console.log(monthlyStatistics(monthlyNumbers));

function GetOtosLotteryNumbers() {
    const randomNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1);
    return randomNumbers;
}

function GetNumberOfHits(tippek, szamok) {
    let matchCount = 0;

    tippek.forEach(num => {
        if (szamok.includes(num)) {
            matchCount++;
        }
    });

    return matchCount;
}

function GetMonthlyLotteryArrayNumbers() {
    const monthlyNumbers = [];
    let count = 0;

    while (count<4 ){
        monthlyNumbers.push(GetOtosLotteryNumbers());
        count++;
    }

    return monthlyNumbers;
}

function GetMonthlyLotteryArrayNumbers(array){
    const combinedArray = new Set(array);

    return combinedArray;
}

function monthlyStatistics(array) {
    const statistics = [];
  
    array.forEach(numbers => {
      numbers.forEach(number => {
        if (!statistics[number]) {
          statistics[number] = 0;
        }
        statistics[number]++;
      });
    });
  
    return Object.entries(statistics).map(([number, count]) => [parseInt(number), count]);
  }