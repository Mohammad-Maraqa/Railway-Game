function createElement(type, id, value, inputType) {
    let element = document.createElement(type)
    element.setAttribute("id",id)
    if(value) element.innerHTML = value
    if(inputType) element.type = inputType

    return element
}
