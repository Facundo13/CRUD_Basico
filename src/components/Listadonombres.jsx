import React,{useState} from 'react';
import uniqid from 'uniqid';

const Listadonombres = () => {

    const [nombre, setNombre] = useState('');
    const [listaNombres, setListaNombres] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('');
    const [error, setError] = useState(null);

    const addNombre = (e) =>{
        e.preventDefault();
        if (!nombre.trim()){
            setError('El campo nombre no puede estar vacio');
            return;
        }
        const nuevoNombre = {
            id: uniqid(),
            tituloNombre: nombre
        }
        setListaNombres([... listaNombres, nuevoNombre]);
        setNombre('');
        setError(null);
    }

    const deleteNombre = (id) => {
        const nuevoArray = listaNombres.filter(item => item.id !== id);
        setListaNombres(nuevoArray);
    }

    const editar = (item) => {
        setModoEdicion(true);
        setNombre(item.tituloNombre);
        setId(item.id);
    }

    const editarNombre = (e) => {
        e.preventDefault();
        if (!nombre.trim()){
            setError('El campo nombre no puede estar vacio');
            return;
        }
        const nuevoArray = listaNombres.map(item => item.id === id ? {id:id, tituloNombre:nombre}: item);
        setListaNombres(nuevoArray);
        setModoEdicion(false);
        setNombre('');
        setError(null);
    }

    return (
        <div>
            <h2 className="text-center mb-5 mt-3">Aplicacion CRUD Basica</h2>
            <div className="row">
                <div className="col border">
                    <h2 className="text-center mt-3 mb-3">Listado de nombres</h2>
                    <ul className="list-group mb-4">
                        {
                            listaNombres.map(item => 
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">{item.tituloNombre}
                                    <div>
                                        <button className="btn btn-danger mr-1" onClick={() => {deleteNombre(item.id)}}>
                                        Eliminar
                                        </button>
                                        <button className="btn btn-info" onClick={() => {editar(item)}}>
                                        Editar
                                        </button>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="col border">
                    <h2 className="text-center mt-3 mb-3">Formulario para añadir nombres</h2>
                    <form onSubmit={modoEdicion ? editarNombre : addNombre} className="form-group">
                        <input onChange={(e)=>{setNombre(e.target.value)}} className="form-control  mb-3" placeholder="Introduce el nombre" type="text" value={nombre}/>
                        <input className="btn btn-info btn-block" type="submit" value={modoEdicion ? 'Actualizar' : 'Registrar nombre'}/>
                    </form>
                    {
                        error != null ? (
                            <div className="alert-danger p-3">
                                <p className="m-0 text-center">{error}</p>
                            </div>
                        ):
                        (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Listadonombres
