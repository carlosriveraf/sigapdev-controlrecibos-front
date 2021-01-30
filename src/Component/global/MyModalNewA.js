import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import "./css/DatosCSS.css";
import URL from "./API/API";
import "./css/bootstrap.css";
import "./css/NewC.css";
import "./css/ListarComprobanteNewC.css";
import Swal from 'sweetalert2';

var datosAlumno;
var programas = {};

class MyModal extends Component {
  constructor() {
    super();
    this.handlerGuardar = this.handlerGuardar.bind(this);
    this.state = {
      fields: {},
      errors: {},
      flag: "true"
    };
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    // Dni
    if (typeof fields["dni_m"] !== "undefined") {
      if (!fields["dni_m"].match(/^[0-9]{8}$/)) {
        formIsValid = false;
        errors["dni_m"] = "*Dni inválido";
      }
    }
    
    // Código de alumno
    if (typeof fields["cod_alumno"] !== "undefined") {
      if (!fields["cod_alumno"].match(/^[0-9]{8}$/)) {
        formIsValid = false;
        errors["cod_alumno"] = "*Código inválido";
      }
    }

    // Año de ingreso
    if (typeof fields["anio_ingreso"] !== "undefined") {
      if (!fields["anio_ingreso"].match(/^[1-9][0-9]{3}-[1-2]$/)) {
        formIsValid = false;
        errors["anio_ingreso"] = "*Año de ingreso inválido";
      }
    }

    // Correo
    if (typeof fields["correo"] !== "undefined") {
      let lastAtPos = fields["correo"].lastIndexOf('@');
      let lastDotPos = fields["correo"].lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["correo"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["correo"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["correo"] = "*Correo inválido";
      }
    }

    // Correo personal
    if (typeof fields["correo_personal"] !== "undefined") {
      let lastAtPos = fields["correo_personal"].lastIndexOf('@');
      let lastDotPos = fields["correo_personal"].lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["correo_personal"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["correo_personal"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["correo_personal"] = "*Correo inválido";
      }
    }

    // Teléfono movil
    if (typeof fields["telefono_movil"] !== "undefined") {
      if (!fields["telefono_movil"].match(/^9[0-9]{8}$/)) {
        formIsValid = false;
        errors["telefono_movil"] = "*Número inválido";
      }        
    }

    // Teléfono
    if (typeof fields["telefono"] !== "undefined") {
      if (!fields["telefono"].match(/^[0-9]{7}$/)) {
        formIsValid = false;
        errors["telefono"] = "*Número inválido";
      }        
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
       alert("Form submitted");
    } else {
       alert("Form has errors.");
    }
  }

  handleChange(field, e) {         
    let fields = this.state.fields;
    fields[field] = e.target.value; 
    this.handleValidation(); 
    this.setState({fields});
    this.setState({flag: "false"})
  }

  validarDatos(){
    if(document.getElementById("ape_paterno").value.toUpperCase() === '' || 
       document.getElementById("ape_materno").value.toUpperCase() === '' ||
       document.getElementById("nom_alumno").value.toUpperCase() === '' ||
       document.getElementById("cod_tip_ingreso").value === 'Seleccionar opción' ||
       document.getElementById("cod_situ").value === 'Seleccionar opción' ||
       document.getElementById("cod_perm").value === 'Seleccionar opción' ||
       document.getElementById("anio_ingreso").value === '' ||
       document.getElementById("dni_m").value === '' ||
       document.getElementById("id_programa").value === 'Seleccionar opción' ||
       document.getElementById("correo").value.toLowerCase() === '' ||
       document.getElementById("correo_personal").value.toLowerCase() === '' ||
       document.getElementById("telefono_movil").value === '' ||
       document.getElementById("telefono").value === '' ||
       document.getElementById("ecivil_id").value === 'Seleccionar opción'
       ){
      return false;
    }
    return true;    
  }

  handlerGuardar(e) {
    if(this.validarDatos()){
      var data = {}
      // Si existe el codigo ya usado , dat estará lleno de lo contrario será null
      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        title: 'Buscando alumno',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 2000,
        onOpen: () => {
          Swal.showLoading();
        }
      })
      
      this.handleSearchAddClick(e, document.getElementById("cod_alumno").value).then((responseJson) => {
        setTimeout(() => {
          if (typeof(datosAlumno) === 'object') {
          // SI RETORNA UN TIPO OBJECT ES PORQUE ESTA JALANDO DATOS
            if (document.getElementById("cod_alumno").value === datosAlumno.cod_alumno &&
            document.getElementById("ape_paterno").value.toUpperCase() === datosAlumno.ape_paterno &&
            document.getElementById("id_programa").value == datosAlumno.id_programa) {
              Swal.fire({
                customClass: {
                  container: 'my-swal'
                },
                icon: 'error',
                title: 'Error',
                text: `El código ${datosAlumno.cod_alumno} ya se encuentra registrado en el sistema y corresponde a ${datosAlumno.ape_paterno} ${datosAlumno.ape_materno} ${datosAlumno.nom_alumno} del programa ${this.siglaProgramaPorId(datosAlumno.id_programa)}, revise bien la información que desea registrar!!!`
                /* text: `El código ${datosAlumno.cod_alumno} ya se encuentra registrado en el sistema y corresponde a ${datosAlumno.ape_paterno} ${datosAlumno.ape_materno} ${datosAlumno.nom_alumno} del programa ${datosAlumno.id_programa}, revise bien la información que desea registrar!!!` */
              })
            } else {
              if (document.getElementById("cod_alumno").value === datosAlumno.cod_alumno &&
              document.getElementById("ape_paterno").value.toUpperCase() === datosAlumno.ape_paterno &&
              document.getElementById("id_programa").value != datosAlumno.id_programa &&
              document.getElementById("cod_tip_ingreso").value === "TI") {
                
                this.agregarAlumno(data, `El código ${datosAlumno.cod_alumno} ya se encuentra registrado en el sistema y corresponde a ${datosAlumno.ape_paterno} ${datosAlumno.ape_materno} ${datosAlumno.nom_alumno} del programa ${this.siglaProgramaPorId(datosAlumno.id_programa)}, ¿Está seguro de registrar al estudiante?`);

              } else {
                if (document.getElementById("cod_alumno").value === datosAlumno.cod_alumno &&
                document.getElementById("ape_paterno").value.toUpperCase() != datosAlumno.ape_paterno) {
                  Swal.fire({
                    customClass: {
                      container: 'my-swal'
                    },
                    icon: 'error',
                    title: 'Error',
                    text: `El código ${datosAlumno.cod_alumno} ya se encuentra registrado en el sistema y corresponde a ${datosAlumno.ape_paterno} ${datosAlumno.ape_materno} ${datosAlumno.nom_alumno} del programa ${this.siglaProgramaPorId(datosAlumno.id_programa)}, revise bien la información que desea registrar. No asignar el mismo código a diferentes estudiantes!!!`
                  })
                } else {
                  this.agregarAlumno(data, `Está registrando el código ${document.getElementById("cod_alumno").value} correspondiente a ${document.getElementById("ape_paterno").value.toUpperCase()} ${document.getElementById("ape_materno").value.toUpperCase()} ${document.getElementById("nom_alumno").value.toUpperCase()} del programa ${this.siglaProgramaPorId(document.getElementById("id_programa").value)}, está seguro de registrar al
                  estudiante?`);
                }
              }
            }
          } else {
            this.agregarAlumno(data, `Está registrando el código ${document.getElementById("cod_alumno").value} correspondiente a ${document.getElementById("ape_paterno").value.toUpperCase()} ${document.getElementById("ape_materno").value.toUpperCase()} ${document.getElementById("nom_alumno").value.toUpperCase()} del programa ${this.siglaProgramaPorId(document.getElementById("id_programa").value)}, está seguro de registrar al
                  estudiante?`);
          }
        }, 2000); 
      });
    } else {
      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        title: 'Advertencia',
        html: 'Por favor, llenar todos los campos.',
        icon: 'warning'
      })
    }    
  }

  agregarAlumno(data, s) {
    Swal.fire({
      customClass: {
        container: 'my-swal'
      },
      title: '¿Estás seguro?',
      text: s,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) { // Si le da SI
        data.cod_alumno = document.getElementById("cod_alumno").value;
        data.ape_paterno = document.getElementById("ape_paterno").value.toUpperCase();
        data.ape_materno = document.getElementById("ape_materno").value.toUpperCase();
        data.nom_alumno = document.getElementById("nom_alumno").value.toUpperCase();
        data.cod_tip_ingreso = document.getElementById("cod_tip_ingreso").value;
        data.cod_situ = document.getElementById("cod_situ").value;
        data.cod_perm = document.getElementById("cod_perm").value;
        data.anio_ingreso = document.getElementById("anio_ingreso").value;
        data.dni_m = document.getElementById("dni_m").value;
        data.id_programa = document.getElementById("id_programa").value;
        data.correo = document.getElementById("correo").value.toLowerCase();
        data.correo_personal = document.getElementById("correo_personal").value.toLowerCase();
        data.telefono_movil = document.getElementById("telefono_movil").value;
        data.telefono = document.getElementById("telefono").value;
        data.ecivil_id = document.getElementById("ecivil_id").value;
        ModalManager.close();
        console.log(data);              
        const url = URL.url.concat("alumnoprograma");
        fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(data)
        }).then(res => res.json()).then(res => {
          if (res.status) {
            Swal.fire(
              'Creado',
              'Datos creados exitosamente.',
              'success'
            )
            ModalManager.close();
          } else {
            console.log(res.status);
            Swal.fire(
              'Error',
              'Falló la operación, espere un momento y vuelva a intentarlo.',
              'error'
            )
          }
        });
      }
    })
  }

/* BUSCAR ALUMNO CON EL MISMO CODIGO */
  async handleSearchAddClick(e, cod) {       
    let url = URL.url.concat('alumno/' + cod);
    let response = await fetch(url, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
    const responseJson = await response.json();

    if (responseJson) {
      datosAlumno = responseJson.data[0];
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No existe',
        text: 'El dato ingresado no existe en el sistema',
      })
    }

    e.preventDefault();
  }

  situacion() {
    if (this.state.flag == "true") {
      let data;
      const url = URL.url.concat("situaciones");
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          data = res;
          var x = document.getElementById("cod_situ");
          var miopc;
          for (var i = 0; i < data["data"].length; i++) {
            var miopc = document.createElement("option");
            miopc.text = data["data"][i]["cod_situ"];
            miopc.setAttribute("value", data["data"][i]["cod_situ"]);
            x.add(miopc);
            if(miopc.text === "R") miopc.setAttribute("selected", true);
          }
        } else {
          alert("Fallo al cargar datos de situaciones!");
        }
      });
    }
  }

  estadoCivil() {
    if (this.state.flag == "true") {
      let data;
      const url = URL.url.concat("estadoCivil");
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          data = res;
          var x = document.getElementById("ecivil_id");
          var miopc;
          for (var i = 0; i < data["data"].length; i++) {
            miopc = document.createElement("option");
            miopc.text = data["data"][i]["ecivil_desc"];
            miopc.setAttribute("value", data["data"][i]["ecivil_id"]);
            x.add(miopc);
            if(miopc.text === "Ninguno") miopc.setAttribute("selected", true);
          }
        } else {
          alert("Fallo al cargar datos de estados civiles!");
        }
      });
    }
  }

  permanencia() {
    if (this.state.flag == "true") {
      let data;
      const url = URL.url.concat("permanencia");
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          data = res;
          var x = document.getElementById("cod_perm");
          var miopc;
          for (var i = 0; i < data["data"].length; i++) {
            miopc = document.createElement("option");
            miopc.text = data["data"][i]["cod_perm"];
            miopc.setAttribute("value", data["data"][i]["cod_perm"]);
            x.add(miopc);
            if(miopc.text === "AC") miopc.setAttribute("selected", true);
          }
        } else {
          alert("Fallo al cargar datos de permanencia!");
        }
      });
    }
  }

  tipoIngreso() {
    if (this.state.flag == "true") {
      let data;
      const url = URL.url.concat("tipoIngreso");
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          data = res;
          var x = document.getElementById("cod_tip_ingreso");
          var miopc;
          for (var i = 0; i < data["data"].length; i++) { 
            miopc = document.createElement("option");     
            miopc.text = data["data"][i]["cod_tip_ingreso"];
            miopc.setAttribute("value", data["data"][i]["cod_tip_ingreso"]);
            x.add(miopc);
            if(miopc.text === "ER") miopc.setAttribute("selected", true);
          }
        } else {
          alert("Fallo al cargar datos de tipo de ingreso!");
        }
      });
    }
  }

  programa() {
    if (this.state.flag == "true") {
      let data;
      const url = URL.url.concat("programas");
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          data = res;
          programas = res.data;
          console.log(programas);
          var x = document.getElementById("id_programa");
          var miopc = document.createElement("option");
          miopc.text = 'Seleccionar opción';
          x.add(miopc);
          for (var i = 0; i < data["data"].length; i++) {
            var miopc = document.createElement("option");
            miopc.text = data["data"][i]["sigla_programa"];
            miopc.setAttribute("value", data["data"][i]["id_programa"]);
            x.add(miopc);
          }
        } else {
          alert("Fallo al cargar datos de programas!");
        }
      });
    }
  }

  onlyNumbers(e) {
    var code = (e.which) ? e.which : e.keyCode;
    if (code == 8) {
      return true;
    } else if (code >= 48 && code <= 57) {
      return true;
    } else {
      e.preventDefault();
    }
  }

  onlyLetters(e) {
    var code = (e.which) ? e.which : e.keyCode;
    if (code == 8) {
      return true;
    } else if (code == 32 || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) ||  
      code == 209 ||  code == 241 ||  code == 225 || code == 233 || code == 237 || code == 243 || 
      code == 250 || code == 193 || code == 201 || code == 205 || code == 211 || code == 218) {
      return true;
    } else {
      e.preventDefault();
    }
  }

  anioIngreso(e) {
    var code = (e.which) ? e.which : e.keyCode;
    if (code == 8) {
      return true;
    } else if ((code >= 48 && code <= 57) || code == 45) {
      return true;
    } else {
      e.preventDefault();
    }
  }

  // Prohible espacios en los campos de correo
  correo(e) {
    var code = (e.which) ? e.which : e.keyCode;
    if(code == 32) e.preventDefault();
  }

  siglaProgramaPorId(id) {
    for (var i = 0; i < programas.length; i++) {
      if (programas[i].id_programa == id) return programas[i].sigla_programa; 
    }
  }

  render() {
    return (
      <Modal
        className="modal"
        effect={Effect.SlideFromBottom}
        style={{
          content: {
            "width": "60%",
            "margin": "0 auto",
            "top": "5%",
          }
        }}
      >
        <div className="container" id="advanced-search-form">
          <form>
            <h2 className="text-center m-0 p-0">Registro de nuevo alumno</h2>
            <div className="d-flex flex-row">
              <div className="form-group col-xs-12">
                <label>DNI</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="DNI"
                  id="dni_m"
                  required
                  onChange={this.handleChange.bind(this, "dni_m")}
                  value={this.state.fields["dni_m"]}
                  onKeyPress={e => this.onlyNumbers(e)}
                  maxLength="8"
                />
                <span style={{color: "red"}}>{this.state.errors["dni_m"]}</span>
              </div>
            </div>

            <div className="d-flex flex-row">
              <div className="form-group col-xs-12">
                <label>Apellido Paterno</label>
                <input
                  type="text"
                  placeholder="Apellido Paterno"
                  className="form-control mayus"
                  id="ape_paterno"
                  required
                  onKeyPress={e => this.onlyLetters(e)}
                />
              </div>
              <div className="form-group col-xs-12">
                <label>Apellido Materno</label>
                <input
                  type="text"
                  placeholder="Apellido Materno"
                  className="form-control mayus"
                  id="ape_materno"
                  required
                  onKeyPress={e => this.onlyLetters(e)}
                />
              </div>
              <div className="form-group col-xs-12">
                <label>Nombre</label>
                <input
                  type="text"
                  placeholder="Nombre"                                            
                  className="form-control mayus"
                  id="nom_alumno"
                  required
                  onKeyPress={e => this.onlyLetters(e)}
                />
              </div>
            </div>

            <div className="d-flex flex-row">
            <div className="form-group col-xs-12">
                <label>Código Alumno</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Codigo"
                  id="cod_alumno"
                  required
                  onChange={this.handleChange.bind(this, "cod_alumno")}
                  value={this.state.fields["cod_alumno"]}
                  onKeyPress={e => this.onlyNumbers(e)}
                  maxLength="8"
                />
                <span style={{color: "red"}}>{this.state.errors["cod_alumno"]}</span>
              </div> 
              <div className="form-group col-xs-12">
                <label>Programa</label>
                <select
                  required
                  id="id_programa"
                  className="form-control"
                  onClick={this.programa()}
                />
              </div>
              <div className="form-group col-xs-12">
                <label>Año de Ingreso</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ejem: 2016-2"
                  id="anio_ingreso"
                  required
                  onChange={this.handleChange.bind(this, "anio_ingreso")}
                  value={this.state.fields["anio_ingreso"]}
                  onKeyPress={e => this.anioIngreso(e)}
                />
                <span style={{color: "red"}}>{this.state.errors["anio_ingreso"]}</span>
              </div>              
            </div>

            <div className="d-flex flex-row">
            <div className="form-group col-xs-12">
                <label>Codigo Tipo Ingreso</label>
                <select
                  required
                  id="cod_tip_ingreso"
                  className="form-control"
                  onClick={this.tipoIngreso()}
                />
              </div>
              <div className="form-group col-xs-12">
                <label>Codigo de Situacion</label>
                <select
                  required
                  id="cod_situ"
                  className="form-control"
                  onClick={this.situacion()}
                />
              </div>
              <div className="form-group col-xs-12">
                <label>Codigo Permanencia</label>
                <select
                  required
                  id="cod_perm"
                  className="form-control"
                  onClick={this.permanencia()}
                />
              </div>
            </div>

            <div className="d-flex flex-row">
              <div className="form-group col-xs-12">
                <label>Correo</label>
                <input
                  type="email"
                  className="form-control minus"
                  placeholder="Correo"
                  id="correo"
                  required
                  onChange={this.handleChange.bind(this, "correo")}
                  value={this.state.fields["correo"]}                  
                  onKeyPress={e => this.correo(e)}
                />
                <span style={{color: "red"}}>{this.state.errors["correo"]}</span>
              </div>
              <div className="form-group col-xs-12">
                <label>Correo Personal</label>
                <input
                  type="email"
                  className="form-control minus"
                  placeholder="Correo Personal"
                  id="correo_personal"
                  required
                  onChange={this.handleChange.bind(this, "correo_personal")}
                  value={this.state.fields["correo_personal"]}
                  onKeyPress={e => this.correo(e)}
                />
                <span style={{color: "red"}}>{this.state.errors["correo_personal"]}</span>
              </div>
            </div>

            <div className="d-flex flex-row">
              <div className="form-group col-xs-12">
                <label>Telefono Movil</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Telefono Movil"
                  id="telefono_movil"
                  required
                  onChange={this.handleChange.bind(this, "telefono_movil")}
                  value={this.state.fields["telefono_movil"]}
                  onKeyPress={e => this.onlyNumbers(e)}
                  maxLength="9"
                />
                <span style={{color: "red"}}>{this.state.errors["telefono_movil"]}</span>
              </div>

              <div className="form-group col-xs-12">
                <label>Telefono</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Telefono"
                  id="telefono"
                  required
                  onChange={this.handleChange.bind(this, "telefono")}
                  value={this.state.fields["telefono"]}
                  onKeyPress={e => this.onlyNumbers(e)}
                  maxLength="9"
                />
                <span style={{color: "red"}}>{this.state.errors["telefono"]}</span>
              </div>
              <div className="form-group col-xs-12">
                <label>Estado Civil</label>
                <select
                  required
                  id="ecivil_id"
                  className="form-control"
                  onClick={this.estadoCivil()}
                />
              </div>
            </div>
          </form>
          <div className="row d-flex justify-content-center">
              <button id="button-send-modal" className="btn btn-success btn-modal mx-2 w-25" onClick={e => this.handlerGuardar(e)}>REGISTRAR</button>
              <button data-dismiss="modal" className="btn btn-success btn-modal mx-2 w-25" onClick={ModalManager.close}>CERRAR</button>
          </div>
        </div>
        <script>window.onload=llenarConceptos;</script>
      </Modal>
    );
  }
}
export default MyModal;
