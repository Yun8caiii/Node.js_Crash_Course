// Global object

//global is built in. will tell u a bunch of stuff
//console.log(global);

setTimeout(() => {
    console.log('in the timeout')
    clearInterval()
}, 3000);

const int = setInterval(() => {
    console.log('in the interval')
}, 1000);

console.log(__dirname);
console.log(__filename);

