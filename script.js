var matrix = mathGenerator(15, 15)

function mathGenerator(n, m) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push([])
        for (var j = 0; j < m; j++) {

            arr[i].push(Math.round(Math.random() * 1))
        }
    }
    arr[3][5] = 2;
    arr[3][6] = 8;
    arr[3][7] = 7;
    arr[4][7] = 5;


    return arr
}


var side = 50

var personArr = [];

var coronaArr = [];

var docArr = [];

var hosArr = [];

var healthyPersonArr = []

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);


    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Person(x, y);
                personArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var fr = new Corona(x, y)
                coronaArr.push(fr)
            } else if (matrix[y][x] == 8) {
                var et = new Doc(x, y)
                docArr.push(et)
            } else if (matrix[y][x] == 7) {
                var ho = new Hospital(x, y)
                hosArr.push(ho)
            } else if (matrix[y][x] == 5) {
                var he = new HealthyPerson(x, y)
                hosArr.push(he)
            }
        }
    }




}
let human;
let corona;
let doc;
let hospital
let healthy;

function preload() {
    human = loadImage("https://www.graphicsfactory.com/clip-art/image_files/image/7/1680217-man-laughing-at-his-phone-vector-clipart.jpg");
    corona = loadImage('https://thumbs.dreamstime.com/b/coronavirus-evil-virus-cartoon-character-face-mask-against-covid-vector-illustration-isolated-white-coronavirus-covid-evil-175340881.jpg')
    doc = loadImage('https://thumbs.dreamstime.com/b/cartoon-doctor-fighting-big-green-virus-cure-coronavirus-fight-covid-concept-flat-vector-illustration-corona-isolated-white-177241588.jpg')
    hospital = loadImage('https://c8.alamy.com/comp/2BAPCT4/medical-character-vector-concept-design-doctor-and-nurse-characters-monitoring-giving-treatment-and-medicine-to-corona-virus-infected-patient-2BAPCT4.jpg')
    healthy = loadImage('https://thumbs.dreamstime.com/b/recovered-185475535.jpg')
}


function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill(0, 0, 0);
                image(human, x * side, y * side, side, side);
            } else if (matrix[y][x] == 0) {
                fill('white');
            } else if (matrix[y][x] == 2) {
                fill(0, 0, 0);
                image(corona, x * side, y * side, side, side);
            } else if (matrix[y][x] == 8) {
                fill(0, 0, 0);
                image(doc, x * side, y * side, side, side);
            } else if (matrix[y][x] == 7) {
                fill(0, 0, 0);
                image(hospital, x * side, y * side, side, side);
            } else if (matrix[y][x] == 5) {
                fill(0, 0, 0);
                image(healthy, x * side, y * side, side, side);
            }




            for (var i in personArr) {
                var emptyCells = personArr[i].chooseCell(0)
            }
        }
    }
    for (var i in personArr) {
        personArr[i].mul()
    }
    for (var i in coronaArr) {
        coronaArr[i].eat()
    }
    for (var i in docArr) {
        docArr[i].eat()
    }

    for (var i in hosArr) {
        hosArr[i].eat()
    }
    for (var i in healthyPersonArr) {
        healthyPersonArr[i].eat()
    }
}