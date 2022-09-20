class Grault {
  private garply: string;

  constructor(quux: Quux, waldo: number[]) {
    this.garply = quux.quuz + " " + quux.corge + " " + waldo;
  }

  public getGarply() {
    return this.garply;
  }
}

interface Quux {
  quuz: string;
  corge: number;
}

function foo(bar: Quux) {
  return "Hello, " + bar.quuz + " " + bar.corge;
}

let baz: Quux = { quuz: "ABC", corge: 123 };

let fred: Grault = new Grault(baz, [1, 2, 3]);

console.log(foo(baz));

console.log(fred.getGarply());

try {
  document.body.innerHTML = fred.getGarply();
} catch (e) {}
