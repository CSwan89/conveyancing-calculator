import { useState } from "react";

export default function ConveyancingCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(0);
  const [customFees, setCustomFees] = useState([{ name: "", amount: 0 }]);

  const transferDuty = propertyPrice > 1000000 ? propertyPrice * 0.03 : 0;
  const deedsOfficeFee = propertyPrice > 0 ? 1200 : 0;
  const conveyancerFee = propertyPrice > 0 ? propertyPrice * 0.01 : 0;

  const totalCustomFees = customFees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
  const totalCost = transferDuty + deedsOfficeFee + conveyancerFee + totalCustomFees;

  const handleFeeChange = (index, field, value) => {
    const updatedFees = [...customFees];
    updatedFees[index][field] = field === "amount" ? parseFloat(value) : value;
    setCustomFees(updatedFees);
  };

  const addFee = () => {
    setCustomFees([...customFees, { name: "", amount: 0 }]);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Conveyancing Cost Calculator</h1>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <label className="block mb-2 font-semibold">Property Purchase Price (ZAR)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={propertyPrice}
          onChange={(e) => setPropertyPrice(Number(e.target.value))}
          placeholder="Enter amount"
        />

        <div className="mt-6">
          <h2 className="font-semibold mb-2">Custom Fees</h2>
          {customFees.map((fee, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded"
                placeholder="Fee Name"
                value={fee.name}
                onChange={(e) => handleFeeChange(index, "name", e.target.value)}
              />
              <input
                type="number"
                className="w-32 p-2 border rounded"
                placeholder="Amount"
                value={fee.amount}
                onChange={(e) => handleFeeChange(index, "amount", e.target.value)}
              />
            </div>
          ))}
          <button onClick={addFee} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">+ Add Fee</button>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Cost Breakdown</h2>
        <div>Transfer Duty: R{transferDuty.toFixed(2)}</div>
        <div>Deeds Office Fee: R{deedsOfficeFee.toFixed(2)}</div>
        <div>Conveyancer Fee: R{conveyancerFee.toFixed(2)}</div>
        <div>Custom Fees Total: R{totalCustomFees.toFixed(2)}</div>
        <hr className="my-2" />
        <div className="font-bold text-xl">Total Estimated Cost: R{totalCost.toFixed(2)}</div>
      </div>
    </div>
  );
}