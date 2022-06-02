import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const sumary = transactions.reduce((acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += Number(transaction.amount);
        acc.total += Number(transaction.amount);
      } else {
        acc.withdraws += Number(transaction.amount);
        acc.total -= Number(transaction.amount);
      }

      return acc;
    },{
      deposits: 0,
      withdraws: 0,
      total: 0,
    });

  return (
    <Container>
      <div>
        <header>
          <p>Entry</p>
          <img src={incomeImg} alt="Entry" />
        </header>
        <strong>
          {new Intl.NumberFormat("US", {
            style: "currency",
            currency: "USD",
          }).format(sumary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Exit</p>
          <img src={outcomeImg} alt="Exit" />
        </header>
        <strong>
          -
          {new Intl.NumberFormat("US", {
            style: "currency",
            currency: "USD",
          }).format(sumary.withdraws)}
        </strong>
      </div>
      <div className="highlightBackground">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat("US", {
            style: "currency",
            currency: "USD",
          }).format(sumary.total)}
        </strong>
      </div>
    </Container>
  );
}
