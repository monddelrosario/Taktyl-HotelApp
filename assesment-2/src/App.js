import React, { Fragment, useEffect, useState } from "react";

import "./App.css";
const Card = ({
  data,
  handleRoomStatusChange,
  handleAdultChange,
  handleChildChange,
}) => {
  const { id, label, active } = data;
  return (
    <Fragment>
      <div
        className="Card"
        style={{ backgroundColor: active ? "whitesmoke" : "lightgray" }}
      >
        <div className="row padding">
          <label className="label-container">
            {label}
            {id !== 1 && (
              <>
                <input
                  id={id}
                  type="checkbox"
                  checked={active}
                  value={active}
                  onChange={handleRoomStatusChange}
                />
                <span className="checkmark" />
              </>
            )}
          </label>
        </div>
        <div className="row margin innerContainer">
          <div className="margin">
            <p>
              Adults
              <br /> (18+)
            </p>

            <select
              disabled={!active}
              value={data.adultCount}
              onChange={handleAdultChange}
              id={id}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="margin">
            <p>
              Children
              <br /> (0-17)
            </p>
            <select
              disabled={!active}
              value={data.childCount}
              onChange={handleChildChange}
              id={id}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

function App() {
  const initialState = [
    {
      id: 1,
      label: "Room 1",
      active: true,
      adultCount: 0,
      childCount: 0,
    },
    {
      id: 2,
      label: "Room 2",
      active: false,
      adultCount: 0,
      childCount: 0,
    },
    {
      id: 3,
      label: "Room 3",
      active: false,
      adultCount: 0,
      childCount: 0,
    },
    {
      id: 4,
      label: "Room 4",
      active: false,
      adultCount: 0,
      childCount: 0,
    },
  ];
  const [state, setState] = useState(initialState);

  const handleRoomStatusChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const id = +target.id;

    if (value) {
      for (let x = id; x > 0; x--) {
        setState([
          ...state.map((item) => {
            if (x !== 1) {
              if (item.id === x) {
                item.active = value;
              }
            }

            return item;
          }),
        ]);
      }
    } else {
      for (let x = 0; x <= 4; x++) {
        setState([
          ...state.map((item) => {
            if (x !== 1) {
              if (item.id >= id) {
                item.active = value;
                if (!value) {
                  item.adultCount = 1;
                  item.childCount = 0;
                }
              }
            }

            return item;
          }),
        ]);
      }
    }

    console.log("room status state!!! : ", state);
  };

  const handleAdultChange = (event) => {
    const target = event.target;
    const value = target.value;
    const id = +target.id;
    setState([
      ...state.map((item) => {
        if (item.id === id) {
          item.adultCount = value;
        }
        return item;
      }),
    ]);
    console.log("adult change state!!! : ", state);
  };

  const handleChildChange = (event) => {
    const target = event.target;
    const value = target.value;
    const id = +target.id;

    setState([
      ...state.map((item) => {
        if (item.id === id) {
          item.childCount = value;
        }
        return item;
      }),
    ]);
    console.log("adult change state!!! : ", state);
  };

  const handleOnClickSubmit = () => {
    localStorage.clear();
    localStorage.setItem("rooms", JSON.stringify(state));
    const result = JSON.parse(localStorage.getItem("rooms"));
    console.log("get data", result);
    alert("Rooms data saved successfully!");
  };

  useEffect(() => {
    const load = () => {
      const result = JSON.parse(localStorage.getItem("rooms"));
      console.log("first load data", result);
      const final = result || initialState;
      console.log("final to set ", final);
      setState(final);
    };
    load();
  }, []);

  return (
    <>
      <div className="container">
        {state.map((l, i) => {
          return (
            <Card
              key={i}
              data={l}
              handleAdultChange={handleAdultChange}
              handleChildChange={handleChildChange}
              handleRoomStatusChange={handleRoomStatusChange}
            />
          );
        })}
      </div>
      <div className="container margin">
        <button className="padding" onClick={handleOnClickSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}

export default App;
