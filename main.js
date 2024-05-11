//#region Clases
class Persona
{
    constructor(id, nombre, apellido, fechaNacimiento)
    {
        if (id == "" || nombre == "" || apellido == "" || fechaNacimiento == "") 
        {
            alert("Todos los campos son obligatorios.");
            throw new Error("Todos los campos son obligatorios.");
        }

        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento.toString();
    }


    toString()
    {
        return `${this.nombre} ${this.apellido}, nació el ${this.fechaNacimiento}`;
    }

}

class Ciudadano extends Persona
{

    constructor(id, nombre, apellido, fechaNacimiento, dni)
    { 
        if(dni <= 0)
    {
        alert("el dni debe ser mayor a 0");
        throw new Error("DNI MENOR A 0");
    }
        super(id, nombre, apellido, fechaNacimiento);
        this.dni = dni;
    }


    toString()
    {
        return `${this.nombre} ${this.apellido}, nació el ${this.fechaNacimiento}, y su dni es ${this.dni}`;
    }
}

class Extranjero extends Persona
{

    constructor(id, nombre, apellido, fechaNacimiento, paisOrigen)
    {
        if(paisOrigen == null)
            {
                alert("data inválida");
                throw new Error("no pais ingresado");
            }
        super(id,nombre,apellido,fechaNacimiento);
        this.paisOrigen = paisOrigen;
    }

    toString()
    {
        return `${this.nombre} ${this.apellido}, nació el ${this.fechaNacimiento}, y su país de origen es: ${this.paisOrigen}`;
    }
}
//#endregion


//checkbox
const chkId = document.getElementById("chk-id");
const chkNombre = document.getElementById("chk-nombre");
const chkApellido = document.getElementById("chk-apellido");
const chkFechaNac = document.getElementById("chk-fechaNac");
const chkDni = document.getElementById("chk-dni");
const chkPaisOrigen = document.getElementById("chk-paisorigen");

const listaCheckbox = [
    chkId,
    chkNombre,
    chkApellido,
    chkFechaNac,
    chkDni,
    chkPaisOrigen,
];

// Botones

const btnCalcular = document.getElementById("btn-calcular-edad");
const btnAgregarPersonas = document.getElementById("btn-agregar-persona");

function deschequearChk()
{
    listaCheckbox.forEach(chk => {chk.checked = false});
}

//#region Listas de personas

let stringDatos = '[{"id":1,"apellido":"Serrano","nombre":"Horacio","fechaNacimiento":19840103,"dni":45876942},{"id":2,"apellido":"Casas","nombre":"Julian","fechaNacimiento":19990723,"dni":98536214},{"id":3,"apellido":"Galeano","nombre":"Julieta","fechaNacimiento":20081103,"dni":74859612},{"id":4,"apellido":"Molina","nombre":"Juana","fechaNacimiento":19681201,"paisOrigen":"Paraguay"},{"id":5,"apellido":"Barrichello","nombre":"Rubens","fechaNacimiento":19720523,"paisOrigen":"Brazil"},{"id":666,"apellido":"Hkkinen","nombre":"Mika","fechaNacimiento":19680928,"paisOrigen":"Finlandia"}]';
let lista = JSON.parse(stringDatos);

let listaPersonas = lista.map(persona => new Persona(persona.id, persona.nombre,persona.apellido, persona.fechaNacimiento,persona.dni,persona.paisOrigen));
MostrarTabla(listaPersonas);

let listaCiudadanos = lista.filter(persona => persona.dni > 0);
listaCiudadanos = listaCiudadanos.map(ciudadano => new Ciudadano(ciudadano.id,ciudadano.nombre,ciudadano.apellido,ciudadano.fechaNacimiento,ciudadano.dni));

let listaExtranjeros = lista.filter(persona => persona.paisOrigen != null);
listaExtranjeros = listaExtranjeros.map(extranjero => new Extranjero(extranjero.id,extranjero.nombre,extranjero.apellido,extranjero.fechaNacimiento,extranjero.paisOrigen));

//#endregion

var select = document.getElementById("select-personas");

function calcularEdadPromedio(lista_param)
{
    const listaAnios = lista_param.map(persona => parseInt(persona.fechaNacimiento.substring(0,4)));
    const listaEdades = listaAnios.map(anio => 2024 - anio);
    const edadTotal = listaEdades.reduce((acumulador, actual) => acumulador + actual , 0);
    const edadPromedio = edadTotal / listaEdades.length;


    document.getElementById("calcular-edad").value = edadPromedio;
}

btnCalcular.addEventListener("click", function(){
    switch (select.value) 
    {
        case "Todos":
            calcularEdadPromedio(listaPersonas);
            break;
        case "Ciudadano":
            calcularEdadPromedio(listaCiudadanos);
            break;
        default:
            calcularEdadPromedio(listaExtranjeros)
            break;
    }
}
);

// Tabla datos

function MostrarTabla(listaPersonas)
{
    const tabla = document.getElementById("tabla-personas");
    tabla.innerHTML = "";

    const listaEncabezado = ["ID","Nombre","Apellido","FechaNacimiento","DNI","PaisOrigen"];

    const encabezado = document.createElement("tr");
    listaEncabezado.forEach(atributo => {
        const tablaHead = document.createElement("th");
        tablaHead.className = "col-" + atributo.toLowerCase();
        const botonesHead = document.createElement("button");
        botonesHead.style.width = "100%";
        botonesHead.id = "btn-" + atributo.toLowerCase();
        botonesHead.className="col-" + atributo.toLowerCase();
        botonesHead.textContent = atributo;
        tablaHead.appendChild(botonesHead);
        encabezado.appendChild(tablaHead);
        tabla.appendChild(encabezado);
    });

    listaPersonas.forEach(persona => 
        {
            const fila = document.createElement("tr");

            //ID

            const celdaID = document.createElement("td");
            celdaID.textContent = persona.id;
            celdaID.className = "col-id";
            fila.appendChild(celdaID);

            // Nombre
            const celdaNombre = document.createElement("td");
            celdaNombre.textContent = persona.nombre;
            celdaNombre.className = "col-nombre";
            fila.appendChild(celdaNombre);

            // Apellido
            const celdaApellido = document.createElement("td");
            celdaApellido.textContent = persona.apellido;
            celdaApellido.className = "col-apellido";
            fila.appendChild(celdaApellido);

            // Edad
            const celdaFechaNac = document.createElement("td");
            celdaFechaNac.textContent = persona.fechaNacimiento;
            celdaFechaNac.className = "col-fechanacimiento";
            fila.appendChild(celdaFechaNac);

            // DNI
            const celdaDni = document.createElement("td");
            celdaDni.textContent = persona.dni;
            celdaDni.className = "col-dni";
            fila.appendChild(celdaDni);

            // Pais origen
            const celdaPaisOrigen = document.createElement("td");
            celdaPaisOrigen.textContent = persona.paisOrigen;
            celdaPaisOrigen.className = "col-paisorigen";
            fila.appendChild(celdaPaisOrigen);

            tabla.appendChild(fila);
            
        }
    );

    document.getElementById("btn-id").addEventListener("click",function(){ordenarColumnas("id")});
    document.getElementById("btn-nombre").addEventListener("click",function(){ordenarColumnas("nombre")});
    document.getElementById("btn-apellido").addEventListener("click",function(){ordenarColumnas("apellido")});
    document.getElementById("btn-fechanacimiento").addEventListener("click",function(){ordenarColumnas("fechanacimiento")});
    document.getElementById("btn-dni").addEventListener("click",function(){ordenarColumnas("dni")});
    document.getElementById("btn-paisorigen").addEventListener("click",function(){ordenarColumnas("paisorigen")});

    obtenerFilas();

}

// Obtener valores del select



function FiltrarSelect()
{
    let valorSeleccionado = select.value;

    if (valorSeleccionado === "Todos")
    {
        deschequearChk();
        MostrarTabla(listaPersonas);
    }
    else if(valorSeleccionado === "Ciudadano")
    {
        deschequearChk();
        MostrarTabla(listaCiudadanos);
    }
    else if(valorSeleccionado === "Extranjero")
    {
        deschequearChk();
        MostrarTabla(listaExtranjeros);
    }
    
    console.log("El valor seleccionado es: " + valorSeleccionado);
}
select.addEventListener("change", FiltrarSelect);


function mostrarColumnaChk(checkbox, claseColumna)
{
    var columnas = document.getElementsByClassName(claseColumna);

    for(var i = 0 ; i < columnas.length; i++)
        {
            columnas[i].style.display = checkbox.checked ? 'none' : '';
        }
}

chkId.addEventListener("change", function(){mostrarColumnaChk(chkId,"col-id");});
chkNombre.addEventListener("change", function(){mostrarColumnaChk(chkNombre,"col-nombre");});
chkApellido.addEventListener("change", function(){mostrarColumnaChk(chkApellido,"col-apellido");});
chkFechaNac.addEventListener("change", function(){mostrarColumnaChk(chkFechaNac,"col-fechanacimiento");});
chkDni.addEventListener("change", function(){mostrarColumnaChk(chkDni,"col-dni");});
chkPaisOrigen.addEventListener("change", function(){mostrarColumnaChk(chkPaisOrigen,"col-paisorigen");});



const formABM = document.getElementById("formABM");
const inputId = document.getElementById("inputId");
const inputAtributo1 = document.getElementById("inputAtributo1");
const inputAtributo2 = document.getElementById("inputAtributo2");
const inputAtributo3 = document.getElementById("inputAtributo3");
const listaInputs = [inputId,inputAtributo1,inputAtributo2,inputAtributo3];
const formDatos = document.getElementById("div-tabla");

function mostrarFormABM()
{
    
    if(formABM.style.display === "none")
    {
        formABM.style.display = "block";
        listaInputs.forEach(input => {input.value  = "";});
        formDatos.style.display = "none";
    }
    else
    {
        formABM.style.display = "none";
    }
    inputId.readOnly = false;
    
}

btnAgregarPersonas.addEventListener("click",mostrarFormABM);

function ordenarColumnas(criterioOrden)
{
    mostrar = [];
    switch(select.value)
    {
        case "Ciudadano":
            mostrar = [...listaCiudadanos];
            break;
        case "Extranjero":
            mostrar = [...listaExtranjeros];
            break;
        default:
            mostrar = [...listaPersonas];
            break;
    }
    switch(criterioOrden)
    {
        case "id":
            mostrar = mostrar.sort((id1,id2) => id1.id-id2.id);
            break;
        case "nombre":
            mostrar = mostrar.sort((nombre1,nombre2) => nombre1.nombre.localeCompare(nombre2.nombre));
            break;
        case "apellido":
            mostrar = mostrar.sort((apellido1,apellido2) => apellido1.apellido.localeCompare(apellido2.apellido));
            break;
        case "fechanacimiento":
            mostrar = mostrar.sort((fecha1,fecha2) => fecha1.fechaNacimiento-fecha2.fechaNacimiento);
            break;
        case "dni":
            mostrar = mostrar.sort((dni1,dni2) => dni1.dni - dni2.dni);
            break;
        case "paisorigen":
            mostrar = mostrar.sort((pais1,pais2) => pais1.paisorigen-pais2.paisorigen);
            break
        
    }
    MostrarTabla(mostrar);


}



function obtenerFilas()
{
    var tabla = document.getElementById("tabla-personas");
    var filas = tabla.getElementsByTagName("tr");

    for(var i = 1; i < filas.length; i++){
        filas[i].addEventListener("click",function(){
            formABM.style.display = "block";
            formDatos.style.display  = "none";
            var celdas = this.getElementsByTagName("td");
            var datos = [];
        
            for (var j = 0; j < celdas.length; j++)
            {
                datos.push(celdas[j].textContent);
            }
            for(var k = 0; k < listaInputs.length; k++)
            {
                listaInputs[k].value = datos[k];
            }

            inputId.readOnly = true;

        });

    }
}

const selectTipo = document.getElementById("selectTipo");

function darAltaOmodificar()
{
var valorSeleccionado = selectTipo.value;
var idUnico = true;

switch(inputId.readOnly)
{
    case true:
        listaPersonas.forEach(persona => {
            if (inputId.value == persona.id)
            {
                persona.nombre = inputAtributo1.value;
                persona.apellido = inputAtributo2.value;
                persona.fechaNacimiento = inputAtributo3.value;
            }
        })
        break;

    default:
        listaPersonas.forEach(persona => 
            {
                if (persona.id == inputId.value)
                    {
                        idUnico = false;
                    }
            });
            if(!idUnico)
                {
                    alert("El ID debe ser único");
                }
            else
            {
                if(valorSeleccionado === "Ciudadano")
                {
                    let ciudadano_nuevo = new Ciudadano(inputId.value,inputAtributo1.value,inputAtributo2.value,inputAtributo3.value);
                    listaCiudadanos.push(ciudadano_nuevo);
                    listaPersonas.push(ciudadano_nuevo);
                }
                else if(valorSeleccionado === "Extranjero")
                {
                    let extranjero_nuevo = new Extranjero(inputId.value,inputAtributo1.value,inputAtributo2.value,inputAtributo3.value);
                    listaExtranjeros.push(extranjero_nuevo);
                    listaPersonas.push(extranjero_nuevo);
                }
                
            }
    break;
    }
    MostrarTabla(listaPersonas);

    formDatos.style.display = "block";
    formABM.style.display = "none";
}

const btnAceptar = document.getElementById("enviarDatos");
btnAceptar.addEventListener("click",darAltaOmodificar);

const btnCancelar = document.getElementById("cancelar");
btnCancelar.addEventListener("click",function(){formABM.style.display = "none";formDatos.style.display = "block"});