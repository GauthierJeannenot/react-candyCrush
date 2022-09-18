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

  //On crée une méthode pour checker les couleurs sur une colonne de 3
  const checkForColumnOfThree = () => {
    //On itére jusqu'à l'index du dernier square permettant de faire une colonne de 3 dans notre tableau de jeu (en l'occurence 47)
    for (let i = 0; i < 47 ; i++) {
      
      //On crée notre Array columnOfThree dans lequel on vas stocker l'index de nos colonnes de 3 squares
      const columnOfThree = [i, i+width, i+width*2]
      //On crée une variable dans laquelle on stock la valeur de la couleur de notre currentColorArrangement selon l'index
      const decidedColor = currentColorArrangement[i]

      // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/every
      //On utilise la méthode .every qui nous permet de tester chaque élément de nos colonnes selon une fonction callback
      //Si chaque color du currentColorArrangement sont égales à celle de l'index testé
      //Alors on les faits disparaîtrent en remplaçant leurs valeurs par une string vide
      if (columnOfThree.every(n => currentColorArrangement[n] === decidedColor)) {
        columnOfThree.forEach(n => currentColorArrangement[n] = '')
        //console.log(currentColorArrangement)
      }
    }
  }


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

  //On utilise le hook useEffect avec en dépendance un array vide afin que la fonction ne soit appelée qu'une fois par render, et ainsi évité des
  //render infinis / inutiles
  useEffect(() => {
    createBoard()
  }, [])
  //On check que notre Array currentColorArrangement est bien remplis de 64 couleurs aléatoire et qu'il se randomise bien aprés chaque render de otre app
  //console.log(currentColorArrangement)

  //On crée un autre useEffect car on veux que l'effet se déclenche selon certaines variables
  useEffect(() => {
    //On crée une gameLoop, grâce à la méthode setInterval, qui se rafraîchira toutes les 100ms tant que l'appli est lancée et checkera nos colonnes
    const gameLoop = setInterval(() => {
      checkForColumnOfThree()

      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      //On utilise la "spreadSyntax" pour créer un nouvel Array auquel on aura appliquer à chaque index le call d'une fonction (en l'occurence notre setter)
      //Simplement passer le nouveau currentColorArrangement ne suffit pas
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    //Afin de bien clear notre interval on return clearInterval() depuis le hook useEffect en lui passant notre variable gameLoop en argument
    return () => clearInterval(gameLoop)


  }, [checkForColumnOfThree, currentColorArrangement])
  //console.log(currentColorArrangement)
  //Pourquoi la dépendance ? "On veux que cela se déclenche à chaque fois qu'un élément change, c'est la variable citée plus haut"



  

  // On utilise la méthode map pour attribuer une balise <img> à chaque couleur de notre Array currentColorArrangement, 
  // lui donner une key correspondant à son index et un alt pour la rendre plus "accessible"
  // Et en Attendant d'y ajouter des images un background correspondant à la couleur à l'index donné
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
