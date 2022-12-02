import React, { memo, useEffect, useState } from "react";
import { Handle } from "reactflow";
import Rotor from "./Rotor";

const letterArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];
const linkage = [
  15,
  22,
  19,
  25,
  17,
  23,
  21,
  18,
  20,
  16,
  13,
  24,
  14,
  10,
  12,
  0,
  9,
  4,
  7,
  2,
  8,
  6,
  1,
  5,
  11,
  3
];

const defaultState = {
  array1: [
    [0, 18],
    [1, 23],
    [2, 5],
    [3, 2],
    [4, 25],
    [5, 3],
    [6, 8],
    [7, 22],
    [8, 9],
    [9, 1],
    [10, 20],
    [11, 7],
    [12, 13],
    [13, 14],
    [14, 4],
    [15, 0],
    [16, 17],
    [17, 16],
    [18, 6],
    [19, 12],
    [20, 21],
    [21, 11],
    [22, 19],
    [23, 24],
    [24, 10],
    [25, 15]
  ],
  array2: [
    [0, 16],
    [1, 19],
    [2, 21],
    [3, 22],
    [4, 6],
    [5, 7],
    [6, 4],
    [7, 24],
    [8, 2],
    [9, 3],
    [10, 9],
    [11, 0],
    [12, 25],
    [13, 12],
    [14, 1],
    [15, 15],
    [16, 10],
    [17, 8],
    [18, 17],
    [19, 20],
    [20, 23],
    [21, 13],
    [22, 11],
    [23, 14],
    [24, 18],
    [25, 5]
  ],
  array3: [
    [0, 3],
    [1, 20],
    [2, 10],
    [3, 25],
    [4, 1],
    [5, 23],
    [6, 15],
    [7, 22],
    [8, 13],
    [9, 0],
    [10, 11],
    [11, 5],
    [12, 24],
    [13, 6],
    [14, 12],
    [15, 4],
    [16, 14],
    [17, 9],
    [18, 17],
    [19, 7],
    [20, 18],
    [21, 16],
    [22, 21],
    [23, 19],
    [24, 8],
    [25, 2]
  ]
};

export default memo(({ id, data, isConnectable }) => {
  const [state, setState] = useState(defaultState);

  const [RotorsCombo, setRotorsCombo] = useState("");

  const shuffle = (num) => {
    for (let i = 0; i < num; i++) {
      const shift = state.array1.shift();
      state.array1.push(shift);
      if (state.array1[0][0] === 0) {
        const shift = state.array2.shift();
        state.array2.push(shift);
        if (state.array2[0][0] === 0) {
          const shift = state.array3.shift();
          state.array3.push(shift);
        }
      }
      setState({
        array1: state.array1,
        array2: state.array2,
        array3: state.array3
      });
    }
  };
  const reset = (e) => {
    const randomNum = Math.floor(Math.random() * 1700);
    shuffle(randomNum);
    setRotorsCombo(
      `${state.array3[0][0]} ${state.array2[0][0]} ${state.array1[0][0]}`
    );
    id === "2" ? data.setOp("") : data.setOp2("");
  };
  const handleUp = (e) => {
    const name = e.target.name;
    const newArray = state[name];
    const shift = newArray.shift();
    newArray.push(shift);
    setState({
      ...state,
      name: newArray
    });
    setRotorsCombo(
      `${state.array3[0][0]} ${state.array2[0][0]} ${state.array1[0][0]}`
    );
  };
  const handleDown = (e) => {
    const name = e.target.name;
    const newArray = state[name];
    const pop = newArray.pop();
    newArray.unshift(pop);
    setState({
      ...state,
      name: newArray
    });
    setRotorsCombo(
      `${state.array3[0][0]} ${state.array2[0][0]} ${state.array1[0][0]}`
    );
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (data.inp !== "") {
      if (!letterArray.includes(data.inp.at(-1))) {
        data.setOp((prev) => prev.concat(data.inp.at(-1)));
      } else {
        const selectedLetter = letterArray.indexOf(data.inp.at(-1));
        const firstRotor = state.array1[selectedLetter][1];
        const secRotor = state.array2[firstRotor][1];
        const thirdRotor = state.array3[secRotor][1];
        const linkIndex = linkage[thirdRotor];

        const thirdRotorSetting = state.array3.filter(
          (item) => item[1] === linkIndex
        );
        const secRotorSetting = state.array2.filter(
          (item) => item[1] === state.array3.indexOf(thirdRotorSetting[0])
        );
        const firstRotorSetting = state.array1.filter(
          (item) => item[1] === state.array2.indexOf(secRotorSetting[0])
        );
        const finalLetterIndex = state.array1.indexOf(firstRotorSetting[0]);
        const finalLetter = letterArray[finalLetterIndex];

        data.setOp((prev) => prev.concat(finalLetter));

        shuffle(1);
      }
    } else {
      reset();
    }
  }, [data]);

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
      <div>
        <p style={{ marginTop: 0 }}>{data.label}</p>
      </div>
      <Handle
        type="target"
        position="left"
        style={{ top: 30, background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      {/* Rotors */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "auto",
          justifyContent: "center"
        }}
      >
        <Rotor
          name="array3"
          handleUp={handleUp}
          handleDown={handleDown}
          display={state.array3}
        />
        <Rotor
          name="array2"
          handleUp={handleUp}
          handleDown={handleDown}
          display={state.array2}
        />
        <Rotor
          name="array1"
          handleUp={handleUp}
          handleDown={handleDown}
          display={state.array1}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "auto",
          justifyContent: "center",
          overflowWrap: "break-word"
        }}
      >
        <p> Rotor : {RotorsCombo} </p>
        <p> Input : {data.inp} </p>
        {/* <p>{RotorsCombo}</p>
        <p> OP </p>
        <p>{data.op}</p> */}
      </div>

      <Handle
        type="source"
        position="right"
        style={{ top: 30, background: "#555" }}
        isConnectable={isConnectable}
      />
    </div>
  );
});
