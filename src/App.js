import { useEffect, useState } from "react"

const width = 8
const candyColors = [
  'green',
  'purple',
  'red',
  'yellow',
  'blue',
  'orange'
]

function App() {
  //On utilise le hook useState afin de pouvoir définir le set de couleurs de notre tableau de jeu à chaque render
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])


  const createBoard = () => {
    //On crée un Array randomColorArrangement qui contiendra 64 couleurs tirées aléatoirements de l'Array candyColors
    const randomColorArrangement = []
    //Pour cela on crée un boucle for qui incrémentera pour chaque case de notre tableau de jeu (64 fois en l'occurence)
    for (let i =0; i < width*width ; i++) {
      //On vas chercher un nombre aléatoire compris entre 0 et 5 (la longueur de notre array candyColors)
      const randomNumberFrom0to5 = Math.floor(Math.random() * candyColors.length)
      //On applique le chiffre aléatoire ainsi trouvé à notre Array candyColors afin de trouver une couleur au hasard
      const randomColor = candyColors[randomNumberFrom0to5]
      //Finalement On push les couleurs trouvées dans notre Array qui contiendra ainsi un set de 64 couleurs définies aléatoirements
      randomColorArrangement.push(randomColor)
    }
    //On check notre Array randomColorArrangement qui, une fois la boucle finie, doit contenir 64 couleurs aléatoirement réparties depuis notre Array candyColors
    //console.log(randomColorArrangement)

    //A chaque render de l'application, notre Array currentColorArrangement sera donc remplis de 64 couleurs aléatoires
    setCurrentColorArrangement(randomColorArrangement)
  }

  //On utilise le hook useEffect avec en dépendance un array vide afin que la fonction ne soit appelée qu'une fois par render, et ainsi évité des render infinis
  useEffect(() => {
    createBoard()
  }, [])

  //On check que notre Array currentColorArrangement est bien remplis de 64 couleurs aléatoire et qu'il se randomise bien aprés chaque render de otre app
  //console.log(currentColorArrangement)



  

  // On utilise la méthode map pour attribué une balise <img> à chaque couleur de notre Array currentColorArrangement, 
  // lui donner une key correspondant à son index et un alt pour la rendre plus "accessible"
  // Et en Attendant d'y ajouter des images un background correspondant à la couleur à l'index donner
  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
              key={index}
              style={{backgroundColor: candyColor}}
              alt={candyColor}
          />
        ))}

      </div>

    </div>
  )
}

export default App;
