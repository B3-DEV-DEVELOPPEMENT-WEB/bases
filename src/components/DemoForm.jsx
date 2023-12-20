import React, { useState, useEffect } from "react";

const DemoForm = () => {
    const [prenom, setPrenom] = useState("");
    const [message, setMessage] = useState("");
    const [pays, setPays] = useState("France");
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [erreur, setErreur] = useState("");

    useEffect(() => {
        const usersFromLocalStorage = JSON.parse(localStorage.getItem("utilisateurs")) || [];
        setUtilisateurs(usersFromLocalStorage);
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!prenom.trim()) {
            setErreur("Le champ prénom ne peut pas être vide.");
            return;
        }

        if (utilisateurs.includes(prenom.toUpperCase())) {
            setErreur("Cet utilisateur existe déjà.");
            return;
        }

        const nouveauxUtilisateurs = [...utilisateurs, prenom.toUpperCase()];
        setUtilisateurs(nouveauxUtilisateurs);
        setErreur("");

        localStorage.setItem("utilisateurs", JSON.stringify(nouveauxUtilisateurs));

        setPrenom("");
        setMessage("");
        setPays("France");
    };

    const supprimerUtilisateur = (utilisateur) => {
        const nouveauxUtilisateurs = utilisateurs.filter((u) => u !== utilisateur);
        setUtilisateurs(nouveauxUtilisateurs);
        localStorage.setItem("utilisateurs", JSON.stringify(nouveauxUtilisateurs));
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <p>
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="pays">Où es-tu né ?</label>
                    <select value={pays} onChange={(e) => setPays(e.target.value)}>
                        <option>France</option>
                        <option>Belgique</option>
                        <option>Maroc</option>
                    </select>
                </p>
                <p>
                    <button>Envoyer</button>
                </p>
                {erreur && <p style={{ color: "red" }}>{erreur}</p>}
            </form>

            <ul>
                {utilisateurs.map((utilisateur, index) => (
                    <li key={index}>
                        {utilisateur}
                        <button onClick={() => supprimerUtilisateur(utilisateur)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default DemoForm;
