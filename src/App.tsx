import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import { ActionButton } from "./components/ActionButton/ActionButton";
import { BrowserRouter } from "react-router-dom";
import { ListCard } from "./components/ListCard/ListCard";
export type CardType = {
  text: string;
  id: number;
};

export type ListCardType = {
  title: string;
  id: number;
  cards: Array<CardType>;
};
export const App = () => {
  const [data, setData] = useState<Array<ListCardType>>(
    // @ts-ignore
    JSON.parse(localStorage.getItem("lists")) || []
  );

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(data));
    window.addEventListener("storage", () => {
      window.location.reload();
    });
  }, [data]);

  const handleShowList = data.map((list) => {
    return (
      <ListCard
        key={list.id}
        listId={list.id}
        title={list.title}
        cards={list.cards}
        data={data}
        setData={setData}
      />
    );
  });

  return (
    <BrowserRouter>
      <div className={styles.listContainer}>
        {handleShowList}
        <ActionButton list data={data} setData={setData} />
      </div>
    </BrowserRouter>
  );
};
