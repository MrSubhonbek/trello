import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { ListCardType } from "../../../App";
import styles from "./Card.module.css";
import { Modal } from "./Modal/Modal";

interface IProps {
  text: string;
  id: number;
  setData: (neData: Array<ListCardType>) => void;
  data: Array<ListCardType>;
  listId?: number;
}

export const Card: FC<IProps> = ({ text, id, data, setData, listId }) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div
        className={styles.card}
        onClick={() => {
          setActive(true);
          navigate(`?id=${id}`);
        }}
      >
        <p>{text}</p>
      </div>
      <Modal
        active={active}
        setActive={setActive}
        text={text}
        data={data}
        setData={setData}
        listId={listId}
        cardId={id}
      />
    </>
  );
};
