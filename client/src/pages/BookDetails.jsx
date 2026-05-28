import { useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  return <h1>Détails du livre #{id}</h1>;
}
