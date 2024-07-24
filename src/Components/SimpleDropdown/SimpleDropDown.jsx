import React from "react";

const SimpleDropDown = ({ DropDownLabel, data, onChange, onClick }) => {
  const handleChange = (event) => {
    const selectedName = event.target.value;
    onChange(selectedName);
  };
  return (
    <div className="mt-3 flex justify-center items-center space-x-3">
      <label for="cars" className="font-bold underline text-sm">
        {DropDownLabel}
      </label>

      <select
        name="cars"
        id="cars"
        className="p-2 rounded-2xl bg-gray-800 bg-opacity-5 backdrop-blur-lg border border-white border-opacity-30 shadow-lg"
        onChange={handleChange}
        onClick={onClick}
      >
        {data &&
          data.map((item, index) => (
            <option value={item?.name} key={index}>
              {item?.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SimpleDropDown;
