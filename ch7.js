function getTimeWithMS() {
    var now = new Date;
    return now.getTime() + (now.getMilliseconds() / 1000);
}

function benchmark(f) {
    var begin = getTimeWithMS();

    var count = 0;
    while (true) {
        f();
        count++;

        var now = getTimeWithMS();
        if (now - begin > 20) {
            return (now - begin) / count;
        }
    }

}

function trim_6_13(str) {
    return str.replace(/^\s+|\s+$/g, "");
}

function trim_6_14(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function trim_6_15(str) {
    var str = str.replace(/^\s\s*/, ''), ws = /\s/, i = str.length;
    while (ws.test(str.charAt(--i)));
    return str.slice(0, i + 1);
}

function plot(table) {
    var chd = table.map(function (row) {
        return row.map(function (n) {
            return Math.round(n * 200);
        }).join(',');
    }).join('|');

    var img = document.createElement('img');
    img.src = 'http://chart.apis.google.com/chart?chbh=2,1,8&chco=440008,988432,9E3711&chs=640x240&cht=bvg&chd=t:' + chd;
    document.getElementsByTagName('div')[0].appendChild(img);
}

(function () {
    var count = 0;
    var table = [ [], [], [] ];

    function f() {
        var str =
            (new Array(5).join(' ')) +
            (new Array(count * 100).join('x')) +
            (new Array(5).join(' '));

        table[0].push(benchmark(function () { trim_6_13(str); }));
        table[1].push(benchmark(function () { trim_6_14(str); }));
        table[2].push(benchmark(function () { trim_6_15(str); }));

        if (++count < 50) {
            setTimeout(f, 1);
        } else {
            plot(table);
        }
    }
    setTimeout(f, 1);
})();
