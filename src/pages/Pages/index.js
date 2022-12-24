import React from 'react'
import folder from '../../images/folder.webp'
import './main.css'
function Pages() {
  return (
    <div>
      <h5 className="mb-5 font-semibold">PAGES</h5>
      <div className="page">
        <div>
          <img src={folder} alt="/"/>
          <p>HTML</p>
        </div>
        <div>
          <img src={folder} alt="/"/>
          <p>CSS</p>
        </div>
        <div>
          <img src={folder} alt="/"/>
          <p>JAVASCRIPT</p>
        </div>
        <div>
          <img src={folder} alt="/"/>
          <p>CYBER SOFT</p>
        </div>
      </div>

    </div>
  )
}

export default Pages