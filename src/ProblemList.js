import React from "react";
import Problem from "./Problem";
export default function ProblemList(props) {
  return (
    <ul>
      {props.problemsProps.map((problem) => {
        return (
          <Problem
            key={problem.id}
            problem={problem}
            editModeProps={props.editModeProps}
            solveModeProps={props.solveModeProps}
            removeProblemProps={props.removeProblemProps}
            updateExpressionProps={props.updateExpressionProps}
            updateSolutionProps={props.updateSolutionProps}
            updateStudentAnsProps={props.updateStudentAnsProps}
          />
        );
      })}
    </ul>
  );
}
