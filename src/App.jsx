import Hello from './components/Hello'
import './App.css'
import DemoForm from "./components/DemoForm.jsx";
import RandomRiddle from "./components/randomRiddle.jsx";
import DemoReducer from "./components/DemoReducer.jsx";
import Calculator from "./components/calculatrice.jsx";

function App() {

    let name = 'Jean'
    let list = ['pizza', 'rizotto', 'burger', 'tartiflette', 'raclette']

    return (
        <>
            <Calculator />
            <DemoReducer />
            <RandomRiddle />
            <DemoForm />
            <h1>Hello {name}</h1>

            <p className="red">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit,
                neque molestias. Expedita dolore harum quo cumque cupiditate, eveniet atque
                voluptas molestias hic quisquam nihil quaerat rem beatae, excepturi quia nesciunt!
            </p>

            <ul>
                {
                    list.map((element, i) => <li key={i}>{element}</li>)
                }
            </ul>

            <p>
                {
                    list.map((element, i) => {
                        return (
                            <>
                                <strong>{i}</strong>
                                <span>{element}</span>
                            </>
                        )
                    })
                }
            </p>

            <Hello firstname="Thibaut" age={20}/>
            <Hello firstname="Baptiste" age={20}/>
            <Hello firstname="Hugo" age={20}/>
            <Hello firstname="Théotime" age={20}/>
            <Hello><strong>Coucou</strong></Hello>
        </>
    )
}

export default App
