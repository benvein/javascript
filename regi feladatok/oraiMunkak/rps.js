import input from './input.js';

const num = await input("ko papir olo [1,2,3]: ");
const num2 = await input("ko papir olo [1,2,3]: ");

if((num == 1 && num2 == 1) || (num == 2 && num2==2) || (num==3 && num2==3)){
    console.log("dontetlen")
}
else if((num == 1 && num2 == 2) || (num == 2 && num2 == 3) || (num==3 && num2 == 1)){
    console.log("második nyer")
}
else if((num == 1 && num2 == 3) || (num==3 && num2==2) || (num==2 && num2==1)){
    console.log("elso nyer");
}