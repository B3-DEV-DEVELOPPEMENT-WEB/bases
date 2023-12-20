import React, { useState, useEffect } from "react";

const Find = ({ onNumberGenerated }) => {
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    onNumberGenerated(randomNumber);
  }, [onNumberGenerated]);

  return null;
};

const Form = ({ secretNumber }) => {
  const [userNumber, setUserNumber] = useState("");
  const [message, setMessage] = useState("Le nombre est compris entre 1 et 100");
  const [attempts, setAttempts] = useState(0);

  const handleInputChange = (e) => {
    setUserNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const guessedNumber = parseInt(userNumber, 10);

    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
      setMessage("Veuillez entrer un nombre valide entre 1 et 100");
      return;
    }

    setAttempts(attempts + 1);

    if (guessedNumber === secretNumber) {
      setMessage(`BRAVO, vous avez trouvé en ${attempts} essais`);
    } else if (guessedNumber < secretNumber) {
      setMessage(`Le nombre est compris entre ${guessedNumber} et 100`);
    } else {
      setMessage(`Le nombre est compris entre 1 et ${guessedNumber}`);
    }

    setUserNumber("");
  };

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Proposez un nombre :
            <input
                type="number"
                value={userNumber}
                onChange={handleInputChange}
                min="1"
                max="100"
            />
          </label>
          <button type="submit">Proposer</button>
        </form>
        <p>{message}</p>
      </div>
  );
};

const RandomRiddle = () => {
  const [secretNumber, setSecretNumber] = useState(null);

  useEffect(() => {
    if (secretNumber === null) {
      setSecretNumber((prevSecretNumber) =>
          prevSecretNumber === null ? Math.floor(Math.random() * 100) + 1 : prevSecretNumber
      );
    }
  }, [secretNumber]);

  return (
      <div>
        <Find onNumberGenerated={setSecretNumber} />
        <Form secretNumber={secretNumber} />
      </div>
  );
};

export default RandomRiddle;
