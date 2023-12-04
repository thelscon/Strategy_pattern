"use strict";
// - Створіть інтерфейс PaymentStrategy, який міститиме метод pay(amount: number): void.
// - Реалізуйте кілька класів, які реалізують цей інтерфейс, наприклад, CreditCardPaymentStrategy, PaypalPaymentStrategy, 
//     BitcoinPaymentStrategy, кожен з них має відповідний метод pay.
// - Створіть клас PaymentContext, який має властивість paymentStrategy типу PaymentStrategy.
// - Додайте метод executePayment(amount: number): void в клас PaymentContext, який викликає метод pay відповідної стратегії.
class CreditCardPaymentStrategy {
    type = "Credit Card" /* EPaymentType.CreditCard */;
    availableCredit = 10000;
    availableMoney = 3000;
    get balance() {
        return this.availableMoney + this.availableCredit;
    }
    pay(amount) {
        if (amount < this.balance) {
            console.log(`${this.type}\n${this.balance}USD`);
            console.log(` - ${amount}$`);
            this.availableMoney -= amount;
            if (this.availableMoney < 0) {
                [this.availableMoney, this.availableCredit] = [0, this.availableCredit - this.availableMoney];
            }
            console.log(`${this.balance}USD\n`);
        }
    }
}
class PayPalPaymentStrategy {
    type = "PayPal" /* EPaymentType.PayPal */;
    _balance = 3000;
    get balance() {
        return this._balance;
    }
    pay(amount) {
        if (amount < this._balance) {
            console.log(`${this.type}\n${this._balance}USD`);
            console.log(` - ${amount}$`);
            this._balance -= amount;
            console.log(`${this._balance}USD\n`);
        }
    }
}
class BitcoinPaymentStrategy {
    type = "Bitcoin" /* EPaymentType.Bitcoin */;
    currentExchangeRate = 769;
    balanceBitcoin = 10;
    get balance() {
        return this.currentExchangeRate * this.balanceBitcoin;
    }
    pay(amount) {
        if (amount < this.balance) {
            console.log(`${this.type}\n${this.balanceBitcoin}BTC`);
            console.log(` - ${amount}$`);
            this.balanceBitcoin = (this.balance - amount) / this.currentExchangeRate;
            console.log(`${this.balanceBitcoin}BTC\n`);
        }
    }
}
class PaymentContext {
    _paymentStrategy;
    set paymentStrategy(strategy) {
        this._paymentStrategy = strategy;
    }
    constructor(paymentStrategy) {
        this._paymentStrategy = paymentStrategy;
    }
    executePayment(amount) {
        this._paymentStrategy.pay(amount);
    }
}
// examples
const a = new PaymentContext(new PayPalPaymentStrategy());
a.executePayment(769);
a.paymentStrategy = new CreditCardPaymentStrategy();
a.executePayment(769);
