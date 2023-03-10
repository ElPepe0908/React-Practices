import React, { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroesById } from "../../selectors/getHeroesById";

export const HeroScreen = ({ history, goBack }) => {
  // console.log({ props });
  const navigate = useNavigate();

  const { heroeId } = useParams();

  const hero = useMemo(() => getHeroesById(heroeId), [heroeId]);

  if (!hero) {
    return <Navigate to="/" />;
  }

  const currentPublisher = hero.publisher;

  const handleReturn = () => {
    // if(history.length <= 2) {
    //   history.push("/");
    // } else {
    //   history.goBack();
    // }

    if (currentPublisher === "Marvel Comics") {
      return "/marvel";
    }
    return "/dc";
  };

  const onNavigateBack = () => {
    // navigate(handleReturn());
    navigate(-1);
  };

  const { superhero, publisher, alter_ego, first_appearance, characters } =
    hero;

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`../assets/heroes/${heroeId}.jpg`}
          className="img-thumbnail animate__animated animate__fadeInLeft"
          alt={superhero}
        />
      </div>

      <div className="col-8 animate__animated animate__fadeIn">
        <h3> {superhero} </h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b> Alter ego: </b> {alter_ego}
          </li>
          <li className="list-group-item">
            <b> Publisher: </b> {publisher}
          </li>
          <li className="list-group-item">
            <b> First appearance: </b> {first_appearance}
          </li>
        </ul>

        <h5> Characters </h5>
        <p> {characters} </p>

        <button className="btn btn-outline-info" onClick={onNavigateBack}>
          Return
        </button>
      </div>
    </div>
  );
};
