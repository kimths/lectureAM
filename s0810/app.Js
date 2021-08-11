window.onload = function() {
    let current = 0;
    let isSlide = false;

    function slide(target, dir) {
        if (isSlide) return;

        if (target >= 7 && dir == 1) {
            target = 0;
            $(".slide-image").css({ "left": "100%" });
            $(".slide-image").eq(current).css({ "left": 0 });
        }

        if (target < 0 && dir == -1) {
            target = 6;
            $(".slide-image").css({ "left": "-100%" });
            $(".slide-image").eq(current).css({ "left": 0 });
        }
        isSlide = true;
        // 0,1,2,3,4,5,6 0 1 2 3 4 5 6 0 1 2 3 4 5 6 0
        $(".slide-image")
            .eq(target)
            .css({ "left": `${dir * 100}%` })
            .animate({ "left": 0 }, 800);

        $(".pin").removeClass("active");
        $(".pin").eq(target).addClass("active");
        $(".slide-image")
            .eq(current)
            .animate({ "left": `${-100 * dir}%` }, 800, function() {
                isSlide = false;
                current = target;
            });

    }
    $(".slide-image").css({ "left": "100%" });
    $(".slide-image").eq(current).css({ "left": 0 });

    $(".pin").on("click", function() {
        let idx = $(this).index();
        slide(idx, idx - current < 0 ? -1 : 1);
        $(".pin").removeClass("active");
        $(".pin").eq(idx).addClass("active");

    });

    $(".slide-btn").on("click", function() {
        let dir = $(this).data("dir") * 1; //숫자로 강제 형변환
        slide(current + dir, dir);
    });
    setInterval(function() {
        slide(current + 1, 1);
    }, 5000);
};