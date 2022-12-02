let listaProductos = [
    { id: 0, nombre: "alfajor tobiano", precio: 1500, stock: 10, imgUrl: "./img/tobiano.jpg" },
    { id: 1, nombre: "galletas delicel S/Tacc", precio: 500, stock: 20, imgUrl: "./img/delicel.jpg" },
    { id: 2, nombre: "aloe vera jual", precio: 1000, stock: 30, imgUrl: "./img/jual-aloe.jpg" },
    { id: 3, nombre: "leche de almendras", precio: 400, stock: 40, imgUrl: "./img/lechecoccon.png" },
    { id: 4, nombre: "alfajor celienergy", precio: 1025, stock: 50, imgUrl: "./img/celienrgy.jpg" },
    { id: 5, nombre: "leche vegana NOTMILK", precio: 1200, stock: 60, imgUrl: "./img/notmilk.jpg" },
    { id: 6, nombre: "te granulado coalsur", precio: 900, stock: 70, imgUrl: "./img/tegranulado.jpg" },
    { id: 7, nombre: "te saingotard", precio: 1300, stock: 80, imgUrl: "./img/tesaingotar.jpg" }
]


let contenedorProductos = document.getElementById("contenedorProductos")

contenedorProductos.innerHTML = ''
for (const producto of listaProductos) {
    let tarjetaProductos = document.createElement('div')
    tarjetaProductos.innerHTML = `
            <img class="productos_img" src= ${producto.imgUrl}>
            <h5 class ="titulo-productos">${producto.nombre}</h5>
            <span class="precio">$${producto.precio}</span>
            <p class="stock">stock ${producto.stock} u. </p>
            <button class="boton-agregar-carrito" id=${producto.id}>Agregar Al Carrito</button>
            `

    contenedorProductos.append(tarjetaProductos)
}

let botones = document.getElementsByClassName('boton-agregar-carrito')

let carrito = document.getElementById('carrito')

let carritoCompras = []

if (localStorage.getItem('carrito')) {
    carritoCompras = JSON.parse(localStorage.getItem('carrito'))
}
renderizarCarrito()

function renderizarCarrito() {
    carrito.innerHTML += ` 
     <h6>Nombre</h6>
     <h6>Precio</h6>
     <h6>producto</h6>
     <h6>Unidades</h6>
     <h6>Subtotal</h6>
    `
    let compraTotal = 0
    for (const item of carritoCompras) {
        compraTotal += item.subtotal
        carrito.innerHTML += ` 
         <p>${item.nombre}</p>
         <p>$${item.precioUnidad}</p>
         <img class="carrito-img" src="${item.img}" alt="">
         <p>x${item.unidades} uni</p>
         <p> $${item.subtotal}</p>
        
        `
    }
    carrito.innerHTML += ` 
    <h4> Total : ${compraTotal}</h4> 
  `
}

for (const boton of botones) {

    boton.onclick = (e) => {
        carrito.innerHTML = ''
        let productosBuscado = listaProductos.find(producto => producto.id == e.target.id)

        let posicionProductoEnCarrito = carritoCompras.findIndex(producto => producto.id == productosBuscado.id)

        if (posicionProductoEnCarrito != -1) {
            carritoCompras[posicionProductoEnCarrito].unidades++
            carritoCompras[posicionProductoEnCarrito].subtotal = carritoCompras[posicionProductoEnCarrito].precioUnidad * carritoCompras[posicionProductoEnCarrito].unidades
        } else {
            carritoCompras.push({ id: productosBuscado.id, nombre: productosBuscado.nombre, precioUnidad: productosBuscado.precio, img: productosBuscado.imgUrl, unidades: 1, subtotal: productosBuscado.precio })
        }

        localStorage.setItem('carrito', JSON.stringify(carritoCompras))
        renderizarCarrito()
    }
}


let botonEliminar = document.getElementById('botonComprar')
botonEliminar.addEventListener("click", () => {
    localStorage.clear()
    carrito.innerHTML = '<h4 class="carrito-vacio"> TU CARRITO ESTA VACIO 😞</h4>'


})
let botonLimpiar = document.getElementById('botonLimpiar')
botonEliminar.addEventListener("click", () => {
    localStorage.clear()
    carrito.innerHTML = '<h4 class="carrito-vacio"> TU CARRITO ESTA VACIO 😞</h4>'
    

})







