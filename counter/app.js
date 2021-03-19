class Counter {
  constructor(element, value) {
    this.element = element;
    this.value = value;
    // in order not to be calling methods around on different object instances, we just create all properties of in the prototype
    this.display = element.querySelector(".value");
    this.display.textContent = value;
    // select the buttons
    this.resetBtn = element.querySelector(".reset");
    this.increaseBtn = element.querySelector(".increase");
    this.decreaseBtn = element.querySelector(".decrease");

    // a click on the button will not have any effect on the counter, because the 'this' keyword is pointing to the specific btn. In order to make the "this" keyword point to the Prototype we call the bind method onto the Prototype function inside the eventListener;

    // 1st "this" refers to the resetBtn/increaseBtn/decreaseBtn object
    // 2nd "this" refers to the Prototype/class [Counter]
    this.resetCounter = this.resetCounter.bind(this);
    this.increaseCounter = this.increaseCounter.bind(this);
    this.decreaseCounter = this.decreaseCounter.bind(this);

    this.resetBtn.addEventListener("click", this.resetCounter);
    this.increaseBtn.addEventListener("click", this.increaseCounter);
    this.decreaseBtn.addEventListener("click", this.decreaseCounter);
  }

  // methods on our prototype
  increaseCounter() {
    this.value++;
    this.display.textContent = this.value;
  }

  decreaseCounter() {
    this.value--;
    this.display.textContent = this.value;
  }

  resetCounter() {
    this.value = 0;
    this.display.textContent = this.value;
  }

  /*displayCounter() {
    const value = this.element.querySelector(`.value`);
    value.textContent = this.value;
  }*/

  /*increaseCounter() {
    this.increase = this.element.querySelector(".increase");
    // instead calling bind on "this", we can use arrow function too
    this.increase.addEventListener("click", () => {
      this.value++;
      this.display.textContent = this.value;
    });
  }*/
}

// only instantiate the class (Prototype) and that's all
const firstCounter = new Counter(getElement(".first-counter"), 100);
const secondCounter = new Counter(getElement(".second-counter"), 50);
// unlike joining different methods on each instance as in line 60/61

// firstCounter.increaseCounter();
// secondCounter.increaseCounter();

function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, as no such element exists`
  );
}
