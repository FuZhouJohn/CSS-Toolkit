zButton.onfocus = function (e) {
    zButton.classList.add('active')
}
zButton.onblur = function (e) {
    zButton.classList.remove('active')
}
zButton.onclick = function(e){
    let mask = document.createElement('span')
    mask.style.left = e.offsetX + 'px';
    mask.style.top = e.offsetY + 'px';
    mask.id = 'mask'
    mask.className = 'mask'
    mask.addEventListener('animationend',function(e){
        e.target.remove()
        zButton.blur()
    })
    e.target.append(mask)
}
