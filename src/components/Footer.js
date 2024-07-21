import React, { Component } from 'react'

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  
  return (   
      <footer className="main-footer">
        <strong>© {year} TKMaster1 Consultoria.</strong>
        &nbsp;Todos os direitos reservados.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.0.0
        </div>
      </footer>    
  )
}
export default Footer;