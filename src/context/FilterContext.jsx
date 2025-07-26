import { createContext, useState, useContext } from "react";

const FilterContext = createContext();

function FilterContextProvider({ children }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const contextValue = {
    activeFilter,
    setActiveFilter,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}

const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterContextProvider");
  }
  return context;
};

export { FilterContext, useFilter };
export default FilterContextProvider; 