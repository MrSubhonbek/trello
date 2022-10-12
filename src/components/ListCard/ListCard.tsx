import { FC } from "react";
import { CardType, ListCardType } from "../../App";
import { ActionButton } from "../ActionButton/ActionButton";
import { Card } from "./Card/Card";
import styles from "./ListCard.module.css";

interface IProps {
  title: string;
  listId?: number;
  setData: (neData: Array<ListCardType>) => void;
  data: Array<ListCardType>;
  cards: Array<CardType>;
}

export const ListCard: FC<IProps> = ({
  title,
  cards,
  listId,
  data,
  setData,
}) => {
  const handleShowCard = cards.map((card) => {
    return (
      <Card
        key={card.id}
        data={data}
        setData={setData}
        listId={listId}
        id={card.id}
        text={card.text}
      />
    );
  });

  const handleDeleteList = () => {
    let newLists = data.filter((list) => list.id !== listId);
    setData([...newLists]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h4>{title}</h4>
        <button onClick={handleDeleteList} className={styles.button}>
          Delete
        </button>
      </div>
      {handleShowCard}
      <ActionButton data={data} setData={setData} listId={listId} />
    </div>
  );
};
