import React, { memo } from "react";
import { Handle } from "reactflow";

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <div>
        <p style={{ marginTop: 0 }}>{data.label}</p>
      </div>
      <input
        className="nodrag"
        type="text"
        onChange={data.onInpChange}
        defaultValue={data.inp}
      />
      <Handle
        type="source"
        position="right"
        style={{ top: 30, background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
});
