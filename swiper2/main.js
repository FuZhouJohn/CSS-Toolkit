let $slides = $("#slides");
let $images = $slides.children();
let current = 0;

makeFakeImage();
buttonInit();

let $buttons = $("#buttonWrapper>button");

bindEvents();

let timer = setInterval(() => {
    goToSlide(current + 1);
}, 2000);

function buttonInit() {
    for (let i = 0; i < $images.length; i++) {
        $("#buttonWrapper").append($("<button></button>").text(i + 1));
    }
}

function makeFakeImage() {
    let $firstCopy = $images.eq(0).clone(true);
    let $lastCopy = $images.eq($images.length - 1).clone(true);

    $slides.append($firstCopy);
    $slides.prepend($lastCopy);
}

function bindEvents() {
    console.log($buttons);
    $buttons.on("click", e => {
        let $button = $(e.currentTarget);
        let index = $button.index();
        goToSlide(index);
    });
    $(next).on("click", () => {
        goToSlide(current + 1);
    });
    $(previous).on("click", () => {
        goToSlide(current - 1);
    });
    $(".container").on("mouseenter", () => {
        window.clearInterval(timer);
    });
    $(".container").on("mouseleave", () => {
        timer = setInterval(() => {
            goToSlide(current + 1);
        }, 2000);
    });
    $(document).on("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            window.clearInterval(timer);
        }

        // 用户打开或回到页面
        if (document.visibilityState === "visible") {
            timer = setInterval(() => {
                goToSlide(current + 1);
            }, 2000);
        }
    });
}

function goToSlide(index) {
    if (index > $buttons.length - 1) {
        index = 0;
    } else if (index < 0) {
        index = $buttons.length - 1;
    }

    if (current === $buttons.length - 1 && index === 0) {
        //最后一张到第一张
        $slides
            .css({
                transform: `translateX(${-($buttons.length + 1) * 400}px)`
            })
            .one("transitionend", () => {
                $slides.hide().offset();
                $slides
                    .css({
                        transform: `translateX(${-(index + 1) * 400}px)`
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
                        transform: `translateX(${-(index + 1) * 400}px)`
                    })
                    .show();
            });
    } else {
        $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` });
    }
    current = index;
}
