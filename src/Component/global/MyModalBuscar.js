import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import "./css/DatosCSS.css";
import URL from "./API/API";
import "./css/bootstrap.css";
import "./css/NewC.css";
import "./css/ListarComprobanteNewC.css";
import Swal from 'sweetalert2';

class MyModalBuscar extends Component {
  constructor(props) {
    super(props);
    //this.handlerGuardar = this.handlerGuardar.bind(this);
    // this.texto=React.createRef();
    this.state = {
      data: null,
      ubicDato: [],
      codigo : this.props.dat.cod_alumno,
      ape_paterno: this.props.dat.ape_paterno,
      ape_materno : this.props.dat.ape_materno,
      nom_alumno: this.props.dat.nom_alumno,
      anio_ingreso : this.props.dat.anio_ingreso,
      dni_m : this.props.dat.dni_m,
      correo : this.props.dat.correo,
      correo_personal : this.props.dat.correo_personal,
      telefono_movil : this.props.dat.telefono_movil,
      telefono : this.props.dat.telefono,
      flag: "true"
    };
  }
      
  situacion() {
    if (this.state.flag == "true") {
      let data;
      //const url = 'https://modulocontrol.herokuapp.com/ubicaciones';
      const url = URL.url.concat("situaciones");
      //console.log(url);
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          //console.log(res);
          if (res.status) {
            data = res;
            var x = document.getElementById("cod_situ");
            for (var i = 0; i < data["data"].length; i++) {
              var miop = document.createElement("option");
              miop.text = data["data"][i]["cod_situ"];
              miop.setAttribute("value", data["data"][i]["cod_situ"]);
              //console.log(this.props.dat.cod_situ == data["data"][i]["cod_situ"]);
              if (this.props.dat.cod_situ == data["data"][i]["cod_situ"]) {
                miop.setAttribute("selected", true)
              }
              x.add(miop);
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
    //const url = 'https://modulocontrol.herokuapp.com/ubicaciones';
    const url = URL.url.concat("estadoCivil");
    //console.log(url);
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
          for (var i = 0; i < data["data"].length; i++) {
            var miop = document.createElement("option");
            miop.text = data["data"][i]["ecivil_desc"];
            miop.setAttribute("value", data["data"][i]["ecivil_id"]);
            if (this.props.dat.ecivil_id == data["data"][i]["ecivil_id"]) {
              miop.setAttribute("selected",true)
            }
            x.add(miop);
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
      //const url = 'https://modulocontrol.herokuapp.com/tipos';
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => {
        //console.log(res);
        if (res.status) {
          data = res;
          var x = document.getElementById("cod_perm");
          for (var i = 0; i < data["data"].length; i++) {
            var miop = document.createElement("option");
            miop.text = data["data"][i]["cod_perm"];
            miop.setAttribute("value", data["data"][i]["cod_perm"]);
            if (this.props.dat.cod_perm == data["data"][i]["cod_perm"]) {
              miop.setAttribute("selected", true);
            }
            x.add(miop);
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
    //const url = 'https://modulocontrol.herokuapp.com/moneda';
    //const url = 'http://localhost:7896/moneda';
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        //console.log(res);
        if (res.status) {
          data = res;
          var x = document.getElementById("cod_tip_ingreso");
          for (var i = 0; i < data["data"].length; i++) {
            var miopc = document.createElement("option");
            miopc.text = data["data"][i]["cod_tip_ingreso"];
            miopc.setAttribute("value", data["data"][i]["cod_tip_ingreso"]);
            if (this.props.dat.cod_tip_ingreso == data["data"][i]["cod_tip_ingreso"]) {
              miopc.setAttribute("selected",true);
            }
            x.add(miopc);
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
    //const url = 'https://modulocontrol.herokuapp.com/moneda';
    //const url = 'http://localhost:7896/moneda';
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        //console.log(res);
        if (res.status) {
          data = res;
          var x = document.getElementById("id_programa");
          for (var i = 0; i < data["data"].length; i++) {
            var miopc = document.createElement("option");
            miopc.text = data["data"][i]["sigla_programa"];
            miopc.setAttribute("value", data["data"][i]["id_programa"]);
            if (this.props.dat.id_programa == data["data"][i]["id_programa"]) {
              miopc.setAttribute("selected",true);
            }
            x.add(miopc);
          }
        } else {
          alert("Fallo al cargar datos de programas!");
        }
      });
    }
  }

  eliminar(e) {        
    Swal.fire({
      customClass: {
        container: 'my-swal'
      },
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const url = URL.url.concat("deleteAlumno");
        let a = JSON.stringify(this.props.dat.cod_alumno);
        fetch(url, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({ cod_alumno: this.props.dat.cod_alumno })
        })
        .then(res => res.json())        
        .then(res => {
          if (res.status === 'success') {
            ModalManager.close();
            Swal.fire(
              'Eliminado',
              'El alumno ha sido eliminado exitosamente.',
              'success'
            )
            ModalManager.close();
          } else {
            ModalManager.close();
            Swal.fire(
              'Error',
              'No se pudo eliminar al alumno, revisar si el alumno registra recaudaciones.',
              'error'
            )
          }
        });
      }
    })
    e.preventDefault();
  }

  guardarCambios(e) {
    //console.log("raas");
    Swal.fire({
      customClass: {
        container: 'my-swal'
      },
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const url = URL.url.concat("updateAlumno");
        var data = {};
        data.nom_alumno = document.getElementById('nom_alumno').value.toUpperCase();
        data.ape_paterno = document.getElementById('ape_paterno').value.toUpperCase();
        data.ape_materno = document.getElementById('ape_materno').value.toUpperCase();
        data.anio_ingreso = document.getElementById('anio_ingreso').value;
        data.dni_m = document.getElementById('dni_m').value;
        data.correo = document.getElementById('correo').value;
        data.correo_personal = document.getElementById('correo_personal').value;
        data.telefono_movil = document.getElementById('telefono_movil').value;
        data.telefono = document.getElementById('telefono').value;
        data.id_programa = document.getElementById('id_programa').value;
        data.cod_perm = document.getElementById('cod_perm').value;
        data.cod_situ = document.getElementById('cod_situ').value;
        data.cod_tip_ingreso = document.getElementById('cod_tip_ingreso').value;
        data.ecivil_id = document.getElementById('ecivil_id').value;
        data.cod_alumno = document.getElementById('cod_alumno').value;
        console.log(data);
        fetch(url, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(data)
        }).then(res => res.json()).then(res => {
          if (res.status) {
            // exito
            console.log(res.status);
            Swal.fire({
              customClass: {
                container: 'my-swal'
              },
              title: 'Modificado',
              html: 'El alumno ha sido modificado exitosamente.',
              icon: 'success'
            })
          } else {
            console.log(res.status);
            Swal.fire({
              customClass: {
                container: 'my-swal'
              },
              title: 'Error',
              html: 'Falló la operación, espere un momento y vuelva a intentarlo.',
              icon: 'error'
            })
          }
        });
      }        
    })
    e.preventDefault();       
  }

  editar(e) {
    const element_nom_alumno = document.getElementById('nom_alumno');
    element_nom_alumno.removeAttribute('disabled');
    const element_ape_paterno = document.getElementById('ape_paterno');
    element_ape_paterno.removeAttribute('disabled');
    const element_ape_materno = document.getElementById('ape_materno');
    element_ape_materno.removeAttribute('disabled');
    const element_anio_ingreso = document.getElementById('anio_ingreso');
    element_anio_ingreso.removeAttribute('disabled');
    const element_dni_m = document.getElementById('dni_m');
    element_dni_m.removeAttribute('disabled');
    const element_correo = document.getElementById('correo');
    element_correo.removeAttribute('disabled');
    const element_correo_personal = document.getElementById('correo_personal');
    element_correo_personal.removeAttribute('disabled');
    const element_telefono_movil = document.getElementById('telefono_movil');
    element_telefono_movil.removeAttribute('disabled');
    const element_telefono = document.getElementById('telefono');
    element_telefono.removeAttribute('disabled');

    //select
    const element_id_programa = document.getElementById('id_programa');
    element_id_programa.removeAttribute('disabled');
    const element_cod_perm = document.getElementById('cod_perm');
    element_cod_perm.removeAttribute('disabled');
    const element_cod_situ = document.getElementById('cod_situ');
    element_cod_situ.removeAttribute('disabled');
    const element_cod_tip_ingreso = document.getElementById('cod_tip_ingreso');
    element_cod_tip_ingreso.removeAttribute('disabled');
    const element_ecivil_id = document.getElementById('ecivil_id');
    element_ecivil_id.removeAttribute('disabled');
    
    e.preventDefault();
  }

  onChange(e){
    this.setState({nom_alumno: e.target.nom_alumno});
    this.setState({ape_paterno: e.target.ape_paterno});      
    this.setState({ape_materno: e.target.ape_materno});           
    this.setState({anio_ingreso: e.target.anio_ingreso});     
    this.setState({dni_m: e.target.dni_m});     
    this.setState({correo: e.target.correo});     
    this.setState({correo_personal: e.target.correo_personal});      
    this.setState({telefono_movil: e.target.telefono_movil});      
    this.setState({telefono: e.target.telefono});
    this.setState({flag: "false"})
  }

  render() {
      return (
      <Modal
          className="modal"
          effect={Effect.SlideFromBottom}
          style={{
          content: {
              margin: "15px auto"
          }
          }}
      >
          <div className="container" id="advanced-search-form">
        <form id="root">

          <div className="d-flex flex-row">
            <div className="form-group col-xs-12">
              <label>DNI</label>
              <input
                type="text"
                className="form-control"
                placeholder="DNI"
                id="dni_m"
                value={this.state.dni_m}
                onChange={e => this.onChange(e)}
                disabled
                required
              />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="form-group col-xs-12">
              <label>Apellido Paterno</label>
              <input
                type="text"
                className="form-control mayus"
                placeholder="Apellido Paterno"
                id="ape_paterno"
                value={this.state.ape_paterno}
                onChange={e => this.onChange(e)}
                disabled
                required
              />
            </div>
            <div className="form-group col-xs-12">
              <label>Apellido Materno</label>
              <input
                type="text"
                className="form-control mayus"
                placeholder="Apellido Materno"
                id="ape_materno"
                value={this.state.ape_materno}
                onChange={e => this.onChange(e)}
                disabled
                required
              />
            </div>
            <div className="form-group col-xs-12">
              <label>Nombre </label>
              <input
                type="text"
                className="form-control mayus"
                placeholder="Nombre"
                id="nom_alumno"
                value={this.state.nom_alumno}
                onChange={e => this.onChange(e)}
                disabled
                required
              />
            </div>
          </div>

          <div className="d-flex flex-row">
            <div className="form-group col-xs-12">
              <label>Codigo Alumno</label>
              <input
                type="text"
                className="form-control"
                placeholder="Codigo"
                id="cod_alumno"
                value={this.state.codigo}
                disabled
                required
              />
            </div>
            <div className="form-group col-xs-12">
              <label>Programa</label>
              <select
                required
                id="id_programa"
                className="form-control"
                onClick={this.programa()}   
                onChange={e => this.onChange(e)}       
                disabled
              />
            </div>
            <div className="form-group col-xs-12">
              <label>Año de Ingreso</label>
              <input
                type="text"
                className="form-control"
                placeholder="ejem: 2016-2"
                id="anio_ingreso"
                value={this.state.anio_ingreso}
                onChange={e => this.onChange(e)}  
                disabled
                required
              />
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
                onChange={e => this.onChange(e)}  
                disabled
              />
            </div>
            <div className="form-group col-xs-12">
              <label>Codigo de Situacion</label>
              <select
                required
                id="cod_situ"
                className="form-control"
                onClick={this.situacion()}     
                onChange={e => this.onChange(e)}    
                disabled
              />
            </div>
            <div className="form-group col-xs-12">
              <label>Codigo Permanencia</label>
              <select
                required
                id="cod_perm"
                className="form-control"
                onClick={this.permanencia()}
                onChange={e => this.onChange(e)}  
                disabled
              />
            </div>
          </div>

          <div className="d-flex flex-row">
            <div className="form-group col-xs-12">
              <label>Correo</label>
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                id="correo"
                value={this.state.correo}
                onChange={e => this.onChange(e)}
                disabled
                required
              />
            </div>
            <div className="form-group col-xs-12">
              <label>Correo Personal</label>
              <input
                type="email"
                className="form-control"
                placeholder="Correo Personal"
                id="correo_personal"
                value={this.state.correo_personal}
                onChange={e => this.onChange(e)}
                disabled
                required
              />
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
                value={this.state.telefono_movil}
                onChange={e => this.onChange(e)}
                disabled
                required
              />
            </div>
            <div className="form-group col-xs-12">
              <label>Telefono</label>
              <input
                type="text"
                className="form-control"
                placeholder="Telefono"
                id="telefono"
                value={this.state.telefono}
                onChange={e => this.onChange(e)}
                disabled
                required
              />
            </div>
            <div className="form-group col-xs-12">
              <label>Estado Civil</label>
              <select
                required
                id="ecivil_id"
                className="form-control"
                onClick={this.estadoCivil()} 
                onChange={e => this.onChange(e)}  
                disabled
              />
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-between">
          <button
            data-dismiss="modal"
            className="btn btn-success w-25"
            onClick={e => this.editar(e)}
          >EDITAR</button>
          <button
            data-dismiss="modal"
            className="btn btn-success w-25"
            onClick={e => this.eliminar(e) }
          >ELIMINAR</button>
          <button 
            id="guardar-cambios"
            data-dismiss="modal"
            className="btn btn-success w-25"
            onClick={e => this.guardarCambios(e) }
          >GUARDAR CAMBIOS</button>
          <button data-dismiss="modal" className="btn btn-success btn-modal mx-2 w-25" onClick={ModalManager.close}>CERRAR</button>
        </div>
      </div>
      </Modal>
      );
  }
}
export default MyModalBuscar;