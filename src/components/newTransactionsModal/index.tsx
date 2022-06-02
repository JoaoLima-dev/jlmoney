import { FormEvent, useState, useContext } from "react";
import { TransactionsContext } from "../../transactionsContext";
import Modal from "react-modal";
import { api } from "../../services/api";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    createTransaction({
      title,
      amount,
      category,
      type,
    });

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <img src={closeImg} alt="close Modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Register Transaction</h2>

          <input
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <input
            type="number"
            placeholder="Value"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))} //aways returns a string, so i need change the string to number using Number or parseInt(when u dont need use parcial numbers)
          />

          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => {
                setType("deposit");
              }}
              isActive={type === "deposit"}
              activeColor="green"
            >
              <img src={incomeImg} alt="Entry" />
              <span>Entry</span>
            </RadioBox>

            <RadioBox
              type="button"
              onClick={() => {
                setType("withdraw");
              }}
              isActive={type === "withdraw"}
              activeColor="red"
            >
              <img src={outcomeImg} alt="Exit" />
              <span>Exit</span>
            </RadioBox>
          </TransactionTypeContainer>
          <input
            placeholder="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />

          <button type="submit">Register</button>
        </Container>
      </Modal>
    );
  }
}
