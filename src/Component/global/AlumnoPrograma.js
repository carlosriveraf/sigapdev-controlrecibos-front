import React, { Component } from 'react';
import URL from './API/API';
import { ModalManager } from "react-dynamic-modal";
import Modal1 from "./MyModalNewA";
import Modal3 from "./MyModalBuscar";
import './css/Content.css';
import './css/bootstrap.css';
import Swal from 'sweetalert2';
var perfil = '';
var inactivo = false;
var datos = '';
var tipoDatos = '';
class Content extends Component {
    constructor() {
        super();
        this.state = {
            codigo: "",
            mensaje: "",
            estado: false,
            operacion: '',
            isLoading: false,
            idPrograma: "",
            validado: false,
            cod_alumno: "",
            ape_paterno: "",
            ape_materno:"",
            nom_alumno:"",
            cod_tipo_ingreso:"",
            cod_situ:"",
            cod_perm:"",
            anio_ingreso:"",
            dni_m:"",
            id_programa:"",
            correo:"",
            correo_personal:"",
            telefono_movil:"",
            telefono:"",
            ecivil_id:""
        };

        this.handleSearchAddClick = this.handleSearchAddClick.bind(this);
        this.handleInputCodigo = this.handleInputCodigo.bind(this);
        this.handleNewClick = this.handleNewClick.bind(this);
        this.limpiar = this.limpiar.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this);
        // cambio
        perfil = localStorage.getItem('perfil');
        if(perfil == '5' ) inactivo = true;
    }

    handleAddClick(e, cod) {
        if (cod != "") {
            Swal.fire({
                title: 'Buscando alumno',
                allowEscapeKey: false,
                allowOutsideClick: false,
                timer: 2000,
                onOpen: () => {
                  Swal.showLoading();
                }
            })
            this.handleSearchAddClick(e, cod).then((responseJson) => {
                setTimeout(() => {
                    if(typeof(datos) === 'object') {  
                        ModalManager.open(
                            <Modal3
                                dat = {datos}
                            />
                        )
                    } else {
                        Swal.fire(
                            'Alumno no encontrado',
                            '',
                            'warning'
                        )
                    }
                }, 2000); 
            });
            e.preventDefault();
        } else {
            Swal.fire(
                'Ingresar un código',
                '',
                'question'
            )
            e.preventDefault();
        }
    }
 
    async handleSearchAddClick(e, cod) {       
        let url = URL.url.concat('alumno/'+cod);
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const responseJson = await response.json();

        if(responseJson){
            datos = responseJson.data[0];
            tipoDatos = typeof(datos)
        } else{
            Swal.fire({
                icon: 'error',
                title: 'No existe',
                text: 'El dato ingresado no existe en el sistema',
                })
        }

        e.preventDefault();
    }
  
    //leer del input Codigo
    handleInputCodigo(data) {
        this.setState({
            codigo: data.target.value,
            mensaje: "",
            operacion: "c"
        });
    }
        
    limpiar = (e) => {
        this.setState({
            codigo: "",
            mensaje: "",
            operacion: "c"
        });
        e.preventDefault();
    }

    retroceder(e){
        e.preventDefault()
        window.location = "/"
    }

    handleNewClick(e){
        ModalManager.open(
            <Modal1/>
        ); 
        e.preventDefault();
    }

    onlyNumbers(e) {
        var code = (e.which) ? e.which : e.keyCode;
        if (code == 8) { // Backspace
          return true;
        } else if (code >= 48 && code <= 57) { // Es un número
          return true;
        } else {
          e.preventDefault();
        }
      }

    render() {
        return (
            <div className="content my-5">
                <form ref="formulario" onSubmit="return false" >
                    <div className="d-flex col-12 col-sm-5 col-md-4 justify-content-center mx-auto mb-3">
                        <div className="input-group">      
                            <span className="input-group-text" id="basic-addon1">Codigo</span>
                            <input id="codigo" type="text" className="form-control" name="codigo" value={this.state.codigo} onChange={this.handleInputCodigo} 
                                onKeyPress={ e => this.onlyNumbers(e)} maxLength="8"/>   
                        </div>
                    </div>

                    <div className="d-flex col-5 col-sm-12 mx-auto">
                        <div className="input-group justify-content-center">    
                            <button id="NuevoAlumno" onClick={this.handleNewClick} className="btn btn-primary mx-3">Insertar</button>
                            <button id="Buscar"  onClick={e => this.handleAddClick(e, this.state.codigo) }  disabled={inactivo} className="btn btn-primary mx-3">Buscar</button>
                            <button id="Limpiar" onClick={e => this.limpiar(e)} className="btn btn-primary mx-3">Limpiar</button>
                            <button id="Retroceder" onClick={this.retroceder} className="btn btn-primary mx-3">Regresar</button>
                         </div>  
                    </div>
                </form>
            </div>
        );
    }
}
export default Content;