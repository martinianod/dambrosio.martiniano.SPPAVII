import React, { useState, useEffect } from 'react'

const Formulario = ({ createMascota, updateMascota, mascotaEdit, setMascotaEdit, tiposMascotas }) => {

    const initialForm = {
        id: null,
        nombre: "",
        tipo: "",
        edad: "",
        vacunado: false,
        observaciones: ""
    }

    const [form, setform] = useState(initialForm);

    const { id, nombre, tipo, edad, observaciones, vacunado } = form;

    useEffect(() => {

        if (mascotaEdit) {
            setform(mascotaEdit);
        }
    }, [mascotaEdit])

    const handleChange = (e) => {

        if (e.target.type === 'checkbox') {
            setform((form) => {
                return { ...form, [e.target.name]: e.target.checked };
            });
        } else {
            setform((form) => {
                return { ...form, [e.target.name]: e.target.value };
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre || !tipo || !edad) {
            alert("Faltan datos: nombre , tipo y edad no pueden ser nulos");
            return;
        }

        if (id) {
            updateMascota(form);
        } else {
            createMascota(form);
        }

        setform(initialForm);
    }

    const handleReset = (e) => {
        e.preventDefault();
        setform(initialForm);
        setMascotaEdit(null);
    }

    return (
        <div className="container">
            <h2 className="subtitle">{id ? "Modificar" : "Agregar"} Mascota</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Nombre</label>
                    <div className="control">
                        <input
                            className="input"
                            name="nombre"
                            type="text"
                            placeholder="nombre de la mascota"
                            onChange={handleChange}
                            value={nombre} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Edad</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input is-success"
                            name="edad"
                            type="text"
                            placeholder="edad"
                            onChange={handleChange}
                            value={edad} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Tipo</label>
                    <div className="control">
                        <div className="select">
                            <select name="tipo" onChange={handleChange}>
                                {
                                    !form.tipo ? <option value="none" selected disabled hidden>Seleccione un tipo de Mascota</option> :
                                        <option
                                            key={tiposMascotas.find(tipo => tipo.tipo === form.tipo).id}
                                            value={form.tipo}>{form.tipo}</option>
                                }
                                {
                                    tiposMascotas.map((tipo) => (
                                        <option
                                            key={tipo.id}
                                            value={tipo.tipo}
                                        >{tipo.tipo}</option>
                                    ))
                                }

                            </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Observaciones</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            name="observaciones"
                            placeholder="Observaciones"
                            onChange={handleChange}
                            value={observaciones}></textarea>
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                name="vacunado"
                                checked={vacunado}
                                onChange={handleChange}
                            />
                            Vacunado
                        </label>
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">{id ? "Modificar" : "Agregar"}</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light" onClick={handleReset}>Limpiar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Formulario
