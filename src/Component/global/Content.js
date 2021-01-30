import React, { Component } from 'react';
import Listardatos from './ListarComprobantes';
import URL from './API/API';
import { Link } from "react-router-dom";
import { ModalManager } from "react-dynamic-modal";
import Modal2 from "./MyModalNewC";
import Modal1 from "./MyModalNewA";
import './css/Content.css';
import './css/bootstrap.css';
import axios from 'axios';
import Check from './Check';
import Swal from 'sweetalert2';
import newA from './image/icono-alumnos-png-1.png';
var perfil = '';
var config = '';
var inactivo = false;
class Content extends Component {
    constructor() {
        super();

        this.state = {
            lista: null,
            nombre_apellido: "",
            concepto: "",
            dni: "",
            codigo: "",
            voucher: "",
            dates: "",
            dates2: "",
            mensaje: "",
            estado: false,
            operacion: '',
            isLoading: false,
            nombre: "",
            sigla: "",
            idPrograma: "",
            id: "",
            validado: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchAddClick = this.handleSearchAddClick.bind(this);
        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputConcepto = this.handleInputConcepto.bind(this);
        this.handleInputRecibo = this.handleInputRecibo.bind(this);
        this.handleInputDni = this.handleInputDni.bind(this);
        this.handleInputCodigo = this.handleInputCodigo.bind(this);
        this.handleSearchKey = this.handleSearchKey.bind((this));
        this.handleNewClick = this.handleNewClick.bind(this);
        this.mostrarData = this.mostrarData.bind(this);
        this.limpiar = this.limpiar.bind(this)
        this.vaciado = this.vaciado.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleInputValidado = this.handleInputValidado.bind(this);
        // cambio
        perfil = localStorage.getItem('perfil');
        if(perfil == '5' ) inactivo = true;
    }

    

    handleAddClick(e, cod) {
        
            
        if (cod != "") {
            this.handleSearchAddClick(e).then((responseJson) => 
                ModalManager.open(
                <Modal2
                    id={this.state.id}
                    nombre={this.state.nombre}
                    codigo={cod}
                    sigla={this.state.sigla}
                    idPrograma={this.state.idPrograma}
                />
            ) 
            
            );
            e.preventDefault()
            
        } else {
            // alert("Ingrese un código");
            Swal.fire(
                'Ingresar un código',
                '',
                'question'
            )
            e.preventDefault();
        }
    }
    
    async handleSearchAddClick(e) {       
         
        let url = URL.url.concat('recaudaciones/detallada/');
        
        if (this.state.dni === "" && this.state.codigo === "") {
            
            Swal.fire(
                'Buscadores vacíos',
                'Ingresar dato(s) en el(los) buscador(es) que desea',
                'question'
                )
        } else {
            let arra = {
                "nombre": this.state.nombre_apellido,
                "periodoI": this.state.dates,
                "id_concepto": this.state.concepto,
                "periodoF": this.state.dates2,
                "voucher": this.state.voucher,
                "dni": this.state.dni,
                "codigo": this.state.codigo,
                "validado":this.state.validado
            };
            let arra2 = [arra]

            this.setState({
                isLoading: true,
                mensaje: "",
                operacion: "c"
            });

            let response = await fetch(url, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arra, null, 2)

            })
            const responseJson = await response.json();

            if(responseJson){
                
                    this.setState({
                        lista: responseJson.data, //Todos los datos
                        estado: true,
                        operacion: (responseJson.data !== null && responseJson.data.length !== 0),
                        mensaje: (responseJson.data !== null && responseJson.data.length !== 0) ? ("") : ("Datos no encontrados"),
                        isLoading: false,
                        nombre: responseJson.data[0].nombre,
                        sigla: responseJson.data[0].sigla_programa,
                        idPrograma: responseJson.data[0].id_programa,
                        id: responseJson.data[0].id_alum
                    });
            } else{
                Swal.fire({
                    icon: 'error',
                    title: 'No existe',
                    text: 'El dato ingresado no existe en el sistema',
                    })
            }

        }
        e.preventDefault();
    }

    // leer del input Concepto
    handleInputConcepto(data) {
        this.setState({
            concepto: data.target.value,
            mensaje: ""
        });
    }
    mostrarData() {
        let contenedor = "";
        if (this.state.estado) {
            // console.log(this.state.lista);
            switch (this.state.operacion) {
                case "V": contenedor = (<div className="alert alert-info">{this.state.mensaje}</div>); break;
                case true: contenedor = (<div><Listardatos listado={this.state.lista}
                    /* JDLC ADD => DATA TO ListarComprobantes Component */
                    nombreUpdate={this.state.nombre_apellido}
                    periodoIUpdate={this.state.dates}
                    conceptoUpdate={this.state.concepto}
                    periodoFUpdate={this.state.dates2}
                    voucherUpdate={this.state.voucher}
                    dniUpdate={this.state.dni}
                    codigoUpdate={this.state.codigo}

                /></div>); break;
                case false: contenedor = (<div className="alert alert-info">{this.state.mensaje}</div>); break;
                default: contenedor = (<div></div>);
            }
        }
        return contenedor;
    }

    handleInputValidado(data){
        this.setState({
            validado: !this.state.validado,
            mensaje: "",
            operacion: "c"
        })
    }
    //leer del input recibo
    handleInputRecibo(data) {
        this.setState({
            voucher: data.target.value,
            mensaje: "",
            operacion: "c"
        });
    }
    //leer del input DNI
    handleInputDni(data) {
        this.setState({
            dni: data.target.value,
            mensaje: "",
            operacion: "c"
        });
    }
    //leer del input Codigo
    handleInputCodigo(data) {
        this.setState({
            codigo: data.target.value,
            mensaje: "",
            operacion: "c"
            
        });
    }
    // funcion del calendario en date se almacena la fecha seleccionada
    handleChange(date) {
        this.setState({
            dates: date.target.value,
            mensaje: "",
            operacion: "c"
        });
        console.log(date.target.value);
        console.log(this.state.dates);
    }
    handleChange2(date) {
        this.setState({
            dates2: date.target.value,
            mensaje: "",
            operacion: "c"
        });
        //  console.log(this.state.dates2);
    }

    // ingresar texto
    handleInputName(e) {
        if (e.target.id === "busca") {
            this.setState({
                nombre_apellido: e.target.value,
                mensaje: "",
                operacion: "c"
            });
        }
    }
    handleSearchKey(e) {
        //if(e.key==="enter"){
        //  this.handleSearchClick();
        //}
        document.Form.DefaulButton = 'enter'
    }
    vaciado() {
        this.setState({

            nombre: "",
            id_concepto: "",
            dni: "",
            codigo: "",
            voucher: "",
            periodoI: "",
            periodoF: ""

        })
    }
    limpiar = (even) => {
        //  even.preventDefault();

        this.refs.formulario.reset()
        //this.vaciado()
        console.log("DSAEW");
        console.log(this.state);
        //  even.preventDefault();
    }
    //buscar
     handleSearchClick(e) {       
         
        let url = URL.url.concat('recaudaciones/detallada/');
        // console.log(url);
        if (this.state.nombre_apellido === "" && this.state.concepto === "" && this.state.voucher === "" &&
            this.state.dates2 === "" && this.state.dates === "" && this.state.dni === "" && this.state.codigo === "") {
            // this.setState({
            //     mensaje: "Casilleros vacios",
            //     estado: true,
            //     operacion: 'V',
            //     lista: [],
            //     isLoading: false
            // });
            Swal.fire(
                'Buscadores vacíos',
                'Ingresar dato(s) en el(los) buscador(es) que desea',
                'question'
                )
        } else {
            let arra = {
                "nombre": this.state.nombre_apellido,
                "periodoI": this.state.dates,
                "id_concepto": this.state.concepto,
                "periodoF": this.state.dates2,
                "voucher": this.state.voucher,
                "dni": this.state.dni,
                "codigo": this.state.codigo,
                "validado":this.state.validado
            };
            let arra2 = [arra]

            console.log("arra2");
            console.log(arra2);
            this.setState({
                isLoading: true,
                mensaje: "",
                operacion: "c"
            });
            //console.log(arra);
            fetch(url, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arra, null, 2)

            })
                .then((response) => {
                    console.log(response);
                    return response.json()

                })
                .then(responseJson => {
                    this.setState({
                        lista: responseJson.data, //Todos los datos
                        estado: true,
                        operacion: (responseJson.data !== null && responseJson.data.length !== 0),
                        mensaje: (responseJson.data !== null && responseJson.data.length !== 0) ? ("") : ("Datos no encontrados"),
                        isLoading: false,
                        nombre: responseJson.data[0].nombre,
                        sigla: responseJson.data[0].sigla_programa,
                        idPrograma: responseJson.data[0].id_programa,
                        id: responseJson.data[0].id_alum
                    });
                    //console.log( responseJson.data.length);
                })
                .catch(err => {
                    Swal.fire({
                    icon: 'error',
                    title: 'No existe',
                    text: 'El dato ingresado no existe en el sistema',
                    })
                });

        }
        e.preventDefault();
    }
    /*  handleKeyPress = (event) => {
          if(event.key === 'Enter'){
              this.handleSearchClick();
          }
      };*/

    //Funcion logout antes del render.
    logout(e){
        e.preventDefault()
        localStorage.removeItem('user')
        // cambio
        // Tambien hay un cambio en el boton Agregar con el atributo disabled
        localStorage.removeItem('perfil');
        localStorage.removeItem('config');
        window.location = "/login"
    }

    handleNewClick(e){
        e.preventDefault()
        window.location = "/alumnoprograma"
    }

    render() {
        console.log(this.state.nombre_apellido);
        return (
            <div className="container my-5">
                <div className="content">
                    <div className="buscar">
                        <form ref="formulario" onSubmit={this.Limpiar} >
                            <div className="input-group mb-3 col-xs-12">
                                <div className="input-group mb-3 col-xs-12 col-sm-12 col-md-12 col-lg-6">

                                    <div className="input-group-prepend input_nombre ">
                                        <span className="input-group-text " id="basic-addon1">Nombre o Apellido</span>
                                    </div>


                                    <input id="busca" type="text" className="form-control" name="nombre" value={this.state.nombre_apellido} onChange={this.handleInputName} placeholder="nombre o apellido" aria-label="Username" aria-describedby="basic-addon1"
                                        onKeyPress={this.handleKeyPress} />
                                </div>

                                <div className="input-group mb-3 col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                    <div className="input-group-prepend input_pago">
                                        <span className="input-group-text" id="basic-addon1">Concepto de Pago</span>
                                    </div>
                                    <input id="concepto" type="text" className="form-control" name="id_concepto" value={this.state.concepto} onChange={this.handleInputConcepto} placeholder="ejem:123,123,123" aria-label="Username" aria-describedby="basic-addon1"
                                        onKeyPress={this.handleKeyPress} />
                                </div>
                            </div>

                            <div className="input-group mb-3 col-xs-12 ">
                                <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6 ">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">DNI</span>
                                    </div>
                                    <input id="dni" type="text" className="form-control" name="dni" value={this.state.dni} onChange={this.handleInputDni} placeholder="DNI" aria-label="Username" aria-describedby="basic-addon1"
                                        onKeyPress={this.handleKeyPress} />
                                </div>
                                <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Codigo</span>
                                    </div>
                                    <input id="codigo" type="text" className="form-control" name="codigo" value={this.state.codigo} onChange={this.handleInputCodigo} placeholder="codigo" aria-label="Username" aria-describedby="basic-addon1"
                                        onKeyPress={this.handleKeyPress} />
                                </div>
                            </div>

                            <div className="input-group mb-3 col-xs-12">
                                <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Desde:</span>
                                    </div>
                                    <input type="date" className="form-control" name="periodoI" onChange={this.handleChange} aria-label="Username" aria-describedby="basic-addon1"
                                        onKeyPress={this.handleKeyPress} />
                                </div>
                                <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Hasta</span>
                                    </div>
                                    <input type="date" className="form-control" name="periodoF" onChange={this.handleChange2} aria-label="Username" aria-describedby="basic-addon1"
                                        onKeyPress={this.handleKeyPress} />
                                </div>
                            </div>
                            <div className="input-group mb-3 col-xs-12 ">
                                <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Nro de Recibo</span>
                                    </div>
                                    <input id="recibo" type="text" className="form-control" name="voucher" onChange={this.handleInputRecibo} placeholder="ejem:cod1,cod2,..." aria-label="Username" aria-describedby="basic-addon1"
                                        onKeyPress={this.handleKeyPress} />
                                </div>

                                <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Verificar</span>
                                    </div>
                                    <input type="checkbox" onChange={this.handleInputValidado} className="DatosCSS-input-checkbox mt-2 ml-2" />
                                </div>
                                <div className="cont_boton input-group mb-3 col-xs-12">
                                    <div className="d-flex justify-content-end  ml-5">
                                        <div className="botones">                           
                                            <button id="Buscar" onClick={this.handleSearchClick} className="btn btn-primary">Buscar</button>
                                            <img id="NuevoAlumno" src={newA} onClick={this.handleNewClick} className="img-nuevo-alumno mx-3" title="Nuevo alumno"></img>                                                                                                                                                                                                                                
                                            <button id="Agregar" onClick={e => this.handleAddClick(e, this.state.codigo) } className="btn btn-primary" disabled={inactivo}>Agregar</button>
                                            <button id="Limpiar" onClick={this.limpiar} className="btn btn-primary">Limpiar</button>
                                            <a className="btn btn-primary" href="" onClick={this.logout}>Salir</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>

                    </div>
                    <div className={(this.state.isLoading) ? ("isLoading") : ("listar")}>
                        {this.mostrarData()}
                    </div>
                </div>
            </div> 


        );

    }
}
export default Content;
