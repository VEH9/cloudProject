import style from "./ReviewHolder.module.css";
import { FC } from "react";
import { TReview } from "../../types/TReview";
import { Mark } from "../mark/mark";

type Props = {
  review: TReview;
};
export const ReviewHolder: FC<Props> = ({ review }) => {
  return (
    <div className={style.wrapper}>
      <div>Автор: {review.userName}</div>
      <span>
        Оценка: <Mark mark={review.mark} />
      </span>
      <div className={style.desc}>Отзыв: {review.description}</div>
    </div>
  );
};