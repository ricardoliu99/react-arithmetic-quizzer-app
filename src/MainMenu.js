import React, { useState, useEffect } from "react";
import AppTitle from "./AppTitle";
import InputProblem from "./InputProblem";
import { v4 as uuidv4 } from "uuid";
import ProblemList from "./ProblemList";
import { MdMode, MdChecklistRtl } from "react-icons/md";
import { GiBroom } from "react-icons/gi";

export default function MainMenu() {
  const [problems, setProblems] = useState(getInitialProblems());
  const [mode, setMode] = useState(false);

  // add a problem to the problems state
  const addProblem = (exp) => {
    let evalExp = "";
    try {
      evalExp = Math.round(eval(exp) * 100) / 100;
    } catch (error) {
      alert("Invalid expression");
      return;
    }
    const newProblem = {
      id: uuidv4(),
      exp: exp,
      solution: evalExp,
      studentAns: "",
    };
    setProblems([...problems, newProblem]);
  };

  const removeProblem = (id) => {
    setProblems(
      problems.filter((problem) => {
        return problem.id !== id;
      })
    );
  };

  let editMode = {};
  let solveMode = {};
  let noClear = {};
  let noVerify = {};

  // switch between edit and solve mode
  const toggleMode = (e) => {
    e.preventDefault();
    setMode((prevSate) => !prevSate);
  };

  // mode = true means hide edit, false means hide solve
  if (mode) {
    editMode = { display: "none" };
  } else {
    solveMode = { display: "none" };
  }

  if (problems.length === 0 || mode) {
    noClear = { display: "none" };
  }

  if (problems.length === 0 || !mode) {
    noVerify = { display: "none" };
  }

  const updateExpression = (exp, id) => {
    setProblems(
      problems.map((problem) => {
        if (problem.id === id) {
          problem.exp = exp;
        }
        return problem;
      })
    );
  };

  const updateSolution = (event, exp, id) => {
    if (event.key === "Enter" || event.type === "click") {
      setProblems(
        problems.map((problem) => {
          if (problem.id === id) {
            try {
              problem.solution = Math.round(eval(exp) * 100) / 100;
            } catch (error) {
              alert("Invalid expression");
            }
          }
          return problem;
        })
      );
    }
  };

  const updateStudentAns = (ans, id) => {
    setProblems(
      problems.map((problem) => {
        if (problem.id === id) {
          problem.studentAns = ans;
        }
        return problem;
      })
    );
  };

  const clearList = () => {
    setProblems([]);
  };

  const verifyAns = () => {
    let grade = 0;
    let correctAns = problems.map((problem) => {
      return problem.solution == problem.studentAns;
    });
    let correct = "";
    for (let i = 0; i < correctAns.length; i++) {
      if (correctAns[i]) {
        correct += i + 1 + ", ";
        grade += 1;
      }
    }
    correct = correct.substring(0, correct.length - 2);
    let pgrade = (grade / correctAns.length) * 100;
    let finalMsg = "";
    if (grade === 0) {
      finalMsg += "All answers are incorrect. ";
    } else if (grade === 1) {
      finalMsg += "Answer " + correct + " is correct. ";
    } else {
      finalMsg += "Answers " + correct + " are correct. ";
    }
    finalMsg += "Your final score is " + pgrade + "%.";
    alert(finalMsg);
  };

  useEffect(() => {
    const temp = localStorage.getItem("problems");
    const loadedProblems = JSON.parse(temp);
    if (loadedProblems) {
      setProblems(loadedProblems);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(problems);
    localStorage.setItem("problems", temp);
  }, [problems]);

  function getInitialProblems() {
    const temp = localStorage.getItem("problems");
    const savedProblems = JSON.parse(temp);
    return savedProblems || [];
  }

  return (
    <>
      <button onClick={toggleMode} className="toggle-mode">
        <MdMode />
      </button>

      <div className="container">
        <AppTitle />

        <div style={editMode}>
          <InputProblem addProblemProp={addProblem} />
        </div>

        <ProblemList
          problemsProps={problems}
          editModeProps={editMode}
          solveModeProps={solveMode}
          removeProblemProps={removeProblem}
          updateExpressionProps={updateExpression}
          updateSolutionProps={updateSolution}
          updateStudentAnsProps={updateStudentAns}
        />

        <button
          onClick={clearList}
          style={noClear}
          className="clear-submit"
          title="Clear all"
        >
          <GiBroom />
        </button>

        <button
          onClick={verifyAns}
          style={noVerify}
          className="verify-submit"
          title="Check answers"
        >
          <MdChecklistRtl />
        </button>
      </div>
    </>
  );
}
