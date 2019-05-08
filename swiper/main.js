var allButtons = $('#buttons>span')
for (let i = 0; i < allButtons.length; i++) {
  allButtons.eq(i).on('click', function (x) {
    var index = $(x.currentTarget).index()
    let p = index * -500
    $('#images').css({
      transform: 'translateX(' + p + 'px)'
    })
    n = index
    activeButton(allButtons.eq(n))
  })
}

var n = 0
var size = allButtons.length
allButtons.eq(n % size).trigger('click')
var interval = setTimer()

$('.window').on('mouseenter', () => {
  window.clearInterval(interval)
})

$('.window').on('mouseout', () => {
  interval = setTimer()
})

function setTimer(){
  return setInterval(() => {
    n += 1
    allButtons.eq(n % size).trigger('click')
  }, 3000);
}

function activeButton(abutton){
  abutton.addClass('red').siblings().removeClass('red')
}