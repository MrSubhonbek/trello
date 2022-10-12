import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router";
import { ListCardType } from "../App";
import styles from "./Modal.module.css";
interface IProps {
  active: boolean;
  setActive: (value: boolean) => void;
  text: string;
  setData: (neData: Array<ListCardType>) => void;
  data: Array<ListCardType>;
  listId?: number;
  cardId: number;
}

export const Modal: FC<IProps> = ({
  active,
  setActive,
  text,
  data,
  setData,
  listId,
  cardId,
}) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(text);
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.currentTarget.value);

  const handleChangeCard = () => {
    console.log(data);

    let list = data.find((list) => list.id === listId);
    let card = list?.cards.find((card) => card.id === cardId);
    if (card) {
      card.text = input;
    }
    setData([...data]);
    setActive(false);
    navigate("/");
  };
  const handleDeleteCard = () => {
    let list = data.find((list) => list.id === listId);
    let card = list?.cards.filter((card) => card.id !== cardId);
    const newState = data.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cards: card,
        };
      } else {
        return list;
      }
    });
    console.log(card);
    // @ts-ignore
    setData([...newState]);
    setActive(false);
    navigate("/");
  };
  if (!active) return null;
  return (
    <div>
      <div
        onClick={() => {
          setActive(false);
          navigate("/");
        }}
        className={styles.overlay}
      />
      <div className={styles.modal}>
        <textarea
          className={styles.input}
          value={input}
          onChange={handleInputChange}
        />
        <div className={styles.buttonGroup}>
          <button onClick={handleChangeCard} className={styles.button}>
            Save
          </button>
          <button onClick={handleDeleteCard} className={styles.button}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
