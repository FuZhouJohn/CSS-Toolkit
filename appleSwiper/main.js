let $slides = $("#slides");
let $images = $slides.children();
let $buttons = $("#buttonWrapper>.button");
let current = 0;

makeFakeImage();

bindEvents();

let timer = setInterval(() => {
    goToSlide(current + 1);
}, 5000);

function makeFakeImage() {
    let $firstCopy = $images.eq(0).clone(true);
    let $lastCopy = $images.eq($images.length - 1).clone(true);

    $slides.append($firstCopy);
    $slides.prepend($lastCopy);
}

function bindEvents() {
    $buttons.on("click", e => {
        let $button = $(e.currentTarget);
        let index = $button.index();
        goToSlide(index);
    });
    $buttons.on("mouseenter", e => {
        let $button = $(e.currentTarget);
        if (!$button.hasClass("active")) {
            $button.addClass("hover");
        }
    });
    $buttons.on("mouseleave", e => {
        let $button = $(e.currentTarget);
        $button.removeClass("hover");
    });
    $(".container").on("mouseenter", () => {
        console.log(1);
        window.clearInterval(timer);
    });
    $(".container").on("mouseleave", () => {
        console.log(2);
        timer = setInterval(() => {
            goToSlide(current + 1);
        }, 5000);
    });
    $(document).on("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            console.log(1);
            window.clearInterval(timer);
        }
        // 用户打开或回到页面
        if (document.visibilityState === "visible") {
            console.log(2);
            timer = setInterval(() => {
                goToSlide(current + 1);
            }, 5000);
        }
    });
}

function goToSlide(index) {
    if (index > $buttons.length - 1) {
        index = 0;
    } else if (index < 0) {
        index = $buttons.length - 1;
    }
    $buttons
        .eq(index)
        .addClass("active")
        .siblings()
        .removeClass("active");
    if (current === $buttons.length - 1 && index === 0) {
        //最后一张到第一张
        $slides
            .css({
                transform: `translateX(${-($buttons.length + 1) * 920}px)`
            })
            .one("transitionend", () => {
                $slides.hide().offset();
                $slides
                    .css({
                        transform: `translateX(${-(index + 1) * 920}px)`
                    })
                    .show();
            });
    } else if (current === 0 && index === $buttons.length - 1) {
        //第一张到最后一张
        $slides
            .css({ transform: `translateX(0px)` })
            .one("transitionend", () => {
                $slides.hide().offset();
                $slides
                    .css({
                        transform: `translateX(${-(index + 1) * 920}px)`
                    })
                    .show();
            });
    } else {
        $slides.css({ transform: `translateX(${-(index + 1) * 920}px)` });
    }
    current = index;
}
