import {useNavigate, useParams} from "react-router-dom";
const Post = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const home =() => {
        navigate("/")
    }

    const revenir = () => {
        navigate(-1)
    }

    return (
        <>
            <h2>Article n°{id}</h2>
            <button onClick={home}>Retrouner sur la home</button>
            <button onClick={revenir}>Retrouner sur la page precedent</button>
        </>
    )
}

export default Post