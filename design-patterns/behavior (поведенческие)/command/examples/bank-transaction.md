```js
// Command: интерфейс команды
class BankCommand {
  execute() {}
  undo() {}
}

// ConcreteCommand: операции с балансом
class DepositCommand extends BankCommand {
  constructor(account, amount) {
    super();
    this.account = account;
    this.amount = amount;
  }

  execute() {
    this.account.balance += this.amount;
    console.log(`Пополнение на ${this.amount}. Текущий баланс: ${this.account.balance}`);
  }

  undo() {
    this.account.balance -= this.amount;
    console.log(`Отмена пополнения. Баланс: ${this.account.balance}`);
  }
}

class WithdrawCommand extends BankCommand {
  constructor(account, amount) {
    super();
    this.account = account;
    this.amount = amount;
  }

  execute() {
    if (this.account.balance >= this.amount) {
      this.account.balance -= this.amount;
      console.log(`Снятие ${this.amount}. Баланс: ${this.account.balance}`);
    } else {
      console.log("Недостаточно средств!");
    }
  }

  undo() {
    this.account.balance += this.amount;
    console.log(`Отмена снятия. Баланс: ${this.account.balance}`);
  }
}

// Receiver: банковский счет
class BankAccount {
  constructor() {
    this.balance = 0;
  }
}

// Invoker: обработчик транзакций
class TransactionManager {
  constructor() {
    this.history = [];
  }

  execute(command) {
    command.execute();
    this.history.push(command);
  }

  undoLast() {
    const lastCommand = this.history.pop();
    if (lastCommand) {
      lastCommand.undo();
    }
  }
}

// Использование
const account = new BankAccount();
const manager = new TransactionManager();

manager.execute(new DepositCommand(account, 100));  // Пополнение на 100. Баланс: 100
manager.execute(new WithdrawCommand(account, 30)); // Снятие 30. Баланс: 70
manager.undoLast();
```
