import React, { useEffect } from "react";
import { GET_INSCRIPCIONES } from "graphql/inscripciones/queries";
import { useMutation, useQuery } from "@apollo/client";
import { APROBAR_INSCRIPCION } from "../../graphql/inscripciones/mutations";
import PrivateRoute from "components/PrivateRouter";
import ButtonLoading from "components/ButtonLoading";
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from "components/Accordion";
import { toast } from "react-toastify";

const IndexInscripciones = () => {
  const { data, loading, refetch } = useQuery(GET_INSCRIPCIONES);

  if (loading) return <div>Loading...</div>;
  return (
    <PrivateRoute roleList={["ADMINISTRADOR", "LIDER"]}>
      <div className="p-10">
        <div>Pagina de inscripciones</div>
        <div className="my-4">
          <AccordionInscripcion
            titulo="Inscripciones aprobadas"
            data={data.Inscripciones.filter((el) => el.estado === "ACEPTADO")}
          />
          <AccordionInscripcion
            titulo="Inscripciones pendientes"
            data={data.Inscripciones.filter((el) => el.estado === "PENDIENTE")}
            refetch={refetch}
          />
          <AccordionInscripcion
            titulo="Inscripciones rechazadas"
            data={data.Inscripciones.filter((el) => el.estado === "RECHAZADO")}
          />
        </div>
      </div>
    </PrivateRoute>
  );
};

const AccordionInscripcion = ({ data, titulo, refetch = () => {} }) => (
  <AccordionStyled>
    <AccordionSummaryStyled>
      {titulo} ({data.length})
    </AccordionSummaryStyled>
    <AccordionDetailsStyled>
      <div className="flex">
        {data &&
          data.map((inscripcion) => (
            <Inscripcion inscripcion={inscripcion} refetch={refetch} />
          ))}
      </div>
    </AccordionDetailsStyled>
  </AccordionStyled>
);

const Inscripcion = ({ inscripcion, refetch }) => {
  const [aprobarInscripcion, { data, loading, error }] =
    useMutation(APROBAR_INSCRIPCION);

  useEffect(() => {
    if (data) {
      toast.success("Inscripcion aprobada con exito");
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error aprobando la inscripcion");
    }
  }, [error]);

  const cambiarEstadoInscripcion = () => {
    aprobarInscripcion({
      variables: {
        aprobarInscripcionId: inscripcion._id,
      },
    });
  };

  return (
    <div className="bg-gray-900 text-gray-50 flex flex-col p-6 m-2 rounded-lg shadow-xl">
      <span>{inscripcion.proyecto.nombre}</span>
      <span>{inscripcion.estudiante.nombre}</span>
      <span>{inscripcion.estado}</span>
      {inscripcion.estado === "PENDIENTE" && (
        <ButtonLoading
          onClick={() => {
            cambiarEstadoInscripcion();
          }}
          text="Aprobar Inscripcion"
          loading={loading}
          disabled={false}
        />
      )}
    </div>
  );
};

export default IndexInscripciones;
