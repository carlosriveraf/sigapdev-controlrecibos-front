import React, {Component} from "react";
import './global/css/App.css';
import Header from './global/Header';
import AlumnoProgramas from './global/AlumnoPrograma';
import Footer from './global/Footer';

class AlumnoPrograma extends Component {
    render() {
        return (
            <div className="App">
                <Header 
                title = " - Registrar alumno"
                />
                <AlumnoProgramas />
                <Footer />
            </div>
        );
    }
}
export default AlumnoPrograma;