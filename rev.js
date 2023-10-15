function a(){
this.name="vikas";
};

let b=new a();

console.log(a.__proto__===a.prototype);
console.log(a.__proto__.__proto__===Object.prototype);
console.log(Function.__proto__===Function.prototype);
console.log(Function.__proto__===Function.constructor);
console.log(Function.__proto__);
console.log(Function.prototype);
console.log(Function.constructor);
console.log(`

`);

console.log(Object.__proto__);
console.log(Object.prototype);
console.log(Object.constructor);

console.log(`

`);

console.log(a.__proto__);
console.log(a.prototype);
console.log(a.constructor);

console.log(`
`);

console.log(b.__proto__);
console.log(b.prototype);
console.log(b.constructor);

