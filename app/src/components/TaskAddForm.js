import React, { useEffect, useState } from "react";

import dayjs from "dayjs";

import * as dbRequest from "../dbRequest";

//Empty add form
const initialState = {
  summary: "",
  description: "",
  estTimeHours: 0,
  estTimeMinutes: 0,
  dueDate: dayjs().toISOString(),
};

function reducer(state, action) {
  switch (action.type) {
    case "editSummary":
      return { ...state, summary: action.value };

    case "editDescription":
      return { ...state, description: action.value };

    case "editEstTimeHours":
      return { ...state, estTimeHours: action.value };

    case "editEstTimeMinutes":
      return { ...state, estTimeMinutes: action.value };

    case "editDueDate":
      return { ...state, dueDate: dayjs(action.value).toISOString() };

    case "wipe":
      return { ...initialState };
    default:
      return state;
  }
}

//ADD FORM, CHILD OF EVENTBOARD
function TaskAddForm({ setTasksList, user }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = state;
      console.log("Attempting to post...", JSON.stringify(body)); // TEST

      const response = await dbRequest.addTask(
        user.timedown.id,
        state.dueDate,
        state.estTimeHours,
        state.estTimeMinutes,
        state.summary,
        state.description,
      );

      const update = JSON.stringify(response);
      window.alert("Task submitted!");

      const data = JSON.parse(update);

      setTasksList(data);

      dispatch({ type: "wipe", value: { initialState } });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <form className="taskAddForm" id="taskSubmission" onSubmit={onSubmitForm}>
        <div className="topper">
          <h3 className="tableTitle">Add New Task</h3>
        </div>
        <label htmlFor="in-Summary">Summary:</label>
        <input
          id="in-Summary"
          type="text"
          value={state.summary}
          onChange={(e) => {
            dispatch({ type: "editSummary", value: e.target.value });
          }}
        />

        <label htmlFor="in-Description">Description:</label>
        <input
          id="in-Description"
          value={state.description}
          type="text"
          rows="10"
          cols="30"
          onChange={(e) => {
            dispatch({ type: "editDescription", value: e.target.value });
          }}
        />

        <h4>Estimated Time Needed</h4>
        <label htmlFor="in-EstTimeHours">Hours:</label>
        <input
          id="in-EstTimeHours"
          type="number"
          min="0"
          value={state.estTime}
          onChange={(e) => {
            dispatch({ type: "editEstTimeHours", value: e.target.value });
          }}
        />
        <label htmlFor="in-EstTimeMinutes">Minutes:</label>
        <input
          id="in-EstTimeMinutes"
          type="number"
          step="5"
          min="0"
          max="55"
          value={state.estTime}
          onChange={(e) => {
            dispatch({ type: "editEstTimeMinutes", value: e.target.value });
          }}
        />

        <label htmlFor="in-DueDate">
          <h4>Due Date:</h4>
        </label>
        <input
          id="in-DueDate"
          type="datetime-local"
          value={state.dueDate}
          onChange={(e) => {
            dispatch({ type: "editDueDate", value: e.target.value });
          }}
        />

        <input id="submitTask" type="submit" />
      </form>
    </>
  );
}

export default TaskAddForm;
