import { ChangeEvent, FC, useState } from "react";
import { ListCardType } from "../App";
import { Cancel } from "../asset/icons/Cancel";
import { Plus } from "../asset/icons/Plus";
import styles from "./ActionButton.module.css";
interface IProps {
  list?: boolean;
  listId?: number;
  setData: (neData: Array<ListCardType>) => void;
  data: Array<ListCardType>;
}
export const ActionButton: FC<IProps> = ({ list, setData, data, listId }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [text, setText] = useState<string>("");
  const buttonText = list ? "Add other list" : "Add other card";
  const placeholder = list ? "Enter list title" : "Enter a title for this card";
  const buttonTitle = list ? "Add list" : "Add card";
  const openForm = () => setFormOpen(true);

  const closeForm = () => setFormOpen(false);
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.currentTarget.value);

  const handleAddCard = () => {
    const newCards = {
      text: text,
      id: Math.floor(Math.random() * 100),
    };

    const newState = data.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cards: [...list.cards, newCards],
        };
      } else {
        return list;
      }
    });
    setData(newState);
    setText("");
  };
  const handleAddList = () => {
    const newList = {
      title: text,
      id: Math.floor(Math.random() * 100),
      cards: [],
    };
    setData([...data, newList]);
    setText("");
  };

  if (!formOpen)
    return (
      <div onClick={openForm} className={list ? styles.list : styles.card}>
        <Plus />
        <p>{buttonText}</p>
      </div>
    );
  else
    return (
      <div className={styles.form}>
        <textarea
          placeholder={placeholder}
          autoFocus
          onBlur={closeForm}
          value={text}
          onChange={handleInputChange}
          className={styles.input}
        />
        <div className={styles.buttonGroup}>
          <button
            onMouseDown={list ? handleAddList : handleAddCard}
            className={styles.button}
          >
            {buttonTitle}
          </button>
          <div className={styles.icon}>
            <Cancel />
          </div>
        </div>
      </div>
    );
};
