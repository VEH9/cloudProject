import { FC, useState } from "react";
import { Button, Modal, Input, Textarea } from "@skbkontur/react-ui";
import style from "./createReview.module.css";
import { TReview } from "../../types/TReview";
import axios from "axios";

type Props = {
  opened: boolean;
  close: () => void;
  crutch: boolean;
  setCrutch: (value: boolean) => void;
};

export const CreateReview: FC<Props> = ({ opened, close, setCrutch, crutch }) => {
  const [name, setName] = useState("");
  const [mark, setMark] = useState(0);
  const [description, setDescription] = useState("");

  async function makeAnswer() {
    const newReview: TReview = {
      userName: name.replace(/ /g,'') === "" ? "Аноним": name,
      mark: mark,
      description: description.replace(/ /g,'') === "" ? "без комментариев": description,
    };
    await axios.post<TReview>(`https://bba0sbdabs1tka5v68ph.containers.yandexcloud.net/api/reviews/reviews?Name=${newReview.userName}&Description=${newReview.description}&Mark=${newReview.mark}`)
    setCrutch(!crutch);
    setName("");
    setMark(0);
    setDescription("");
  };
  return (
    <>
      {opened && (
        <Modal width={"120%"} onClose={close}>
          <Modal.Header>Оставить отзыв</Modal.Header>
          <Modal.Body>
            <div className={style.form}>
              <label>
                <span>Автор:</span>
                <Input
                  className={style.input}
                  type={"text"}
                  placeholder={"Введите имя"}
                  onValueChange={setName}
                />
              </label>
              <label>
                <span>Оценка:</span>
                <div className={style.rateArea}>
                  <input
                    type="radio"
                    id="star-5"
                    name="rating"
                    value="5"
                    onClick={(value) =>
                      setMark(Number(value.currentTarget.value))
                    }
                  />
                  <label htmlFor="star-5" title="Оценка «5»" />
                  <input
                    type="radio"
                    id="star-4"
                    name="rating"
                    value="4"
                    onClick={(value) =>
                      setMark(Number(value.currentTarget.value))
                    }
                  />
                  <label htmlFor="star-4" title="Оценка «4»" />
                  <input
                    type="radio"
                    id="star-3"
                    name="rating"
                    value="3"
                    onClick={(value) =>
                      setMark(Number(value.currentTarget.value))
                    }
                  />
                  <label htmlFor="star-3" title="Оценка «3»" />
                  <input
                    type="radio"
                    id="star-2"
                    name="rating"
                    value="2"
                    onClick={(value) =>
                      setMark(Number(value.currentTarget.value))
                    }
                  />
                  <label htmlFor="star-2" title="Оценка «2»" />
                  <input
                    type="radio"
                    id="star-1"
                    name="rating"
                    value="1"
                    onClick={(value) =>
                      setMark(Number(value.currentTarget.value))
                    }
                  />
                  <label htmlFor="star-1" title="Оценка «1»" />
                </div>
              </label>
              <label>
                <span>Отзыв:</span>
                <Textarea
                  className={style.input}
                  width={"75%"}
                  placeholder={"Введите свои впечатления"}
                  onValueChange={setDescription}
                />
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className={style.modalButtons}>
              <Button
                className={style.button}
                use="primary"
                onClick={() => {
                  makeAnswer();
                  close();
                }}
              >
                Добавить
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
