import React, { useState } from "react";

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function PasswordGenerator({ onGenerate }) {

  const [length, setLength] = useState(12);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [onlyString, setOnlyString] = useState(false);
  const [firstLetterAlpha, setFirstLetterAlpha] = useState(true);

  const generatePassword = () => {

    let charset = LETTERS;

    if (!onlyString) {
      if (useNumbers) charset += NUMBERS;
      if (useSymbols) charset += SYMBOLS;
    }

    let password = "";

    if (firstLetterAlpha) {
      password += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
    }

    for (let i = password.length; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    onGenerate(password);
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-400 mt-4">
      <h3 className="text-sm font-semibold mb-2">Generate Password</h3>

      <div className="flex items-center justify-between mb-2">
        <label>Password Length</label>
        <input type="number" min="6" max="30"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-16 border border-gray-400 px-2 rounded"
        />
      </div>

      <div className="flex gap-3 mt-4 text-sm flex-wrap">
        <label><input type="checkbox" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} /> Numbers</label>
        <label><input type="checkbox" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)} /> Symbols</label>
        {/* <label><input type="checkbox" checked={onlyString} onChange={() => setOnlyString(!onlyString)} /> Only String</label> */}
        <label><input type="checkbox" checked={firstLetterAlpha} onChange={() => setFirstLetterAlpha(!firstLetterAlpha)} /> First letter alphabet</label>
      </div>

      <button
        onClick={generatePassword}
        className="mt-3 w-full bg-indigo-500 text-white rounded-lg py-1 hover:bg-indigo-600"
      >
        Generate Password
      </button>
    </div>
  );
}
