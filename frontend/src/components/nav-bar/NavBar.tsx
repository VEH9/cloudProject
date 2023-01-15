import style from './NavBar.module.css'
import {FC, useState} from "react";
import {CreateReview} from "../create-review/createReview";
import {TReview} from "../../types/TReview";


type Props = {
    setData: (value: TReview[]) => void;
    data: TReview[];
}
export const NavBar: FC<Props> = ({setData, data}) => {
    const [opened, setOpened] = useState(false);
    const openModal = () => {
        setOpened(true);
    }

    const closeModal = () => {
        setOpened(false);
    }

    return (
        <div className={style.wrapper}>
            <CreateReview opened={opened} close={closeModal} setData={setData} data={data}/>
            <div className={style.navBar}>
                <div className={style.logo} >
                    <div><h2>Аватарики</h2></div>
                </div>
                <div className={style.userPanel}>
                    <button onClick={()=>openModal()}>+добавить отзыв</button>
                </div>
            </div>
            <div style={{ paddingTop: 50 }}/>
        </div>
    );
};
