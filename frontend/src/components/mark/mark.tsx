import { FC } from "react";
import style from "./mark.module.css";

type Props = {
  mark: number;
};
export const Mark: FC<Props> = ({ mark }) => {
  return (
    <div className={style.ratingResult}>
      {mark > 0 ? <span className={style.active} /> : <span />}
      {mark > 1 ? <span className={style.active} /> : <span />}
      {mark > 2 ? <span className={style.active} /> : <span />}
      {mark > 3 ? <span className={style.active} /> : <span />}
      {mark > 4 ? <span className={style.active} /> : <span />}
    </div>
  );
};