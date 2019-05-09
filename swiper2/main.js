let index
initImage()
setInterval(()=>{
  makeLeave(getImage(index))
  .one('transitionend',(x)=>{
    makeWait($(x.currentTarget))
  })
  makeActive(getImage(index+1))
  index += 1
},3000)












function initImage(){
  index = 1
  $(`.images > img:nth-child(${index})`).addClass('active').siblings().addClass('wait')
}
function getImage(imageIndex){
  return $(`.images > img:nth-child(${getRightIndex(imageIndex)})`)
}
function getRightIndex(num){
  if(num>$('.images > img').length){
    num = num % $('.images > img').length
    if(num === 0){
      num = $('.images > img').length
    }
  }
  return num
}

function makeActive($node){
  return $node.removeClass('leave wait').addClass('active')
}
function makeLeave($node){
  return $node.removeClass('active wait').addClass('leave')
}
function makeWait($node){
  return $node.removeClass('active leave').addClass('wait')
}