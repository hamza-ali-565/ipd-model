import React, { useEffect, useState } from "react";
import Select from "react-select";

const ReactSelect = () => {
  let options;

  options = [
    {
      value: "chocolate",
      label: "Chocolate",
      description: "Sweet and creamy",
      category: "Dessert",
      price: "$5",
    },
    {
      value: "strawberry",
      label: "Strawberry",
      description: "Fresh and juicy",
      category: "Fruit",
      price: "$3",
    },
    {
      value: "vanilla",
      label: "Vanilla",
      description: "Classic and smooth",
      category: "Cheese",
      price: "$4",
    },
  ];

  const [filteredOptions, setFilteredOptions] = useState(options);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setFilteredOptions(options); // Reset options on every toggle change
  }, [toggle]);

  const ClearData = () => {
    setFilteredOptions(options);
  };

  const handleInputChange = (inputValue) => {
    if (!inputValue) {
      setFilteredOptions(options);
      return;
    }
    console.log(inputValue);
    //     const lowercasedInput = inputValue.toLowerCase();
    //     const searchResults = options.filter(
    //       (option) =>
    //         option.value.toLowerCase().includes(lowercasedInput) ||
    //         option.category.toLowerCase().includes(lowercasedInput)
    //     );
    //     // setFilteredOptions(searchResults);
    //     options = searchResults;
    //     // setToggle(!toggle); // Update toggle after filtering
  };
  const handleSelectChange = (selectedOption) => {
    // setSelectedOption(selectedOption);
    // You can perform additional actions here with the selectedOption
    console.log("Selected Option:", selectedOption);
  };

  const formatOptionLabel = ({ label, description, category, price }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr 1fr",
        gap: "10px",
      }}
    >
      <span>{label}</span>
      <span>{description}</span>
      <span>{category}</span>
      <span>{price}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-[auto,1fr] items-center gap-x-3">
      <p className="font-bold text-sm">Select Item:</p>
      <Select
        options={options}
        formatOptionLabel={formatOptionLabel}
        onInputChange={(inputValue, { action }) => {
          if (action === "input-change") {
            handleInputChange(inputValue);
          }
        }}
        placeholder="Search..."
        onChange={handleSelectChange}
        isClearable={ClearData}
      />
    </div>
  );
};

export default ReactSelect;
