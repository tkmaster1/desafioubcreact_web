import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import moment from 'moment'

function App() {

  const [modalInclude, setModalInclude] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  //#region Listagem

  // const baseUrl="https://localhost:44392/api/Students/listall";
  const baseUrl = "https://localhost:44392/api/Students/";

  const [dataStudants, setData] = useState([]);
  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": baseUrl + 'listall',
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

  // const [modalIncluir, setModalIncluir] = useState(false);

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
    console.log(objStudent);
  }

  const toggle = () => setModalInclude(!modalInclude);

  const openCloseModalInclude = () => {
    setModalInclude(!modalInclude);
  }

  const requestPost = async () => {
    delete objStudent.code;
    objStudent.name = objStudent.name;
    objStudent.age = parseInt(objStudent.age);
    objStudent.series = parseInt(objStudent.series);

    console.log(objStudent);

    await axios.post(baseUrl + 'include', objStudent)
      .then(response => {
        setData(dataStudants.concat(response.data));
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

  const getStudant = (studant, caso) => {
    setStudentSelected(studant);
    (caso === "Editar") ?
      openCloseModalEdit() : openCloseModalDelete();
  }

  //#endregion

  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  }

  return (
    <div className="content-wrapper">
      {/* <div className="App">*/}
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Studants</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Studants</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      <section className="content">
        <div className="container-fluid">
          <div class="card-header alert-dark">
            <h3 class="card-title">
              <i class="bi bi-list-check"></i>&nbsp;
              Resultados
            </h3>
            <div class="card-tools">
              <a href="#" onClick={() => openCloseModalInclude()} data-bs-toggle="modal" class="btn btn-success btn-sm">
                <i class="bi bi-plus-square" data-bs-toggle="tooltip" title="Incluir Estudante"></i>
              </a>
            </div><br />
          </div>
          <br />
          <table class="table table-bordered">
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
              {dataStudants.map((stu, index) => (
                <tr key={index}>
                  <td>#</td>
                  <td>{stu.name}</td>
                  <td>{stu.age}</td>
                  <td>{stu?.series}</td>
                  <td>{stu?.averageGrade}</td>
                  <td>{stu?.address}</td>
                  <td>{stu?.fatherName}</td>
                  <td>{stu?.motherName}</td>
                  <td>{moment(stu.dateBirth).format("DD/MM/yyyy")}</td>
                  <td>
                    <a href="#" onClick={() => getStudant(stu, "Editar")} class="btn btn-primary btn-sm" role="button" data-bs-toggle="button"><i class="bi bi-pencil-square"></i></a>
                    <a href="#" class="btn btn-danger btn-sm" role="button" data-bs-toggle="button"><i class="bi bi-trash"></i></a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal  */}
          <Modal isOpen={modalInclude} size="lg"
            aria-labelledby="example-custom-modal-styling-title"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <ModalHeader toggle={toggle}><i class="bi bi-person-fill-add"></i>&nbsp;Cadastrar Estudante</ModalHeader>
            <ModalBody>
              <div className="form-group">
                <div class="row">
                  <div class="col-md-8 mb-3">
                    <label class="form-label">Nome <span class="text-danger">*</span></label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <div class="input-group ">
                          <input type="text" class="form-control" placeholder="Nome" name="name" onChange={handleChange} minLength="2" maxlength="256" required />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Idade <span class="text-danger">*</span></label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <div class="input-group input-daterange " id="dataInclusaoNoticiaDiv">
                          <input type="number" class="form-control" placeholder="Idade" name="age" onChange={handleChange} min="1" required />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Série</label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <input type="number" class="form-control " placeholder="Série" name="series" onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Nota média</label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <input type="number" class="form-control " placeholder="nota média" step="0.01" name="averageGrade" onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-8 mb-3">
                    <label class="form-label">Endereço</label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <div class="input-group ">
                          <input type="text" class="form-control" placeholder="Endereço" name="address" onChange={handleChange} maxlength="1000" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <label class="form-label">Data de nascimento <span class="text-danger">*</span></label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <div class="input-group input-daterange " id="dataNascimentoStudentsDiv">
                          <input type="text" class="form-control data" name="dateBirth" placeholder="Data de nascimento"
                            id="dataNascimentoStudentsRef"
                            data-maska="##/##/####" minLength="10"
                            maxlength="10" onChange={handleChange} required />
                          <label class="input-group-text" ><i class="bi bi-calendar-fill"></i></label>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Nome do pai</label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <input type="text" class="form-control" placeholder="Nome do pai" name="fatherName" onChange={handleChange} minLength="2" maxlength="256" />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Nome da mãe</label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <div class="input-group ">
                          <input type="text" class="form-control" placeholder="Nome da mãe" name="motherName" onChange={handleChange} maxlength="256" />

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={() => requestPost()}>Incluir</button>{"   "}
              <button className="btn btn-danger" onClick={() => openCloseModalInclude()}>Cancelar</button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={modalEdit} size="lg"
            aria-labelledby="example-custom-modal-styling-title"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <ModalHeader toggle={toggleEdit}><i class="bi bi-person-fill-check"></i>&nbsp;Editar Estudante</ModalHeader>
            <ModalBody>
              <div className="form-group">
                <input type="hidden" name="code" onChange={handleChange}
                  value={objStudent && objStudent.code} required />
                <div class="row">
                  <div class="col-md-8 mb-3">
                    <label class="form-label">Nome <span class="text-danger">*</span></label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <div class="input-group ">
                          <input type="text" class="form-control" placeholder="Nome" name="name" minLength="2" maxlength="256" onChange={handleChange}
                            value={objStudent && objStudent.name} required />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Idade <span class="text-danger">*</span></label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <div class="input-group input-daterange " id="dataInclusaoNoticiaDiv">
                          <input type="number" class="form-control" placeholder="Idade" name="age" onChange={handleChange} min="1" value={objStudent && objStudent.age} required />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Série</label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <input type="number" class="form-control " placeholder="Série" name="series" onChange={handleChange} value={objStudent && objStudent.series} />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Nota média</label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <input type="number" class="form-control " placeholder="nota média" step="0.01" name="averageGrade" onChange={handleChange}
                          value={objStudent && objStudent.averageGrade} />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-8 mb-3">
                    <label class="form-label">Endereço</label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <div class="input-group ">
                          <input type="text" class="form-control" placeholder="Endereço" name="address" onChange={handleChange} value={objStudent && objStudent.address} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <label class="form-label">Data de nascimento <span class="text-danger">*</span></label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <div class="input-group input-daterange " id="dataNascimentoStudentsDiv">
                          <input type="text" class="form-control data" name="dateBirth" placeholder="Data de nascimento"
                            id="dataNascimentoStudentsRef"
                            data-maska="##/##/####" onChange={handleChange} value={objStudent && objStudent.dateBirth} required />
                          <label class="input-group-text" ><i class="bi bi-calendar-fill"></i></label>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Nome do pai</label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <input type="text" class="form-control" placeholder="Nome do pai" name="fatherName" onChange={handleChange} value={objStudent && objStudent.fatherName} />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Nome da mãe</label>
                    <div class="row row-space-10">
                      <div class="col-12" >
                        <div class="input-group ">
                          <input type="text" class="form-control" placeholder="Nome da mãe" name="motherName" onChange={handleChange} value={objStudent && objStudent.motherName} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={() => requestPost()}>Salvar</button>{"   "}
              <button className="btn btn-danger" onClick={() => openCloseModalEdit()}>Cancelar</button>
            </ModalFooter>
          </Modal>
        </div>{/* /.container-fluid */}
      </section>
    </div>

  )
}

export default App;