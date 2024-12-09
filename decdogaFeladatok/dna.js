import input from './input.js';

let dna = await input("dna: ");

function getComplementaryDNA(dna) {
    let complementaryStrand = '';

    for (let nucleotide of dna) {
        switch (nucleotide) {
            case 'A':
                complementaryStrand += 'T';
                break;
            case 'T':
                complementaryStrand += 'A';
                break;
            case 'C':
                complementaryStrand += 'G';
                break;
            case 'G':
                complementaryStrand += 'C';
                break;
            default:
                throw new Error('Invalid nucleotide: ' + nucleotide);
        }
    }

    return complementaryStrand;
}

console.log(getComplementaryDNA(dna));