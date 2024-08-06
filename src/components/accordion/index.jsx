import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordion() {
  // State for single selection mode, stores the currently selected item's ID
  const [selected, setSelected] = useState(null);

  // State to toggle between single and multi-selection modes
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);

  // State for multiple selection mode, stores an array of selected item IDs
  const [multiple, setMultiple] = useState([]);

  // Handler for single selection mode
  function handleSingleSelection(getCurrentId) {
    // Toggle the selected item; if the item is already selected, deselect it
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  // Handler for multi-selection mode
  function handleMultiSelection(getCurrentId) {
    // Create a copy of the current selected items
    let cpyMultiple = [...multiple];

    // Find the index of the current item in the array
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

    // Log the index for debugging
    console.log(findIndexOfCurrentId);

    // Add or remove the item based on its presence in the array
    if (findIndexOfCurrentId === -1) {
      cpyMultiple.push(getCurrentId); // Add if not present
    } else {
      cpyMultiple.splice(findIndexOfCurrentId, 1); // Remove if present
    }

    // Update the state with the modified array
    setMultiple(cpyMultiple);
  }

  // Log current state values for debugging
  console.log(selected, multiple);

  return (
    <div className="acc-wrapper">
      {/* Button to toggle between single and multi-selection modes */}
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className="accordian">
        {/* Render each item if data is available */}
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              {/* Click handler switches between single and multi-selection modes */}
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {/* Conditionally render the content based on the selection mode */}
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                  <div className="acc-content">{dataItem.answer}</div>
                )
                : selected === dataItem.id && (
                  <div className="acc-content">{dataItem.answer}</div>
                )}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}
