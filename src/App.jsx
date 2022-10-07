import React from "react";
import { nanoid } from 'nanoid'


function App() {

  
  const [tarea, setTarea] = React.useState('') 
  const [tareas, setTareas] = React.useState([]) 
  const [modoEdicion, setModoEdicion] = React.useState(false)  
  const [id, setId] = React.useState('')
  const [error, setError] = React.useState(null)
  
  const agregarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('elemnto vacio')
      setError('Escriba algo por favor...')
      return
    }
    console.log(tarea)

    setTareas([...tareas, { id: nanoid(), nombreTarea:tarea }]);
    setTarea('')
    setError(null)
  }

  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }
  
  const editar = item => {
    console.log(item)
    setModoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
  }

  const editarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('elemnto vacio')
      return
    }

    const arrayEditado = tareas.map(item => item.id === id ? {id:id, nombreTarea:tarea}: item ) 

    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)

  }

  
    
    
  return (
    <div className="container border border-dark rounded mt-5">
      <h1 className="text-center">To do list</h1>
      <hr />
      <div className="row text-center">
      <div className="col-12 mb-5">
          <h4 className="text-center">{modoEdicion ? 'Editar tarea' : 'Agregar tarea'}</h4>
          {/* FORMULARIO */}
          <form  onSubmit={modoEdicion ? editarTarea : agregarTarea}>

            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <div className="container text-center w-50">
            <input type="text" 
            className="form-control text-center w-100 mb-3 "
            placeholder="Ingrese Tarea" 
            onChange={e => setTarea(e.target.value)}
            value={tarea}
          />
            </div>


          {
            modoEdicion ? (
              <button className="btn btn-warning w-100" type="submit">Editar Tarea</button>     
            ) : (
              <button className="btn btn-dark w-50 " type="submit">Agregar</button>
            )
          }

          </form>
        </div>
        <div className="col-12">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {
              tareas.length === 0 ? (
                <li className="list-group-item">No hay tareas</li>
              ) : (
                tareas.map(item => (
                  <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.nombreTarea}</span>
                  <button className="btn btn-warning btn-sm float-right mx-3" onClick={() => editar(item)} >Editar</button>
                  <button className="btn btn-danger btn-sm float-right " onClick={() => eliminarTarea(item.id)}>Eliminar</button>
                </li>
                  ))
              )
            }
          
          </ul>
        </div>
        
      </div>
    </div>
  );
}

export default App;
