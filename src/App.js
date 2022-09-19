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
  //On utilise le hook useState afin de définir le carré pris en main et celui à remplacer
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)

  //On crée une méthode pour checker les couleurs sur une colonne de 3
  const checkForColumnOfThree = () => {
    //On itére jusqu'à l'index du dernier square permettant de faire une colonne de 3 dans notre tableau de jeu (en l'occurence 47)
    for (let i = 0; i <= 47 ; i++) {
      
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
        //On return un booléen si il y'à bien match, ce booléen nous servira à surveiller la condition qu'un drag and drop execute bien une colonne de 3 couleurs
        return true
      }
    }
  }
  //La même opération pour les colonnes de 3 mais par 4
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i+width, i+width*2, i+width*3];
      const decidedColor = currentColorArrangement[i]

      if (columnOfFour.every(n => currentColorArrangement[n] === decidedColor)) {
        columnOfFour.forEach(n => currentColorArrangement[n] = '')
        return true
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i+1, i+2]
      const decidedColor = currentColorArrangement[i]
      //Ces indexs ne peuvent pas faire de matchs
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]

      //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/continue
      //L'instruction continue permet d'arreter l'execution des instructions dans la boucle courante et de reprendre l'éxécution à l'itération suivante
      //Dans ce cas on l'utilise pour sauter les cases qui ne sont pas valides à testées (les deux derniéres colonnes de notre tableau de jeu)
      if (notValid.includes(i)) continue
      if (rowOfThree.every(n => currentColorArrangement[n] === decidedColor)) {
        rowOfThree.forEach(n => currentColorArrangement[n] = '')
        return true
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i+1, i+2, i+3]
      const decidedColor = currentColorArrangement[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

      if(notValid.includes(i)) continue
      if (rowOfFour.every(n => currentColorArrangement[n] === decidedColor)) {
        rowOfFour.forEach(n => currentColorArrangement[n = ''])
        return true
      }
    }
  }

  const moveIntoSquareBelow = () => {
    for (let i=0; i <= 55; i++) {
      const firstRow = [0 ,1 ,2 ,3 ,4 ,5 ,6, 7]
      const isFirstRow = firstRow.includes(i)
      //Si On est au premier rang et que la couleur indiquée est vide
      if (isFirstRow && currentColorArrangement[i] === '') {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        //Alors il faut générer une nouvelle couleur qui descendra depuis l'index pour remplir le tableau de jeu
        currentColorArrangement[i] = candyColors[randomNumber]
      }
      //Si le carré sous l'index est vide
      if ((currentColorArrangement[i + width]) === ''){
        //Alors il prend la couleur de l'index actuel
        currentColorArrangement[i+width] = currentColorArrangement[i]
        //Puis l'index actuel devient à son tour vide
        currentColorArrangement[i] = ''
      }

    }
  }

  const dragStart = (e) => {
    //console.log('start')
    //On récupére L'id du carré que l'on veux bouger
    //console.log(e.target)
    setSquareBeingDragged(e.target)
    
  }

  const dragDrop = (e) => {
    //console.log('drop')
    //On récupére l'Id du carré sur lequel on vas se déplacer
    //console.log(e.target)
    setSquareBeingReplaced(e.target)
  }

  const dragEnd = () => {
    //console.log('end')
    //console.log(e.target)

    //On stock l'id du carré à remplacer, getAttribute('data-id') renvoyant une String il faut le parseInt afin d'obtenir un Int
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id')) 
    //On stock l'id du carré que l'on déplace, getAttribute('data-id') renvoyant une String il faut le parseInt afin d'obtenir un Int
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))

    //On récupére l'index de notre carré à remplacer dans notre currentColorArrangement, et on redéfini son background selon le background du carré en déplacement
    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor
    //Même opération pour changer la couleur du carré en mouvement
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor

    //console.log('squareBeingDraggedId', squareBeingDraggedId)
    //console.log('squareBeingReplacedId', squareBeingReplacedId)

    //On veux que le drag & drop ne fonctionne que si il s'effectue selon une liste de conditions :
    //D'abord on vas vérifier que l'id du squareBeingReplaced correspond à l'id d'un des squares adjacent au squareBeingDragged
    const validMoves = [
      squareBeingDraggedId -1,
      squareBeingDraggedId - width,
      squareBeingDraggedId +1,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    //Puis on vérifie si le mouvement crée bien une colonne / ligne de 3/4 fois la même couleur grâce au booléen returné
    //On stock le booléen dans une variable
    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()
    //Si l'id du carré existe, que c'est un validMove et que le check pour une colonne ou une ligne de 3 ou 4 couleurs return true alors on reset les setter,
    //Sinon on annule le Mouvement et on reset le currentColorArrangement grâce à la spreadSyntax
    if (squareBeingReplacedId &&
       validMove &&
       (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)) {
        setSquareBeingDragged(null)
        setSquareBeingReplaced(null)
    } else {
      //Ici on redonne aux carré leurs couleurs d'origine, afin d'annuler le mouvement
      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.style.backgroundColor
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.style.backgroundColor
      setCurrentColorArrangement([...currentColorArrangement])
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

    //A chaque appel de createBoard(), notre Array currentColorArrangement sera donc remplis de 64 couleurs aléatoires
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
      checkForColumnOfFour()
      checkForColumnOfThree()
      checkForRowOfFour()
      checkForRowOfThree()
      moveIntoSquareBelow()
      

      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      //On utilise la "spreadSyntax" pour créer un nouvel Array auquel on aura appliquer à chaque index le call d'une fonction (en l'occurence notre setter)
      //Simplement passer le nouveau currentColorArrangement ne suffit pas
      setCurrentColorArrangement([...currentColorArrangement])
    }, 500)
    //Afin de bien clear notre interval on return clearInterval() depuis le hook useEffect en lui passant notre variable gameLoop en argument
    return () => clearInterval(gameLoop)


  }, [checkForColumnOfFour, checkForColumnOfThree, checkForRowOfFour, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])
  //console.log(currentColorArrangement)
  //Pourquoi la dépendance ? "On veux que cela se déclenche à chaque fois qu'un élément change, c'est la variable citée plus haut"



  

  // On utilise la méthode map pour attribuer une balise <img> à chaque couleur de notre Array currentColorArrangement
  // lui donner une key correspondant à son index et un alt pour la rendre plus "accessible"
  // Et en Attendant d'y ajouter des images un background correspondant à la couleur à l'index donné
  // Un id correspondant à l'index sur le tableau
  // On rend le square draggable et on supprime le comportement par défault pour le customiser
  return (
    <div className="app">
      <div className="game">
      
        {currentColorArrangement.map((candyColor, index) => (
          <img
              key={index}
              style={{backgroundColor: candyColor}}
              alt={candyColor}
              data-id = {index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={e => e.preventDefault()}
              onDragEnter={e => e.preventDefault()}
              onDragLeave={e => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
          />
        ))}

      </div>

    </div>
  )
}

export default App;
