    const carrito = [];
    const productos = [];

class ProductoCarrito{
    constructor(nombre, talla, color, cantidad, totalIndividual ) {
        this.nombre = nombre;
        this.talla   = talla;
        this.color  = color;
        this.cantidad = cantidad;
        this.totalIndividual = totalIndividual;
    }
}

function pushearBolsa() {
    let cantidad = document.getElementById("cantidadBolsas").value  
    let talla = 0;
    let color = 0;
    if (cantidad !== 0){ 
    carrito.push(new ProductoCarrito("bolsas", talla, color, cantidad, cantidad*8000))
    guardarLocal("listaProductos", JSON.stringify(carrito));
    console.log(carrito);
    }else {
        alert("Rellene los campos")
    }
}



function pushearPolera() {
    let cantidad = document.getElementById("cantidadPolera").value
    let talla = document.getElementById("tallaPolera").value
    let color = document.getElementById("colorPolera").value
    if (talla !=='' && color !==''){ 
    carrito.push(new ProductoCarrito("poleras", talla, color, cantidad, cantidad*12000))
    guardarLocal("listaProductos", JSON.stringify(carrito));
    console.log(carrito);
    } else {
        alert("Rellene los campos")
    }
}

function vaciarStorage() {
    localStorage.clear()
}

function checarCarrito() {
    const almacenados = JSON.parse(localStorage.getItem("listaProductos"));
    if (almacenados != null){
    for (const objeto of almacenados)
    productos.push(new Producto(objeto));
    console.log(productos);
    for (let i= 0; i < productos.length; i++) {
        productos[i].reportar();
    }
    productos.splice(0, Infinity)
    console.log(productos);
} else{
    alert("tu carrito está vacío.")
    }
}
let carritoPolera = document.getElementById("agregarPolera");

let carritoBolsa = document.getElementById("agregarBolsa");

let vaciarCarrito = document.getElementById("vaciarCarrito");

let revisarCarrito = document.getElementById("revisarCarrito");

carritoBolsa.addEventListener("click", pushearBolsa)
carritoPolera.addEventListener("click", pushearPolera)
vaciarCarrito.addEventListener("click", vaciarStorage)
revisarCarrito.addEventListener("click", checarCarrito) 

const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

class Producto {
    constructor(obj) {
        this.nombre  = obj.nombre.toLowerCase();
        this.precio  = obj.totalIndividual;
        this.cantidad = obj.cantidad;
        this.talla = obj.talla;
        this.color = obj.color;
    }
    reportar(){
        if (this.talla === 0 && this.color === 0){
            alert(`Has llevado ${this.cantidad} ${this.nombre} por ${this.precio} pesos chilenos.`)
            }else if(this.talla !== 0 && this.color !== 0) {
                alert(`Has llevado ${this.cantidad} ${this.nombre} talla ${this.talla.toUpperCase()} color ${this.color} por ${this.precio} pesos chilenos.` )
            }
    }
}   

let lista = document.querySelector('#listado')

fetch('./proximamente.json')
    .then( (res) => res.json())
    .then( (data) => {

        data.forEach((producto) => {
            const li = document.createElement('li')
            li.innerHTML = `
                <h4>${producto.nombre}</h4>
                <p>${producto.precio}</p>
                <p>Código: ${producto.id}</p>
                <hr/>
            `

            lista.append(li)
        })
    })


