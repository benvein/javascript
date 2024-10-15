let a = 6;
let b = 3;

const osszeadas = (a,b) => a+b;

const kivonas = (a,b) => {
    console.log(`${a} - ${b} = ${a-b}`)
    return a-b
}

const szorzas = (a,b) => a*b;

const osztas = (a,b) => a/b;

const muvelet = (a,b,fgv) => fgv(a,b);
//arrow fgv

console.log(muvelet(a,b,osszeadas)) //callback fgv