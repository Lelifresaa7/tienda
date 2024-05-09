      var guardar = document.getElementById("guardar");
var borrar = document.getElementById("borrar");

var alumnos= new Array();

var nombre = document.getElementById("nom");
var ap = document.getElementById("ap");
var am = document.getElementById("am");
var g = document.getElementById("grupo");
var c = document.getElementById("carrera");

let divRes= document.querySelector("#res");

guardar.onclick=()=>{
var nombre = document.getElementById("nombre").value;
var ap = document.getElementById("ap").value;
var am = document.getElementById("am").value;
var g = document.getElementById("g").value;
var c = document.getElementById("c").value;

if(nombre.trim()=="" ||ap.trim()==""||am.trim()==""){
  Swal.fire({
    title:"Alumnos",
    text:"Tienes campos vacíos, ingresa valores válidos",
    icon:"error"
  });
  return;
}

let alumno={nombre,ap,am,g,c};
alumnos.push(alumno);
  localStorage.setItem("alumnos", JSON.stringify(alumnos));
  imprimirAlumnos();
  limpiarForm();
  
}

const imprimirAlumnos = () =>{
  var x=(JSON.parse(localStorage.getItem("alumnos"))==null)?[]:JSON.parse(localStorage.getItem("alumnos"));
  let tablaHTML=
  `<table class="table-secondary w-75 m-auto">
      <tr>
      <td>Nombre</td>
      <td>Apellido-P</td>
      <td>Apellido-M</td>
      <td>Grupo</td>
      <td>Carrera</td>
      <td> </td>
      <td> </td>
      </tr>
      `;     
      let index=0;       
  x.forEach(a=>{
    tablaHTML+=`
    <tr>
    <td>${a.nombre}</td>
    <td>${a.ap}</td>
    <td>${a.am}</td>
    <td>${a.g}</td>
    <td>${a.c}</td>
    <td><button class="btn btn-danger" onclick="delAlumnos(${index})">DEL</button></td>
<td><button class="btn btn-primary" onclick="mostrarAlumnos(${index})" data-bs-toggle="modal" data-bs-target="#actualizarR">Editar
</button></td>
    </tr>
    `
    index++;
   })
  
 divRes.innerHTML=tablaHTML;
  
} 


const limpiarForm=()=>{
  document.getElementById("nombre").value="";
  document.getElementById("ap").value="";
  document.getElementById("am").value="";
  document.getElementById("c").selectedIndex=0;
  document.getElementById("g").selectedIndex=0;

}

borrar.onclick=()=>{
  localStorage.clear();
  nombre.value="";
  ap.value="";
  am.value="";
  g.selectedIndex=0;
  c.selectedIndex=0;
  divRes.innerHTML="";
  
}


delAlumnos=(index)=>{
  
    Swal.fire({
      title: "¿Estás seguro de eliminar a este alumno?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No"
    }).then((result) => {
    
      if (result.isConfirmed) { 

       alumnos.splice(index, 1);
       localStorage.setItem("alumnos", JSON.stringify(alumnos)); 
       imprimirAlumnos(); 
       
        Swal.fire("El alumno se eliminó exitosamente", "", "success");
      }
    });
    
  }


  var indiceAlumno; 
  function mostrarAlumnos(index) {
    indiceAlumno=index;
      var alumnos = JSON.parse(localStorage.getItem("alumnos"));
      var alumno = alumnos[index];
  
      document.getElementById("nom").value = alumno.nombre;
      document.getElementById("apa").value = alumno.ap;
      document.getElementById("ama").value = alumno.am;
      document.getElementById("gr").value = alumno.g;
      document.getElementById("ca").value = alumno.c;
      document.getElementById("actualizarR").style.display = "block"; 
  }
  
  actualizar.onclick = () => {
    var alumnos = JSON.parse(localStorage.getItem("alumnos"));
    var alumno = alumnos[indiceAlumno]; 

    alumno.nombre = document.getElementById("nom").value;
    alumno.ap = document.
    getElementById("apa").value;
    alumno.am = document.getElementById("ama").value;
    alumno.g = document.getElementById("gr").value;
    alumno.c = document.getElementById("ca").value;

    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    imprimirAlumnos();

  
    var myModal = new bootstrap.Modal(document.getElementById('actualizarR'));
    myModal.hide();
}