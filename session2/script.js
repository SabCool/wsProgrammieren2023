let obj = {
    //first_name, last_name ...
    first_name:"Sabine",
    last_name: "Classnitz",

    sayHello() {
        console.log(this.first_name + this.last_name);
    }
 }
 
 console.log(obj);
 console.log(obj.first_name); // undefined
 obj.sayHello();