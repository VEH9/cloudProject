import style from "./InfoPanel.module.css";
import { FC } from "react";
import { TReview } from "../../types/TReview";

type Props = {
  reviewList: TReview[];
};

export const InfoPanel: FC<Props> = ({ reviewList }) => {
  let averageRating = (
    reviewList.reduce((sum, val) => sum + val.mark, 0) / reviewList.length
  ).toFixed(2);

  return (
    <div className={style.wrapper}>
      <div className={style.mark}>Средняя оценка: {averageRating}</div>
    </div>
  );
};
