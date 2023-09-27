import useProyect from "../hooks/useProyect"
import ProyectosPreview from "../components/ProyectosPreview"

const Proyectos = () => {
  const { proyectos } = useProyect()



  return (
    <>
      <h1 className="text-4xl font-black p-5 bg-gray-100"> Proyectos </h1>

      <div className="bg-white shadow mt-10 rounded-md  text-center ">
        {
          proyectos.length ?
            proyectos.map(proyecto => (
              <ProyectosPreview
                key={proyecto?._id}
                proyecto={proyecto} />
            ))
            : <p className="mt-5 text-center uppercase text-gray-500 font-bold ">No hay proyectos</p>
        }
      </div>

    </>
  )
}

export default Proyectos