import React, { useState } from 'react';

const DietPlans = ({ selectedDietPlan, handleDietPlanChange }) => {
  const [dietPlans, setDietPlans] = useState([
    "Weight Loss",
    "Weight Gain"
  ]);

  // const handleAddDietPlan = () => {
  //   const newPlan = prompt("Enter the name of the new diet plan:");
  //   if (newPlan) {
  //     setDietPlans([...dietPlans, newPlan]);
  //   }
  // };

  const handleEditDietPlan = (index) => {
    const editedPlan = prompt("Edit the name of the diet plan:", dietPlans[index]);
    if (editedPlan) {
      const updatedPlans = [...dietPlans];
      updatedPlans[index] = editedPlan;
      setDietPlans(updatedPlans);
    }
  };

  const handleDeleteDietPlan = (index) => {
    const confirmation = window.confirm("Are you sure you want to delete this diet plan?");
    if (confirmation) {
      const updatedPlans = dietPlans.filter((_, i) => i !== index);
      setDietPlans(updatedPlans);
    }
  };

  return (
    <div>
      <label htmlFor="dietPlan" className="block mb-2 font-bold">
        Select Diet Plan
      </label>
      <select
        id="dietPlan"
        value={selectedDietPlan}
        onChange={handleDietPlanChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="" disabled>
          Choose a diet plan
        </option>
        {dietPlans.map((plan, index) => (
          <option key={index} value={plan}>
            {plan}
          </option>
        ))}
      </select>
      {/* <div className="mt-4">
        <button onClick={handleAddDietPlan} className="bg-green-500 text-white py-2 px-4 rounded mr-2">Add Diet Plan</button>
      </div> */}
      {/* <div>
        <h3 className="mt-4 mb-2 font-bold">Edit Diet Plans</h3>
        {dietPlans.map((plan, index) => (
          <div key={index} className="flex items-center justify-between">
            <span>{plan}</span>
            <div>
              <button onClick={() => handleEditDietPlan(index)} className="text-blue-500 mr-2">Edit</button>
              <button onClick={() => handleDeleteDietPlan(index)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div> */}
      {selectedDietPlan && (
        <div className="mt-4">
          <h4 className="font-bold">Selected Diet Plan: {selectedDietPlan}</h4>
        </div>
      )}
    </div>
  );
};

export default DietPlans;
