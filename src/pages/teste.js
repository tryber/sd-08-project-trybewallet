const value = 'gusta';

const a = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');

console.log(value.match(a));
