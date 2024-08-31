import React from "react";
import SpecialityModal from "../Modal/SpecialityModal";
import ButtonDis from "../Button/ButtonDis";

const ModalledInput = ({
  onChangeTextArea,
  onChangeInput,
  onClickAdd,
  onClickLess,
  onClickModal,
  TextAreaValue,
  inputValue,
}) => {
  return (
    <div className="flex justify-around items-center">
      <div className="flex space-x-3 items-center">
        <textarea
          type="text"
          name=""
          id=""
          value={TextAreaValue}
          rows={3}
          cols={40}
          className="bg-transparent border-2 border-black rounded-lg"
          onChange={onChangeTextArea}
        />
        <SpecialityModal title={"MODAL"} onClick={onClickModal} />
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Result"
          name=""
          value={inputValue}
          id=""
          className="bg-transparent border-2 border-black rounded-lg p-2"
          onChange={onChangeInput}
        />
        <ButtonDis title={"Add"} onClick={onClickAdd} />
        <ButtonDis title={"Less"} onClick={onClickLess} />
      </div>
    </div>
  );
};

export default ModalledInput;
