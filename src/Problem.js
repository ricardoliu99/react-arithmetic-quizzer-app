import React from "react";
import { MdRefresh, MdClose } from "react-icons/md";
export default function Problem(props) {
  const { id, exp, solution, studentAns } = props.problem;

  return (
    <li className="problem">
      <div style={props.solveModeProps}>
        <p>{props.problem.exp}</p>
        <input
          type="text"
          className="input-text"
          placeholder="Provide your answer"
          value={studentAns}
          onChange={(e) => {
            props.updateStudentAnsProps(e.target.value, id);
          }}
        />
      </div>

      <div style={props.editModeProps}>
        <div className="input-update">
          <button
            onClick={() => props.removeProblemProps(id)}
            style={props.modeProps}
            className="remove-item"
            title="Remove problem"
          >
            <MdClose />
          </button>
          <input
            type="text"
            className="input-text"
            value={exp}
            placeholder="Update problem..."
            onChange={(e) => {
              props.updateExpressionProps(e.target.value, id);
            }}
            onKeyDown={(e) => {
              props.updateSolutionProps(e, e.target.value, id);
            }}
          />
          <button
            onClick={(e) => {
              props.updateSolutionProps(e, exp, id);
            }}
            style={props.modeProps}
            className="input-submit"
            title="Update problem"
          >
            <MdRefresh />
          </button>
        </div>
        <div>Solution: {solution}</div>
      </div>
    </li>
  );
}
