let index;
initImage();
let interval1 = initInterval();
function initInterval() {
    return setInterval(() => {
        makeLeave(getImage(index)).one("transitionend", x => {
            makeWait($(x.currentTarget));
        });
        makeActive(getImage(index + 1));
        index += 1;
    }, 3000);
}

/**
 * 监听页面隐藏和显示
 */
$(document).on("visibilitychange", x => {
    if (document.visibilityState === "hidden") {
        window.clearInterval(interval1);
    } else if (document.visibilityState === "visible") {
        interval1 = initInterval();
    }
});

/**
 * 初始化轮播
 */
function initImage() {
    index = 1;
    $(`.images > img:nth-child(${index})`)
        .addClass("active")
        .siblings()
        .addClass("wait");
}

/**
 * 获取图片对象
 * @param {Number} imageIndex
 */
function getImage(imageIndex) {
    return $(`.images > img:nth-child(${getRightIndex(imageIndex)})`);
}
/**
 * 获取正确下标
 * @param {Number} num
 */
function getRightIndex(num) {
    if (num > $(".images > img").length) {
        num = num % $(".images > img").length;
        if (num === 0) {
            num = $(".images > img").length;
        }
    }
    return num;
}
//三种状态切换：当前、离开、等待
function makeActive($node) {
    return $node.removeClass("leave wait").addClass("active");
}

function makeLeave($node) {
    return $node.removeClass("active wait").addClass("leave");
}

function makeWait($node) {
    return $node.removeClass("active leave").addClass("wait");
}
