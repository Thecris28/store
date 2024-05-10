import { useEffect, useState } from "react"
import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"
import { db } from "./data/db"

function App() {

  const initialCart = () => {
    // con este codigo recuperamos el carrito
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  
  const [data, setdata] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  // Se ejecuta cada vez que el elemento en el arreglo cambia 
  useEffect(() =>{
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  function addToCart(item){
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
    if (itemExists >= 0){

      if(cart[itemExists].quantity>= MAX_ITEMS)return

      console.log('Ya existe')
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
    }else {
      console.log('No existe... Agregando...')

      item.quantity = 1
      setCart([...cart, item])
    }
    // if(cart.includes(item)) return
  }

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id){
    const updateCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return{
          ...item,
          quantity: item.quantity +1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function decreaseItem(id){
    const updateCart = cart.map(item =>({
      ...item,
      quantity: item.id === id && item.quantity > MIN_ITEMS? item.quantity -1 : item.quantity
    })
    )
    setCart(updateCart)
  }

  function clearCart(){
    setCart([])
  }
  // state de react es asincrono
  // el state no se sincroniza inmediatamente

  return (
    <>
    <Header 
    cart={cart}
    removeFromCart={removeFromCart}
    increaseQuantity={increaseQuantity}
    decreaseItem={decreaseItem}
    clearCart={clearCart}></Header>
    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((dato)=>( 
          <Guitar guitar={dato} key={dato.id}
          setCart={setCart}
          addToCart={addToCart}

            />)
          )}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
