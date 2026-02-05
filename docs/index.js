const cargaContenido = (url, sec) => {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            document.getElementById('cuerpo').innerHTML = html;
            if (sec == 0) especialidades(0)
            if (sec == 1) trabajos()

        })
        .catch(err => console.log(err));
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
const especialidades = sec => {
    document.getElementsByClassName("main-content")[0].children[0].innerHTML = DATOS.secciones[sec].titulo
    document.getElementsByClassName("main-content")[0].children[1].innerHTML = DATOS.secciones[sec].texto
    const nfotos = DATOS.secciones[sec].imgs.length
    const cont = nfotos > 6 ? 6 : nfotos
    let salida = new String()
    for (let i = 0; i < cont; i++) {
        salida += `<div class="image-container">
                        <img src="${DATOS.secciones[sec].carpeta}${DATOS.secciones[sec].imgs[i]}">
                    </div>`
    }
    document.getElementsByClassName("image-grid")[0].innerHTML = salida
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
const trabajos = () => {
    let salida = new String()
    for (let i = 0; i < DATOS.secciones.length; i++) {
        salida += `  <main class="main-content">
                    <h1>${DATOS.secciones[i].titulo}</h1>
                    <div class="image-grid">`
        for (let j = 0; j < DATOS.secciones[i].imgs.length; j++) {
            salida +=   `<div class="image-container">
                            <img src="${DATOS.secciones[i].carpeta + DATOS.secciones[i].imgs[j]}">
                        </div>`
        }
        salida += "</div></main>"
    }
    document.getElementsByClassName("trabajos")[0].innerHTML = salida
}
// INICIO/////////////////////////////////////////////////////////////////////////////////////////////////
let DATOS
window.onload = () => {
    document.getElementById('cuerpo').addEventListener("load", () => { alert(9) })
    // PRESENTACION  
    const imgHome = ["H4.jpg", "H2.jpg", "H3.jpg", "H1.jpg"]
    const imgPresentacion = document.getElementById("presentacion")
    const imgPres = document.getElementById("imgPres")
    let foto = 0
    let alter = true
    imgPres.addEventListener("load", () => {
        imgPres.style.opacity = '1'
    })
    const presentacion = () => {
        if (alter) {
            imgPres.src = `img/${imgHome[foto]}`
            setTimeout(() => {
                imgPresentacion.style.backgroundImage = `url('img/${imgHome[foto]}')`;
            }, 3000)
            alter = false
        } else {
            imgPres.style.opacity = '0'
            alter = true
        }
        foto = (foto == (imgHome.length - 1)) ? 0 : foto + 1
    }
    //ARRANQUE
    setInterval(presentacion, 10000)

    // DATOS JSON

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            DATOS = data
            //console.log(DATOS)
        })

} 