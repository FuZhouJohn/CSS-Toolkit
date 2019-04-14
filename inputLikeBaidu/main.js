keyWordsInput.oninput = function (e) {
    if (e.target.value) {
        let keywords = []

        /**
         * 清空DOM子元素
         */
        while (options.firstChild) {
            options.removeChild(options.firstChild);
        }

        for (let i = 0; i < 4; i++) {
            keywords.push(e.target.value + '测试' + i)
        }
        
        let reg = new RegExp("^(" + e.target.value + ")", 'ig');
        for (let i = 0; i < keywords.length; i++) {
            console.log(reg)
            let str = keywords[i];
            let n = str.replace(reg, '<b>' + e.target.value + '</b>')
            let li = document.createElement('li')
            li.innerHTML = n
            options.append(li)
        }
        options.classList.add('active')
    } else {
        options.classList.remove('active')
    }
}