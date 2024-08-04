import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Link, Route, Routes, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { Form, Radio, Input, Button, Checkbox } from "antd";

import moment from 'moment'
import { format } from "date-fns";
import InputMask from 'react-input-mask';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
registerLocale('ptBR', ptBR);

const Studant = () => {

  const [modalInclude, setModalInclude] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const baseUrl = "https://localhost:44392/api/students";
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  //#region Listagem  

  const [dataStudants, setData] = useState([]);
  const fetchData = useCallback(() => {
    axios({
      "method": "GET",
      "url": baseUrl + '/listall',
      "headers": {}, "params": {}
    })
      .then((response) => {

        const APIResponse = response.data // This is response data from AXIOS

        //  console.log("response: ", APIResponse.data) // This is response data from API

        setData(APIResponse.data) // Only Response from API is set in state

      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  //#endregion

  //#region Inclusão

  const toggle = () => setModalInclude(!modalInclude);
  const [objStudent, setStudentSelected] = useState({
    code: 0,
    name: "",
    age: 0,
    series: 0,
    averageGrade: 0,
    address: "",
    fatherName: "",
    motherName: "",
    dateBirth: ""
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setStudentSelected({
      ...objStudent, [name]: value
    });

    // // Validate if the input is not empty
    // if (!value.trim()) {
    //   setError('This field is required.');
    // } else {
    //   setError('');
    // }

    console.log(objStudent);
  }

  const openCloseModalInclude = () => {
    setModalInclude(!modalInclude);
  }

  const saveNewStudents = async () => {
    //const saveNewStudents = (event) => {
    //  event.preventDefault();
    delete objStudent.code;
    objStudent.name = objStudent.name;
    objStudent.age = parseInt(objStudent.age);
    objStudent.series = parseInt(objStudent.series);

    var formattedDate = format(date, "yyyy-MM-dd'");
    // console.log(formattedDate);
    objStudent.dateBirth = formattedDate
    //console.log(objStudent);

    //Exemplo de como tem que passar a data
    // objStudent.dateBirth = "2012-08-21"

    await axios.post(baseUrl + "/include", objStudent)
      .then(response => {
        setData(dataStudants.concat(response.data));
        fetchData();
        openCloseModalInclude();
      }).catch(error => {
        console.log(error);
      })
  }

  //#endregion

  //#region Alteração

  const toggleEdit = () => setModalEdit(!modalEdit);

  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  }

  const getStudant = (studant, oper) => {
    setStudentSelected(studant);
    (oper === "Editar") ?
      openCloseModalEdit() : openCloseModalDelete();
  }

  const saveChangeStudents = async () => {
    objStudent.name = objStudent.name;
    objStudent.age = parseInt(objStudent.age);
    objStudent.series = parseInt(objStudent.series);

    var formattedDate = format(date, "yyyy-MM-dd'");
    // console.log(formattedDate);
    objStudent.dateBirth = formattedDate
    //console.log(objStudent);

    await axios.put(baseUrl + '/edit', objStudent)
      .then(response => {
        var resposta = response.data;
        var dadosAuxiliar = dataStudants;

        dadosAuxiliar.map(stu => {
          if (stu.code === objStudent.code) {
            stu.name = resposta.name;
            stu.age = resposta.age;
            stu.averageGrade = resposta.averageGrade;
            stu.address = resposta.address;
            stu.fatherName = resposta.fatherName;
            stu.motherName = resposta.motherName;
            stu.dateBirth = resposta.dateBirth;
          }

          fetchData();

        });

        openCloseModalEdit();
      }).catch(error => {
        console.log(error);
      })
  }

  //#endregion

  //#region Exclusão

  const toggleDelete = () => setModalDelete(!modalDelete);

  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  }

  const saveRemoveStudents = async () => {
    await axios.delete(baseUrl + '/delete/' + objStudent.code)
      .then(response => {
        setData(dataStudants.filter(stu => stu.code !== response.data));
        fetchData();
        openCloseModalDelete();
      }).catch(error => {
        console.log(error);
      })
  }

  //#endregion

  return (

    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <BrowserRouter>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Studants</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  {/* <li className="breadcrumb-item"><a href="#">Home</a></li> */}
                  <Link className="breadcrumb-item" to="/" onClick={() => {
                    window.location.href = "/";
                  }}>Home</Link>
                  <li className="breadcrumb-item active">Studants</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
      {/* /.content-header */}
      <section className="content">
        <div className="container-fluid">
          <div className="card-header alert-dark">
            <h3 className="card-title">
              <i className="bi bi-list-check"></i>&nbsp;
              Resultados
            </h3>
            <div className="card-tools">
              <a href="#" onClick={() => openCloseModalInclude()} data-bs-toggle="modal" className="btn btn-success btn-sm">
                <i className="bi bi-plus-square" data-bs-toggle="tooltip" title="Incluir Estudante"></i>
              </a>&nbsp;
              <a href="# " data-toggle="modal" data-target="#RegFormModal" className="btn btn-success btn-sm">
                Open Form Modal</a>
            </div><br />
          </div>
          <br />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Idade</th>
                <th scope="col">Série</th>
                <th scope="col">Nota Média</th>
                <th scope="col">Endereço</th>
                <th scope="col">Nome do Pai</th>
                <th scope="col">Nome da mãe</th>
                <th scope="col">Data de Nascimento</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {dataStudants.length > 0 ? (
                (dataStudants.map((stu, index) => (
                  <tr key={index}>
                    <td>#</td>
                    <td>{stu.name}</td>
                    <td>{stu.age}</td>
                    <td>{stu?.series}</td>
                    <td>{stu?.averageGrade}</td>
                    <td>{stu?.address}</td>
                    <td>{stu?.fatherName}</td>
                    <td>{stu?.motherName}</td>
                    <td>{moment(stu.dateBirth).format("DD/MM/YYYY")}</td>
                    <td>
                      <a href="#" onClick={() => getStudant(stu, "Editar")} className="btn btn-primary btn-sm" role="button" data-bs-toggle="button"><i className="bi bi-pencil-square"></i></a>
                      <a href="#" onClick={() => getStudant(stu, "Excluir")} className="btn btn-danger btn-sm" role="button" data-bs-toggle="button"><i className="bi bi-trash"></i></a>
                    </td>
                  </tr>
                )))
              ) : (
                (<tr>
                  <td className="text-center" colSpan={12}>Nenhum registro encontrado</td>
                </tr>)
              )}
            </tbody>
          </table>

          {/* Modal Incluir */}
          <Modal isOpen={modalInclude} size="lg"
            aria-labelledby="example-custom-modal-styling-title"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <ModalHeader className="modal-header alert alert-dark" toggle={toggle}>
              <i className="bi bi-person-fill-add"></i>&nbsp;Cadastrar Estudante
            </ModalHeader>
            <ModalBody>
              <form>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label">Nome <span className="text-danger">*</span></label>
                      <div className="row row-space-10">
                        <div className="col-12" >
                          <div className="input-group ">
                            <input type="text" className="form-control" placeholder="Nome" name="name" onChange={handleChange} minLength="2" maxLength="256" required />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Idade <span className="text-danger">*</span></label>
                      <div className="row row-space-10">
                        <div className="col-12" >
                          <div className="input-group input-daterange " id="dataInclusaoNoticiaDiv">
                            <input type="number" className="form-control" placeholder="Idade" name="age" onChange={handleChange} min="1" required />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Série</label>
                      <div className="row row-space-10">
                        <div className="col-12" >
                          <input type="number" className="form-control " placeholder="Série" name="series" onChange={handleChange} />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nota média</label>
                      <div className="row row-space-10">
                        <div className="col-12" >
                          <input type="number" className="form-control " placeholder="nota média" step="0.01" name="averageGrade" onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label">Endereço</label>
                      <div className="row row-space-10">
                        <div className="col-12" >
                          <div className="input-group ">
                            <input type="text" className="form-control" placeholder="Endereço" name="address" onChange={handleChange} maxLength="1000" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Data de nascimento <span className="text-danger">*</span></label>
                      <div className="row row-space-10">
                        <div className="col-12" >
                          <div className="input-group input-daterange " id="dataNascimentoStudentsDiv">
                            <main className="Sample__container__content">
                              <DatePicker
                                showIcon
                                selected={date}
                                dateFormat="dd/MM/yyyy"
                                onChange={(date) => setDate(date)}
                                locale={ptBR}
                                className="form-control"
                                name="dateBirth"
                                icon="bi bi-calendar-fill" />
                            </main>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nome do pai</label>
                      <div className="row row-space-10">
                        <div className="col-12" >
                          <input type="text" className="form-control" placeholder="Nome do pai" name="fatherName" onChange={handleChange} minLength="2" maxLength="256" />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nome da mãe</label>
                      <div className="row row-space-10">
                        <div className="col-12" >
                          <div className="input-group ">
                            <input type="text" className="form-control" placeholder="Nome da mãe" name="motherName" onChange={handleChange} maxLength="256" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-secondary" onClick={() => openCloseModalInclude()}>Cancelar</button>
              <button className="btn btn-primary" onClick={() => saveNewStudents()}>Incluir</button>{"   "}
            </ModalFooter>
          </Modal>

          {/* Modal Editar */}
          <Modal isOpen={modalEdit} size="lg"
            aria-labelledby="example-custom-modal-styling-title"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <ModalHeader className="modal-header alert alert-dark" toggle={toggleEdit}>
              <i className="bi bi-person-fill-check"></i>&nbsp;Editar Estudante
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <input type="hidden" name="code" onChange={handleChange}
                  value={objStudent && objStudent.code} required />
                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label className="form-label">Nome <span className="text-danger">*</span></label>
                    <div className="row row-space-10">
                      <div className="col-12" >
                        <div className="input-group ">
                          <input type="text" className="form-control" placeholder="Nome" name="name" minLength="2" maxLength="256" onChange={handleChange}
                            value={objStudent && objStudent.name} required />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Idade <span className="text-danger">*</span></label>
                    <div className="row row-space-10">
                      <div className="col-12" >
                        <div className="input-group input-daterange " id="dataInclusaoNoticiaDiv">
                          <input type="number" className="form-control" placeholder="Idade" name="age" onChange={handleChange} min="1" value={objStudent && objStudent.age} required />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Série</label>
                    <div className="row row-space-10">
                      <div className="col-12" >
                        <input type="number" className="form-control " placeholder="Série" name="series" onChange={handleChange} value={objStudent && objStudent.series} />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nota média</label>
                    <div className="row row-space-10">
                      <div className="col-12" >
                        <input type="number" className="form-control " placeholder="nota média" step="0.01" name="averageGrade" onChange={handleChange}
                          value={objStudent && objStudent.averageGrade} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label className="form-label">Endereço</label>
                    <div className="row row-space-10">
                      <div className="col-12" >
                        <div className="input-group ">
                          <input type="text" className="form-control" placeholder="Endereço" name="address" onChange={handleChange} value={objStudent && objStudent.address} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Data de nascimento <span className="text-danger">*</span></label>
                    <div className="row row-space-10">
                      <div className="col-12" >
                        <div className="input-group input-daterange " id="dataNascimentoStudentsDiv">
                          <main className="Sample__container__content">
                            <DatePicker
                              showIcon={true}
                              selected={objStudent.dateBirth}
                              dateFormat="dd/MM/yyyy"
                              onChange={(date) => setDate(date)}
                              locale={ptBR}
                              className="form-control"
                              name="dateBirth"
                              icon="bi bi-calendar-fill" />
                          </main>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nome do pai</label>
                    <div className="row row-space-10">
                      <div className="col-12" >
                        <input type="text" className="form-control" placeholder="Nome do pai" name="fatherName" onChange={handleChange} value={objStudent && objStudent.fatherName} />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nome da mãe</label>
                    <div className="row row-space-10">
                      <div className="col-12" >
                        <div className="input-group ">
                          <input type="text" className="form-control" placeholder="Nome da mãe" name="motherName" onChange={handleChange} value={objStudent && objStudent.motherName} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={() => saveChangeStudents()}>Salvar</button>{"   "}
              <button className="btn btn-danger" onClick={() => openCloseModalEdit()}>Cancelar</button>
            </ModalFooter>
          </Modal>

          {/* Modal Excluir */}
          <Modal isOpen={modalDelete}>
            <ModalHeader className="modal-header alert alert-dark" toggle={toggleDelete}>
              <h5 className="modal-title"> <i className="bi bi-person-x"></i>&nbsp;Excluir Estudante</h5>
            </ModalHeader>
            <ModalBody>
              <div className="alert alert-muted">
                <b>Atenção!</b><br />
                Tem certeza que deseja excluir o Estudante: <strong>{objStudent && objStudent.name}</strong>?
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-secondary" onClick={() => openCloseModalDelete()} >Fechar</button>
              <button type="button" className="btn btn-danger" onClick={() => saveRemoveStudents()}>Excluir</button>
            </ModalFooter>
          </Modal>

        </div>
      </section >
    </div>
  )
}

export default Studant;