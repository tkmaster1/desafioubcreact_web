import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (     
      <div className="content-header">
          <div className="container-fluid">
              <div className="row mb-2">
                  <div className="col-sm-6">
                      <h1 className="m-0 text-dark">{breadcrumbs[1].breadcrumb}</h1>
                  </div>
                  <div className="col-sm-6">
                      <nav className="breadcrumb float-sm-right" aria-label="breadcrumb">
                          <ol className="breadcrumb">
                              <Link className="breadcrumb-item" to="/" onClick={() => {
                                  window.location.href = "/";
                              }}>Home</Link>
                              <li className="breadcrumb-item active" aria-current="page">{breadcrumbs[1].breadcrumb}</li>
                          </ol>
                      </nav>
                      {/* <div className="breadcrumb float-sm-right">
                          {breadcrumbs.map(({ breadcrumb, match }, index) => (
                              <div className="bc" key={match.url}>
                                  <Link to={match.url || ""}>{breadcrumb}</Link>
                                  {index < breadcrumbs.length - 1 && "/"}
                              </div>
                          ))}
                      </div> */}
                  </div>
              </div>
          </div>
      </div>     

    //    <BrowserRouter>
    //     <div className="content-header">
    //       <div className="container-fluid">
    //         <div className="row mb-2">
    //           <div className="col-sm-6">
    //             <h1 className="m-0 text-dark">Studants</h1>
    //           </div>
    //           <div className="col-sm-6">
    //             <ol className="breadcrumb float-sm-right">
                  
    //               <Link className="breadcrumb-item" to="/" onClick={() => {
    //                 window.location.href = "/";
    //               }}>Home</Link>
    //               <li className="breadcrumb-item active">Studants</li>
    //             </ol>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </BrowserRouter> 
  );
};

export default Breadcrumbs;