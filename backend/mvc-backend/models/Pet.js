class Pet {
  constructor(name, age) {
    this.age = age;
    this.name = name;
    this.alive = true;
  }

  getPet() {
    return this;
  }
}

module.exports = Pet;
