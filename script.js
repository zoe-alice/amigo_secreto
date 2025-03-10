
const listaAmigos=JSON.parse(localStorage.getItem('listaAmigos')) || [];

function agregarAmigos(){
    let amigo=document.getElementById('inputAmigo').value;
   

    if(amigo.trim()===''){
        alert('input vacion, Agrege a una persona');
        return;
    }

    if(listaAmigos.includes(amigo)){
        alert('¡Este amigo ya está en la lista!');
        return;
    }

    listaAmigos.push(amigo);
   document.getElementById('inputAmigo').value='';

   //guardar la lista actualizada en el localstorage
   localStorage.setItem('listaAmigos', JSON.stringify(listaAmigos));

   console.log(listaAmigos);

   mostrarAmigos();
}

function mostrarAmigos(){
    
    let elemento=document.getElementById('textarea');
    
     // Usar map para transformar cada elemento y luego unirlos con un guion
     elemento.value = listaAmigos
     .map((amigo) => `- ${amigo}`) // Añade un guion antes de cada amigo
     .join('\n') // Une los elementos con un salto de línea
     .trim(); // Elimina espacios vacíos o saltos de línea no deseados al final
}

function actualizarListaDesdeTextarea() {
    let elemento = document.getElementById('textarea');
    // Obtener el contenido del textarea y convertirlo en un array
    let nuevosAmigos = elemento.value
        .split('\n') // Divide el contenido por saltos de línea
        .map((linea) => linea.trim().replace(/^- /, '')) // Elimina el guion y espacios
        .filter((amigo) => amigo !== ''); // Filtra líneas vacías


    listaAmigos.length = 0; 
    listaAmigos.push(...nuevosAmigos); // Agregar los nuevos amigos

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('listaAmigos', JSON.stringify(listaAmigos));
    console.log('Lista actualizada:', listaAmigos);
}

function sortearAmigos(){
    const amigoSecreto=document.getElementById('amigoSecreto');
    if(listaAmigos.length<4){
        alert('Ingrese al menos 4 amigos para sortear');
        return;
    }
   // Mostrar el spinner
   amigoSecreto.innerHTML = `
   <div class="spinner-grow text-primary" role="status">
       <span class="visually-hidden">Cargando...</span>
   </div>
`;

// Simular una operación de carga (5 segundos)
setTimeout(() => {
   const amigoClave = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];
   const amigoClaveMayus = amigoClave.toUpperCase();

   // Mostrar el resultado
   amigoSecreto.textContent = amigoClaveMayus;
}, 4000); // 4 segundos de simulación de carga
}

function nuevoSorteo(){
    listaAmigos.length=0;
    localStorage.removeItem('listaAmigos');
    //limpiar   del  DOM
    document.getElementById('textarea').value='';
    document.getElementById('inputAmigo').value='';
    document.getElementById('amigoSecreto').textContent='?';
}

//CARGAR LA LISTA AL INICIAR LA PAGINA
window.addEventListener('load', ()=>{
    mostrarAmigos();
})

// EVENT LISTENER para detectar "Enter" en el input
document.getElementById('inputAmigo').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        agregarAmigos();
    }
});

// EVENT LISTENER para detectar cambios en el textarea
document.getElementById('textarea').addEventListener('input', function () {
    actualizarListaDesdeTextarea();
});

// EVENT LISTENER para evitar saltos de línea en el textarea
document.getElementById('textarea').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevenir el salto de línea
    }
});


