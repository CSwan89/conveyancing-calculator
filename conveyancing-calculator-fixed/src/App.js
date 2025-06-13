
import React, { useState } from "react";

function App() {
  const [entries, setEntries] = useState([{ label: "", amount: "" }]);

  const handleChange = (index, key, value) => {
    const updated = [...entries];
    updated[index][key] = value;
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, { label: "", amount: "" }]);
  };

  const total = entries.reduce((sum, entry) => {
    const amount = parseFloat(entry.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1>Conveyancing Cost Calculator</h1>
      {entries.map((entry, idx) => (
        <div key={idx} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <input
            type="text"
            placeholder="Description"
            value={entry.label}
            onChange={(e) => handleChange(idx, "label", e.target.value)}
            style={{ flex: 2 }}
          />
          <input
            type="number"
            placeholder="Amount"
            value={entry.amount}
            onChange={(e) => handleChange(idx, "amount", e.target.value)}
            style={{ flex: 1 }}
          />
        </div>
      ))}
      <button onClick={addEntry} style={{ marginBottom: 20 }}>Add Entry</button>
      <h2>Total: R {total.toFixed(2)}</h2>
    </div>
  );
}

export default App;
