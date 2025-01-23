import input from './input.js'

class Nap{
    constructor(nev, orak){
        this.nev = nev;
        this.orak = orak;
    }
    kiir(){
        console.log(nev);
        for(var i in orak){
            console.log(i);
        }
    }
}

let array = [];

array.push(new Nap("Hetfo", ["matek", "magyar", "angol", "tortenelem"]));
array.push(new Nap("Kedd", ["matek", "tesi", "progalap", "szoftteszt"]));
array.push(new Nap("Szerda", ["angol", "tortenelem", "matek", "magyar"]));
array.push(new Nap("Csutrotok", ["tesi", "tesi", "matek"]));
array.push(new Nap("Pentek", ["progalap", "szoftteszt", "tori"]));

for(var i of array){
    i.kiir();
}