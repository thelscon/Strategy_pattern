// - Створіть інтерфейс PaymentStrategy, який міститиме метод pay(amount: number): void.
// - Реалізуйте кілька класів, які реалізують цей інтерфейс, наприклад, CreditCardPaymentStrategy, PaypalPaymentStrategy, 
//     BitcoinPaymentStrategy, кожен з них має відповідний метод pay.
// - Створіть клас PaymentContext, який має властивість paymentStrategy типу PaymentStrategy.
// - Додайте метод executePayment(amount: number): void в клас PaymentContext, який викликає метод pay відповідної стратегії.

const enum EPaymentType {
    CreditCard = 'Credit Card' ,
    PayPal = 'PayPal' ,
    Bitcoin = 'Bitcoin'
}

interface IPaymentSystem {
    type : EPaymentType
    balance : number
}
interface IPaymentStrategy extends IPaymentSystem {
    readonly pay : (amount : number) => void
}

class CreditCardPaymentStrategy implements IPaymentStrategy {
    public readonly type = EPaymentType.CreditCard

    private availableCredit = 10000
    private availableMoney : number = 3000

    get balance () : number {
        return this.availableMoney + this.availableCredit
    }

    pay (amount : number) {
        if (amount < this.balance) {
            console.log (`${this.type}\n${this.balance}USD`)
            console.log (` - ${amount}$`)
            this.availableMoney -= amount

            if (this.availableMoney < 0) {
                [this.availableMoney , this.availableCredit] = [0 , this.availableCredit - this.availableMoney]
            }
            console.log (`${this.balance}USD\n`)
        }
    }
}
class PayPalPaymentStrategy implements IPaymentStrategy {
    public readonly type = EPaymentType.PayPal
    private _balance : number = 3000

    get balance () : number {
        return this._balance
    }

    pay (amount : number) {
        if (amount < this._balance) {
            console.log (`${this.type}\n${this._balance}USD`)
            console.log (` - ${amount}$`)
            this._balance -= amount
            console.log (`${this._balance}USD\n`)
        }
    }
}
class BitcoinPaymentStrategy implements IPaymentStrategy {
    public readonly type = EPaymentType.Bitcoin
    private currentExchangeRate = 769
    private balanceBitcoin = 10

    get balance () : number {
        return this.currentExchangeRate * this.balanceBitcoin
    }

    pay (amount : number) {
        if (amount < this.balance) {
            console.log (`${this.type}\n${this.balanceBitcoin}BTC`)
            console.log (` - ${amount}$`)
            this.balanceBitcoin = (this.balance - amount) / this.currentExchangeRate
            console.log (`${this.balanceBitcoin}BTC\n`)
        }
    }
}


// Strategy
interface IPaymentContext {
    executePayment : (amount : number) => void
}
class PaymentContext implements IPaymentContext{
    private _paymentStrategy: IPaymentStrategy

    set paymentStrategy (strategy : IPaymentStrategy) {
        this._paymentStrategy = strategy
    }

    constructor (
        paymentStrategy : IPaymentStrategy
    ) {
        this._paymentStrategy = paymentStrategy
    }

    executePayment (amount : number) {
        this._paymentStrategy.pay (amount)
    }
}


// examples
const a = new PaymentContext (new PayPalPaymentStrategy())
a.executePayment(769)

a.paymentStrategy = new CreditCardPaymentStrategy ()
a.executePayment(769)