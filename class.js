class Person {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiplay = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found
    }
    mul() {
        this.multiplay++;
        var found = this.chooseCell(0)
        var exact = random(found)
        if (exact && this.multiplay > 6) {
            let x = exact[0]
            let y = exact[1]
            let person = new Person(x, y)
            personArr.push(person)
            matrix[y][x] = 1
            this.multiplay = 0
        }
    }


}
class Corona {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    };
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found
    };
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)
        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];
            let corona = new Corona(x, y)
            matrix[y][x] = 2
            coronaArr.push(corona)
            this.energy = 20
        }
    }
    eat() {
        let found = this.chooseCell(1);
        let exact = random(found);
        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];
            for (var i = 0; i < personArr.length; i++) {
                if (x == personArr[i].x && y == personArr[i].y) {
                    personArr.splice(i, 1)
                }
            }
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0
            this.x = x;
            this.y = y;
            if (this.energy > 30) {
                this.mul();
            }

        }
        else {
            this.move()
        }
    };
    move() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy < 0) {
                this.die()
            }
            else {
                this.energy--
                if (this.energy < 0) {
                    this.die()
                }
            }
        }
    };
    die() {
        for (var i = 0; i < coronaArr.length; i++) {
            if (coronaArr[i].x == this.x && coronaArr[i].y == this.y) {
                coronaArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0

    }

}
class Doc {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    };
    chooseCell(character1) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 ) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found
    };
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)
        if (exact && this.energy > 10) {
            let x = exact[0];
            let y = exact[1];
            let doc = new Doc(x, y)
            matrix[y][x] = 8
            coronaArr.push(doc)
            this.energy = 10
        }
    }
    eat() {
        let found = this.chooseCell(2);
        let exact = random(found);
        if (exact) {
            this.energy += 10;
            let x = exact[0];
            let y = exact[1];
          
            for (var i = 0; i < personArr.length; i++) {
                if (x == personArr[i].x && y == personArr[i].y) {
                    personArr.splice(i, 2)
                }
            }
            matrix[y][x] = 8;
            matrix[this.y][this.x] = 0
            this.x = x;
            this.y = y;
            if (this.energy > 5) {
                this.mul();
            }

        }
        else {
            this.move()
        }
    };

    move() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 8;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy < 0) {
                this.die()
            }
            else {
                this.energy--
                if (this.energy < 0) {
                    this.die()
                }
            }
        }
    };
    die() {
        for (var i = 0; i < docArr.length; i++) {
            if (docArr[i].x == this.x && docArr[i].y == this.y) {
                docArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0

    }
   

}

class Hospital {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    };
    chooseCell(character1,character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 ) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found
    };
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)
        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];
            let hospital = new Hospital(x, y)
            matrix[y][x] = 7
            hosArr.push(hospital)
            this.energy = 20
        }
    }
    eat() {
        let found = this.chooseCell(8);
        let exact = random(found);
        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];
          
            for (var i = 0; i < personArr.length; i++) {
                if (x == personArr[i].x && y == personArr[i].y) {
                    personArr.splice(i, 8)
                }
            }
            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0
            this.x = x;
            this.y = y;
            if (this.energy > 30) {
                this.mul();
            }

        }
        else {
            this.move()
        }
    };
    move() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 7;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy < 0) {
                this.die()
            }
            else {
                this.energy--
                if (this.energy < 0) {
                    this.die()
                }
            }
        }
    };
    die() {
        for (var i = 0; i < hosArr.length; i++) {
            if (hosArr[i].x == this.x && hosArr[i].y == this.y) {
                hosArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0

    }

}
class HealthyPerson {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    };
    chooseCell(character1) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 ) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found
    };
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)
        if (exact && this.energy > 7) {
            let x = exact[0];
            let y = exact[1];
            let healthyPerson = new HealthyPerson(x, y)
            matrix[y][x] = 5
            healthyPersonArr.push(healthyPerson)
            this.energy = 20
        }
    }
    eat() {
        let found = this.chooseCell(7);
        let exact = random(found);
        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];
          
            for (var i = 0; i < personArr.length; i++) {
                if (x == personArr[i].x && y == personArr[i].y) {
                    personArr.splice(i, 7)
                }
            }
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0
            this.x = x;
            this.y = y;
            if (this.energy > 25) {
                this.mul();
            }

        }
        else {
            this.move()
        }
    };
    move() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 5;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy < 0) {
                this.die()
            }
            else {
                this.energy--
                if (this.energy < 0) {
                    this.die()
                }
            }
        }
    };
    die() {
        for (var i = 0; i < healthyPersonArr.length; i++) {
            if (healthyPersonArr[i].x == this.x && healthyPersonArr[i].y == this.y) {
                healthyPersonArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0

    }

}