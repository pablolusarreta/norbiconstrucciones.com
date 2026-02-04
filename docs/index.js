const cargaContenido = url => {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            document.getElementById('cuerpo').innerHTML = html;
        })
        .catch(err => console.log(err));
}

window.onload = () => {
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
} 