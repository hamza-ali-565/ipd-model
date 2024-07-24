import React from "react";

const AgeInput = ({
  onChangeY,
  onChangeM,
  onChangeD,
  valueY,
  valueM,
  valueD,
}) => {
  return (
    <div className="grid grid-cols-[auto,auto,auto,auto] md:gap-x-2 md:w-80 items-center">
      <p className="text-sm">Age:</p>
      <input
        type="number"
        className="w-14 md:w-24 p-1 pl-2 border-2 border-gray-500 rounded-2xl text-sm"
        placeholder="Year"
        name=""
        id=""
        onChange={onChangeY}
        value={valueY}
      />
      <input
        type="number"
        className="w-14 md:w-24 p-1 pl-2 border-2 border-gray-500 rounded-2xl text-sm"
        placeholder="Month"
        name=""
        id=""
        onChange={onChangeM}
        value={valueM}
      />
      <input
        type="number"
        className="w-14 md:w-24 p-1 pl-2 border-2 border-gray-500 rounded-2xl text-sm"
        placeholder="Day"
        name=""
        id=""
        onChange={onChangeD}
        value={valueD}
      />
    </div>
  );
};

export default AgeInput;
