function Universe() {
  var instance;
  Universe = function Universe() {
    return instance;
  };

  Universe.prototype = this;
  instance = new Universe();
  instance.constructor = Universe;
  instance.size = 0;
  instance.bang = "big";
}

function start() {
  let helloWorld = function () {
    this.name = "World";
    this.message = "Hello";
  };

  let helloInstance = new helloWorld();

  helloWorld.prototype.name = "Jaska";
  helloWorld.prototype.message2 = "Goodbye";

  console.log(helloInstance.name);
  console.log(helloInstance.message);
  console.log(helloInstance.message2);
  console.log(helloInstance);

  let object_test = {
    myVar: 10,
    myFunction: function () {
      return this.myVar + 10;
    },
  };
  console.log(object_test);

  let object1 = Object.create(object_test);
  let object2 = Object.create(object_test);

  console.log(object1);
  console.log(object2);

  object1.myVar = 15;
  object2.myVar = 100;

  console.log(object1.myFunction());
  console.log(object2.myFunction());

  console.log(object_test.myVar);
  object_test.myVar = 50;

  // Universe stuff (endless loop)
  Universe.prototype.nothing = true;
  let uni1 = new Universe();
  let uni2 = new Universe();
  uni2.everything = true;

  console.log(uni1);
  console.log(uni2);
}
