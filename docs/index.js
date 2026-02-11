const cargaContenido = (url, n) => {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            document.getElementById('cuerpo').innerHTML = html;
            marcamenu(n)
            if (n === 0 || n === 3) especialidades(0, n)
        })
        .catch(err => console.log(err));
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
const especialidades = (sec, n) => {
    // n viene del menu
    document.getElementsByClassName("main-content")[0].children[0].innerHTML = DATOS.secciones[sec].titulo
    document.getElementsByClassName("main-content")[0].children[1].innerHTML = (n === 0) ? "" : DATOS.secciones[sec].texto
    const nfotos = DATOS.secciones[sec].imgs.length

    let cont = nfotos > n ? n : nfotos
    let z = 0
    if (n === 0) {
        cont = nfotos
        z = 2
    }
    cont = (n === 0) ? nfotos : cont
    let salida = new String()
    let img
    for (let i = z; i < cont; i++) {
        img = DATOS.secciones[sec].carpeta + DATOS.secciones[sec].imgs[i]
        salida += `<div class="image-container">
                        <img src="${img}" onclick="amplia('${img}')">
                    </div>`
    }
    document.getElementsByClassName("image-grid")[0].innerHTML = salida
}
const marcamenu = n => {
    const sels = [2, 3, null, 1]
    const menu = document.getElementsByClassName('menu')[0]
    for (let i = 1; i < menu.children.length; i++) {
        //console.log(i)
        if (sels[n] === i) { menu.children[i].children[0].style.borderLeftColor = 'var(--orange)' }
        else {
            menu.children[i].children[0].style.borderLeftColor = 'transparent'
        }
    }
}
const amplia = img => {
    debugger
    ampliacion.innerHTML = `<img src="${img}">`
    ampliacion.addEventListener('click', () => { 
        ampliacion.style.display = 'none'
        document.body.style.transform = "scale(1)"
    })
    ampliacion.style.display = 'flex'
}
// INICIO/////////////////////////////////////////////////////////////////////////////////////////////////

let DATOS
document.addEventListener('DOMContentLoaded', () => {
    /*const ampliacion = document.getElementById("ampliacion")*/
    const imgHome = [
        "H1.webp",
        "H2.webp",
        "H3.webp",
        "H4.webp",
        "H5.webp",
        "H6.webp",
        "H7.webp"
    ]
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
})
