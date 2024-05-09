var productos=["dove","fabuloso","grade","jabon","suavitel"];

var precios = [12,16,25,13,17];

var selectProductos=document.getElementById("productos");
var imgProductos=document.getElementById("imgProducto");
var precioProductos=document.getElementById("precioProducto");
var inputCantidad=document.getElementById("inputCantidad");
var agregarCarrito=document.getElementById("agregarCarrito");
var carrito=new Array();

var posProducto=-1;
var cantidadProducto=0;
let total=0;



const cargarProductos=()=>{
    let optionProductos="";
    productos.forEach((producto) => {
        optionProductos+=`<option value="${producto}">${producto.toUpperCase()}</option>`;
    
    })
    selectProductos.innerHTML=optionProductos;
    cargarPrecio();
}
selectProductos.onchange=()=>{
    cargarPrecio();
}
const cargarPrecio=()=>{
    imgProductos.src=`${selectProductos.value.toLowerCase()}.jpg`;
    precioProductos.innerHTML=`$ ${precios[selectProductos.selectedIndex]}`;
    posProducto=selectProductos.selectedIndex;
}

inputCantidad.oninput=()=>{
    document.getElementById("vcantidad").innerHTML=inputCantidad.value;
    cantidadProducto=parseInt(inputCantidad.value);
}




agregarCarrito.onclick=()=>{
  cantidadProducto=parseInt(inputCantidad.value);
  posProducto=selectProductos.selectedIndex;
  
  if (checarItems (posProducto,cantidadProducto)) {
    imprimirTabla();
    
    
  }else{
    let item=new Array();
    
    item.push(posProducto);
    item.push(cantidadProducto);
    carrito.push(item);
    imprimirTabla();
  }
}

const checarItems = (pos,cant)=>{
  let x=false;
  carrito.forEach(item=>{
    if (item[0]==pos) {
      item[1]=item[1]+cant;
      x=true;
      
    }
  })
  return x;
}

const imprimirTabla =()=>{
  total=0;
  let divCarrito=document.getElementById("carrito");
  let tablaHTML=`<table class="table w-100 m-auto">
  <tr>
  <td> PRODUCTO</td>
    <td> PRECIO</td>
      <td>CANTIDAD </td>
        <td> IMPORTE</td>
        </tr>
  `;
  let index=0;
  carrito.forEach(item=>{
    tablaHTML+=`
    <tr>
    <td>${productos[item[0]]} </td>
        <td>$ ${precios[item[0]]}.00</td>
            <td>${item[1]}</td>
                <td>${(precios[item[0]]*item[1])}</td>
                    <td><button class="btn btn-danger" onclick="eliminarProducto(${index[0]})">DEL</button>
                    </td>
    </tr>
    
    `
    index++;
    total+=(precios[item[0]]*item[1]);
  })
  tablaHTML+=`
  <tr>
  <td> </td>
    <td> <h3>TOTAL</h3></td>
      <td> <h3>$ ${total}.00</h3></td>
        <td><button class="btn btn-danger" onclick="pagaa(${index})">Pagar </button></td>
          
  </tr>
  `
  index++;
  divCarrito.innerHTML=tablaHTML;
  
}

const eliminarProducto = (index)=>{
  Swal.fire({
    title: "estas SUPER seguro de eliminar?",
    showDenyButton:true,
    showCancelButton: false,
    confirmButtonText: "si",
    denyButtonText: `no`
  }).then((result)=>{
    if(result.isConfirmed){
      carrito.splice(index,1);
      imprimirTabla();
    }
  });
}

const pagaa = async()=>{
  await Swal.fire({
    
    input: "text",
    text: "Ingresa el valor de dinero",
    showCancelButton:true,
    inputValidator:(value)=>{
      if(!value){
        return "Fondos insuficientes";
        
      }
      if (value>=total) {
        let tot=parseFloat(value)-total;
        Swal.fire({
          title:"Cambio",
          text:"Tu cambio es de: $"+tot,
          icon:"succes"
        });
        
      } else {
        Swal.fire({
          title:"invalido",
          text:"ups",
          icon:"error"
        });
      }
    }
    
  })
}


const verProductos = ()=>{
  let divListaProductos=document.getElementById("listaProductos");
  let tablaHTML=`<table class="table w-100 m-auto">
  <tr>
  <td>NOMBRE</td>
    <td>PRECIO</td>
    </tr>
  `;
  
  let index=0;
  productos.forEach(item=>{
    tablaHTML+=`
    <tr>
    <td>${[item]}</td>
    <td>$ ${precios[index]}.00</td>
        <td>${productos[item[0]]}</td>
            <td><button class="btn btn-danger m-2 w-50" value="Borrar" onclick="bProducto(${index})">x</button></td>
    
    </tr>`
    index++
  })
  divListaProductos.innerHTML=tablaHTML;
}



const addProducto = ()=>{
  let nombre=document.getElementById('nombreProducto').value;
  let precio=document.getElementById('pProducto').value;
  productos.push(nombre);
 precios.push(precio);
 verProductos();
 cargarProductos();
 cargarPrecio();
  
}


const bProducto = (index)=>{
  Swal.fire({
    title: "Seguro?",
    showDenyButton:true,
    showCancelButton: false,
    confirmButtonText: "si",
    denyButtonText: "No"
  }).then((result)=>{
    if(result.isConfirmed){
    Swal.fire("Eliminado!","","succes");
    productos.splice(index,1)
    verProductos();
    cargarProductos();
    cargarPrecio()
  }
  });
}