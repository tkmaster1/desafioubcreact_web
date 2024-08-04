import React, { Component } from 'react'

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <><aside className="control-sidebar control-sidebar">
      <div className="p-3">
        <h5>Title</h5>
        <p>Sidebar content</p>
      </div>
    </aside><footer className="main-footer">
        <strong>© {year} TKMaster1 Consultoria.</strong>
        &nbsp;Todos os direitos reservados.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.0.0
        </div>
      </footer></>
  )
}
export default Footer;