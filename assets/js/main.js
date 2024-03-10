var tareasHechas = [];
var tareasPendientes = [];

document.addEventListener('DOMContentLoaded', () => {
    $.notify.defaults({
        globalPosition: 'bottom center',
        verticalAlign: 'bottom'
    });
    document.getElementById('add').addEventListener('click', () => {

        var tarea = document.getElementById('tarea').value;
        var time = Date.now(); //esto lo hago para darle un identificador distinto a cada tarea

        if(tarea.trim() != ""){

            tareasPendientes.push({id:time, task:tarea});
            document.getElementById('tarea').value = " ";
            document.getElementById("tareas").innerHTML = "";
            console.clear(); //esto lo hacía para limpiar la consola pero el navegador no me la limpia
            $.notify("Tarea pendiente añadida", "info");
            for (var key in tareasPendientes){

                console.log(tareasPendientes[key]);

                var contenedor = document.createElement('div');
                var boton = document.createElement('input');
                var icono = document.createElement('i');
                var span = document.createElement('span');

                span.setAttribute("target", time);
                boton.setAttribute("value", "Done");

                contenedor.id = tareasPendientes[key].id;
                span.innerHTML = tareasPendientes[key].task;
                
                contenedor.className += "col-12 d-flex justify-content-between align-items-center bb";       
                boton.className += "btn btn-outline-success miB"; 
                span.className += "bold";

                boton.addEventListener("click", (event) => {

                    var identificador = event.target.parentNode.getAttribute("id");
                    var tareaEncontrada = tareasPendientes.find((tarea) => {
                        return tarea.id == identificador;
                    });

                    tareasHechas.push(tareaEncontrada);

                    tareasPendientes = tareasPendientes.filter((tarea) => {
                        return tarea.id != identificador;
                    });

                    console.log(identificador);
                    event.target.parentNode.remove(); 

                    completadas();
                });
                
                contenedor.appendChild(span);
                contenedor.appendChild(boton);
            
                document.getElementById('tareas').append(contenedor);
                
            }
        }
    });

    const completadas = () => {
        document.getElementById("completadas").innerHTML = "";
        document.getElementById("completadas").innerHTML += "<h6 class='text-success'>Tareas completadas</h6>";
        tareasHechas.forEach(function(tarea) {
            var spanT = document.createElement('span');
            spanT.innerHTML = tarea.task;
            spanT.className += "bold";
            document.getElementById("completadas").append(spanT);
        });
        $.notify("Tarea completada", "success");       
    }
});
