const OneButton = ({number, dispatch}) => {

    const handleClick = () => {
        dispatch({type:"SET_NUMBER", number:number})
    }

    return(
        <button onClick={handleClick}>{number}</button>
    )
}

export default OneButton;