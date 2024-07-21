import React, { } from 'react'
import 'admin-lte/dist/css/adminlte.min.css';

const Home = () => {

    const welcome = 'Bem vindo!'
    const textoIndex = 'Projeto Teste: Desafio UBC'
    const subTextoIndex = 'Aplicação de Front-End em React.js'

    return (
        <div className="content-wrapper">
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="text-center">
                            <h1 className="display-4">{welcome}</h1>
                            <p>{textoIndex}</p>
                            <p className="obrigatorio">{subTextoIndex}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div className="content-wrapper" >
        //     {/* Content Header (Page header) */}
        //     <div className="content-header">
        //         <div className="container-fluid">
        //             &nbsp;
        //         </div>
        //     </div>
        //     <section className="content">
        //         <div className="container-fluid">
        //             <div className="row">
        //                 <div className="col-lg-12">
        //                     <div className="text-center">
        //                         <h1 className="display-4">{welcome}</h1>
        //                         <p>{textoIndex}</p>
        //                         <p className="obrigatorio">{subTextoIndex}</p>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>           
        // </div>       
    );
}

export default Home;