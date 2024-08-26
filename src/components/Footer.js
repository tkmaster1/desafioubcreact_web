import React, { Component } from 'react'

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <div>
      <aside className="control-sidebar control-sidebar-dark">
        {/* Control sidebar content goes here */}
      </aside>

      <footer className="main-footer">
        <div className="float-right d-none d-sm-inline">
          <b>Version</b> 1.0.0
        </div>
        {/* Default to the left */}
        <strong>© {year} <b>TKMaster1 Consultoria</b>.</strong> &nbsp;Todos os direitos reservados.
      </footer>
    </div>

    // <div className="wrapper">
    //   <aside classname="control-sidebar control-sidebar-dark">       
    //   </aside> style={{ display: 'block' }}
    //   <footer classname="main-footer">
    //     <div classname="float-right d-none d-sm-inline-block">
    //       <b>Version</b> 1.0.0
    //     </div>
    //     <strong>© {year} TKMaster1 Consultoria.</strong>
    //     &nbsp;Todos os direitos reservados.        
    //   </footer>
    // </div>

  )
}
export default Footer;