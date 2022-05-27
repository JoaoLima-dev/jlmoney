import { useContext } from 'react';
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionsContext } from '../../transactionsContext';
import { Container } from "./styles";

export function Summary(){
    const { transactions } = useContext(TransactionsContext);

    console.log(transactions);
    return(
        <Container>


            <div>
                <header>
                    <p>Entry</p>
                    <img src={incomeImg} alt="Entry" />
                </header>
                <strong>$1000.00</strong>
            </div>
            <div>
                <header>
                    <p>Exit</p>
                    <img src={outcomeImg} alt="Exit" />
                </header>
                <strong>-$500.00</strong>
            </div>
            <div className='highlightBackground'>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>$500.00</strong>
            </div>
        </Container>
    )
}