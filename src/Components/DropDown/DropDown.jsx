import React from "react";

const DropDown = ({ data, onClick, onChange }) => {
  const handleChange = (event) => {
    const selectedName = event.target.value;
    onChange(selectedName);
  };
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border items-center border-white border-opacity-30 shadow-lg mt-4 mx-4  p-3 rounded-3xl flex justify-center space-x-4">
      <label for="cars" className="font-bold underline">
        Choose Page Type:
      </label>

      <select
        name="cars"
        id="cars"
        className="p-2 rounded-2xl bg-gray-800 bg-opacity-5 backdrop-blur-lg border border-white border-opacity-30 shadow-lg"
        onClick={onClick}
        onChange={handleChange}
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

export default DropDown;
