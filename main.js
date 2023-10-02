alert("Bienvenido a Almendra Pastelera")
let respuesta = prompt("¿Es tu primera vez en nuestra web? si/no").toLowerCase();
function enviarCorreo (email){
    alert (`Recibirás nuestras promociones en la casilla de ${email}`)
}

while (respuesta !== "si" && respuesta !== "no"){
    alert("Responde con si o no")
    respuesta = prompt("¿Es tu primera vez en nuestra web? si/no").toLowerCase();
    }
    if (respuesta === "no"){
        alert("¡Bienvenido de vuelta! Me alegra verte de nuevo por acá");
    }else{
        let promociones = prompt("¡Bienvenido! ¿Quieres mantenerte informado acerca de nuestras promociones? si/no").toLowerCase();
    
        while (promociones === "si"){
            let correo = prompt("Ingresa tu e-mail").toLowerCase();
                if(!correo.includes("@")){
                    alert("Correo incorrecto")
                }else{
                    enviarCorreo(correo)
                    break;
                }
        }
        if (promociones !== "si"){
            alert("Descubre nuestras recetas en el Menú");
        }
    }