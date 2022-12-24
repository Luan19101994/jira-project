import React from 'react'
import Table from '../../components/issues/Table'
import './main.css'
function Issues() {
  return (
    <div className="issue">
      <h5 className="mb-5 font-semibold">ISSUES</h5>
      <div className="">
        <Table />
      </div>
    </div>
  )
}

export default Issues