import React from "react";
import DropMr from "../DropMr/DropMr";
import SimpleInput from "../SimpleInput/SimpleInput";

const LabelledDropInput = ({
  label,
  data,
  placeholder,
  onChange,
  value,
  onChangeDrop,
}) => {
  return (
    <div className="grid grid-cols-[auto,auto,auto] md:gap-x-2 md:w-96 items-center">
      <p className="text-sm">{label}:</p>
      <DropMr data={data} onChange={onChangeDrop} />
      <SimpleInput
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default LabelledDropInput;
