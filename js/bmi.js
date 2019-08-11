const inputTaille = document.querySelector('input[name="taille"]')
const inputPoid = document.querySelector('input[name="poid"]')
const form = document.querySelector('.form')
const resultElt = document.querySelector('#resultIMC')
const cardResultElt = document.querySelector('.card-result')
const cardResultH3 = document.querySelector('.card-result h3')

/**
* calcul IMC
*/
const calculImc = (t = 0, p = 0) => {
    t = t / 100 //convert to meter
    let tailleM = (Math.pow(t, 2))
    const IMC = p / tailleM
    return IMC
}

/** 
* get IMC
*/
const getImc = (taille, poid) => {
    let imc = calculImc(taille,poid)
    let icon, iconType
    resultElt.className = ""
    if(imc < 15.9999999){
        resultElt.classList.add('info')
        iconType = 'low'
    }
    else if ((imc >= 16) && (imc < 18.4999999) ) {
        resultElt.classList.add('info')
        iconType = 'low'
    }
    else if ((imc >= 18.5) && (imc < 24.9999999) ) {
        resultElt.classList.add('success')
        iconType = 'good'
    }
    else if ((imc >= 25) && (imc < 29.9999999) ) {
        resultElt.classList.add('warning')
        iconType = 'warning'
    }
    else if ((imc >= 30) && (imc < 29.9999999) ) {
        resultElt.classList.add('danger')
        iconType = 'danger'
    }
    else if ((imc >= 30) && (imc < 34.9999999) ) {
        resultElt.classList.add('danger')
        iconType = 'danger'
    }
    else if ((imc >= 35) && (imc < 39.9999999) ) {
        resultElt.classList.add('danger')
        iconType = 'danger'
    }
    else {
        resultElt.classList.add('danger')
        iconType = 'danger'
    }
    icon = createIcon(iconType)
    resultElt.innerHTML = Math.round(imc)
    resultElt.append(icon)
}

/**
 * form value is valid
 * return Bool 
 */
const valueIsValid = (taille, poid) => {
    if (
        (taille !== undefined) && (poid !== undefined) && 
        (taille !== isNaN) && (poid !== isNaN) && 
        (taille !== null) && (poid !== null) &&
        (taille !== '') && (poid !== '') &&
        (taille > 0) && (poid > 0)
    ){
        return true
    }else{
        return false
    }
}

/**
 * show form error
 */
const formError = message => {
    const formErrorElt = document.createElement('div')
    formErrorElt.classList.add('form-error')
    formErrorElt.innerText = message
    document.body.appendChild(formErrorElt)
    
    formErrorElt.classList.add('visible')
    setTimeout(() => {
        formErrorElt.classList.remove('visible')
    }, 3000);
}

/**
 * form submit
 */
form.addEventListener('submit', e => {
    e.preventDefault()
    let taille = inputTaille.value
    let poid = inputPoid.value

    if(valueIsValid(taille, poid)){
        getImc(taille, poid)
        window.scrollBy({
            top: cardResultElt.offsetHeight,
            left: 0,
            behavior: 'smooth'
        });

        cardResultH3.classList.add('visible')
    }else{
        formError('Veuillez entrer une taille est un poid valide')
        initValue()
    }
})

const initValue = ()=> {
    taille = 0
    poid = 0
}

/**
 * create icon 
 * @param {*} type 
 */
const createIcon = (type) => {
    if (type === 'low' || type === 'good' || type === 'warning' || type === 'danger' ){
        let div = document.createElement('div')
        let span = document.createElement('span')        
        
        div.append(span)    
        div.classList.add('icon', `icon-${type}`)

        if(type === 'low'){
            let span2 = document.createElement('span')  
            div.append(span2)
        }
        return div
    }
}

/**
* window load event 
*/
window.addEventListener('load', ()=>{
    inputTaille.focus()
})