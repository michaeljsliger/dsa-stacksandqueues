class _NodeS {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class Stack {
    constructor() {
        this.top = null;
        this.length = 0;
    }

    push(value) {
        if (this.top === null) {
            this.top = new _NodeS(value, null);
            this.length++;
            return this.top;
        }

        const node = new _NodeS(value, this.top);
        this.length++;
        this.top = node;
    }

    pop() {
        const node = this.top;
        this.top = node.next;
        this.length--;
        return node.value;
    }

    peek() {
        return this.top.value;
    }

    isEmpty() {
        return this.top === null;
    }

    display() {
        let tempNode = this.top;
        while (tempNode !== null) {
            console.log(tempNode);
            tempNode = tempNode.next;
        }
    }
}
// 2, peek, isempty, and display implemented
// 3
function is_palindrome(str) {
    const s = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    // use a stack to find out whether something is a palindrome
    const stack = new Stack();
    for (let i = 0; i < str.length; i++) {
        stack.push(s[i]);
    }
    let s2 = [];
    for (let i = 0; i < str.length; i++) {
        s2.push(stack.pop());
    }

    return s2.join('') === s;
}

// console.log(is_palindrome('dad'));
// console.log(is_palindrome('dadd'));
// console.log(is_palindrome('Tauhida'));
// console.log(is_palindrome('1001'));
// console.log(is_palindrome('A man, a plan, a canal: Panama'));

// 4
function matchParentheses(str) {
    const left = ['(', '[', '{'];
    const right = [')', ']', '}'];
    const findIdx = (bracket, LR) => LR.indexOf(bracket);
    const stack = new Stack();
    let flag = false;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "'" || str[i] === '"') {
            flag = !flag;
        }
        if (!flag) {
            if (stack.length === 0 && right.includes(str[i])) {
                return false;
            }
            if (left.includes(str[i])) {
                stack.push(str[i]);
            } else if (right.includes(str[i])) {
                const comp = stack.pop();
                if (findIdx(comp, left) !== findIdx(str[i], right)) {
                    return false;
                }
            }
        }
    }
    return stack.length === 0 || flag !== true;
}

// console.log(matchParentheses('("[])(")'));
// console.log(matchParentheses('(){}[]'));
// console.log(matchParentheses('()[(]'));
// console.log(matchParentheses('["])'));
// console.log(matchParentheses('(())()'));
// console.log(matchParentheses('(())())'));

// 5 sort stack
// smallest items are on top, asc order
function sortStack(stack) {
    const secondStack = [];
    while (stack.length) {
        let temp = stack.pop();
        while (secondStack.length && secondStack[secondStack.length - 1] > temp) {
            stack.push(secondStack.pop());
        }
        secondStack.push(temp);
    }
    return secondStack;
    // to utilize Stack(), secondStack = new Stack(),
    // secondStack.peek()
}

const stck = new Stack();
stck.push(10);
stck.push(7);
stck.push(118);
stck.push(17);
stck.push(3);

// console.log(sortStack([10, 7, 118, 17, 3]));





class _NodeQ {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    enqueue(value) {
        const node = new _NodeQ(value);

        if (this.first === null) {
            this.first = node;
        }

        if (this.last) {
            this.last.next = node;
        }

        this.length++;
        this.last = node;
    }

    dequeue() {
        if (this.first === null) {
            return;
        }
        const node = this.first;
        this.first = this.first.next;

        if (node === this.last) {
            this.last = null;
        }
        this.length--;
        return node.value;
    }

}

// 6 
const enterprise = new Queue();
enterprise.enqueue('Kirk');
enterprise.enqueue('Spock');
enterprise.enqueue('Uhura');
enterprise.enqueue('Sulu');
enterprise.enqueue('Checkov');

function peek(queue) {
    return queue.first;
}
function isEmpty(queue) {
    return queue.first === null;
}
function display(queue) {
    let temp = queue.first;
    while (temp !== null) {
        console.log(temp);
        temp = temp.next;
    }
    return null;
}

// console.log(display(enterprise));

// 9 Square dance pairing
function pairing(people) {
    // if peek(queue)[0] === 'F' AND people[i][0] === 'M'
    const spares = new Queue();
    for (let i = 0; i < people.length; i++) {
        if (spares.length > 0) {
            if (peek(spares).value[0] === 'F' && people[i][0] === 'M') {
                const one = spares.dequeue();
                const two = people[i];
                console.log(`${one} is paired with ${two}`);
            } else if (peek(spares).value[0] === 'M' && people[i][0] === 'F') {
                const one = spares.dequeue();
                const two = people[i];
                console.log(`${one} is paired with ${two}`);
            } else {
                spares.enqueue(people[i]);
            }
        } else {
            // no match, so push
            spares.enqueue(people[i]);
        }
    }
    return `${spares.length} people waiting to dance`;
}
const people = [
    'F Jane',
    'M Frank',
    'M John',
    'M Sherlock',
    'F Madonna',
    'M David',
    'M Christopher',
    'F Beyonce'
];

// console.log(pairing(people));

// 10 Ophidian Bank
function ophidian(queue) {
    let count = 0;
    while (queue.length) {
        let temp = queue.first;
        count++;
        if (Math.floor(Math.random() * 100) < 25) {
            queue.enqueue(temp);
            console.log(`${temp.value} did not have the right paperwork`)
        } else {
            queue.dequeue();
            console.log(`${temp.value} was helped, ${queue.length} to go`);
        }
    }
    return `${count} minutes`;
}

console.log(ophidian(enterprise));