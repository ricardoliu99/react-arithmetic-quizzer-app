import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function InputProblem(props) {
  const [inputExp, setInputExp] = useState({
    expression: "",
  });

  const handleChange = (e) => {
    setInputExp({
      ...inputExp,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputExp.expression.trim()) {
      props.addProblemProp(inputExp.expression);
      setInputExp({
        expression: "",
      });
    } else {
      alert("Invalid expression");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        className="input-text"
        placeholder="Provide expression"
        value={inputExp.expression}
        name="expression"
        onChange={handleChange}
      />
      <button className="input-submit" title="Add new problem">
        <FiPlus />
      </button>
    </form>
  );
}
