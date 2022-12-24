import React from "react";
import { Panel } from "rsuite";
import Calendar from "./Calendar";

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h5 className="mb-5 font-semibold">CALANDER</h5>
        </>
      }
    >
      <div className="calander">
        <Calendar />
      </div>
    </Panel>
  );
};

export default Page;
