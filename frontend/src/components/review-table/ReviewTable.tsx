import style from './ReviewTable.module.css'
import {FC} from "react";
import {ReviewHolder} from "../revie-holder/ReviewHolder";
import {TReview} from "../../types/TReview";

type Props = {
    reviewList: TReview[];
}
export const ReviewTable: FC<Props> = ({reviewList}) => {
    let n = 0;
    return (
        <div className={style.wrapper}>
            <div className={style.form}>
                {reviewList?.map((review) =>
                    <div key={n++}>
                        <ReviewHolder review={review}/>
                    </div>)}
            </div>
        </div>
    );
};