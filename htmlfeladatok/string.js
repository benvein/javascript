var text = "a kedvenc szamom 76";
console.log(text.charAt(3));
console.log(text.at(-3));
console.log(text.slice(2,9));
console.log(text.substring(2,9));
console.log(text.substring(10));
console.log(text.slice(-9));
console.log(text.substr(2,8).toUpperCase());
console.log(text.concat(" asdasd"));

var text2 = "   get out    ";
console.log(text2);
console.log("<" + text2.trim() + "<");
console.log("<" + text2.trimEnd() + "<");
console.log("<" + text2.trimStart() + "<");

console.log("get out ".repeat(10));
console.log(text2.replace("out", "on"));
console.log(text2.replaceAll("t", "xd"));

console.log(text.split(""));