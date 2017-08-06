/** Makes the #clicker clickable. */
document.getElementById("clicker").style.cursor = "pointer";

/**
 * Adds an event listener to #clicker and increments #clicks.
 */
document.getElementById("clicker").addEventListener("click", function() {
    var currentClicks = parseInt(document.getElementById("clicks").innerHTML);
    document.getElementById("clicks").innerHTML = currentClicks + 1;
});

/** Class representing a building. */
class Building {

    /**
     * Create a building.
     * @param {string} color - The color of the building.
     * @param {number} count - The number of this building that exist.
     * @param {number} production - The number of clicks this building produces each second.
     * @param {number} initialCost - The initial cost of the building.
     * @param {number} currentCost - The current cost of the building.
     * @param {boolean} canBuy - Whether or not the building can be bought (currentCost vs. clicks).
     * @param {number} multiplier - The production multipler of this building.
     * @param {number} contribution - The percentage contribution of this building to clicks-per-second.
     */
    constructor(color, count, production, initialCost, currentCost, canBuy, multiplier, contribution) {
        this.color = color;
        this.count = count;
        this.production = production;
        this.initialCost = initialCost;
        this.currentCost = currentCost;
        this.canBuy = canBuy;
        this.multiplier = multiplier;
        this.contribution = contribution;
    }

    /**
     * Updates canBuy to reflect if currentCost is greater than clicks (false).
     */
    updateCanBuy() {
        if (this.currentCost <= parseInt(document.getElementById("clicks").innerHTML)) {
            this.canBuy = true;
        } else {
            this.canBuy = false;
        }
    }

    /**
     * Updates the cursor style and color of the building based on canBuy.
     */
    updateCursor() {
        if (this.canBuy) {
            document.getElementById(this.color).classList.remove("cannot-be-bought");
            document.getElementById(this.color).style.cursor = "pointer";
        } else {
            document.getElementById(this.color).classList.add("cannot-be-bought");
            document.getElementById(this.color).style.cursor = "default";
        }
    }

    /**
     * Updates currentCost based on initialCost and count.
     */
    updateCurrentCost() {
        if (this.count == 0) {
            this.currentCost = this.initialCost;
        } else {
            this.currentCost = this.initialCost * this.count + this.initialCost;
        }
    }

    /**
     * Updates contribution based on count, production, and #per-second.
     */
    updateContribution() {
        this.contribution = (((this.count * this.production) / parseInt(document.getElementById("per-second").innerHTML.match(/\d/g).join(""))) * 100).toFixed(2);
    }

    /**
     * Calls the building's updateX() methods to update its instance variables.
     */
    updateInstance() {
        this.updateCanBuy();
        this.updateCursor();
        this.updateCurrentCost();
        this.updateContribution();
        // console.log(this.color + " multiplier: " + this.multiplier + "x\n" +
        //             this.color + " contribution: " + this.contribution + "%");
    }

    /**
     * Updates the page's HTML to reflect changes in instance variables.
     */
    updateHTML() {
        document.getElementById(this.color + "-count").innerHTML = this.count;
        document.getElementById(this.color + "-cost").innerHTML = "cost: " + this.currentCost;
    }

}

var red = new Building("red", 0, 1, 1, 1, false, 1, 0);
var orange = new Building("orange", 0, 2, 2, 2, false, 1, 0);
var yellow = new Building("yellow", 0, 4, 4, 4, false, 1, 0);
var green = new Building("green", 0, 8, 8, 8, false, 1, 0);
var blue = new Building("blue", 0, 16, 16, 16, false, 1, 0);
var indigo = new Building("indigo", 0, 32, 32, 32, false, 1, 0);
var violet = new Building("violet", 0, 64, 64, 64, false, 1, 0);

var buildings = [red, orange, yellow, green, blue, indigo, violet];

document.getElementById("red").onclick = function() { incrementBuilding("red"); };
document.getElementById("orange").onclick = function() { incrementBuilding("orange"); };
document.getElementById("yellow").onclick = function() { incrementBuilding("yellow"); };
document.getElementById("green").onclick = function() { incrementBuilding("green"); };
document.getElementById("blue").onclick = function() { incrementBuilding("blue"); };
document.getElementById("indigo").onclick = function() { incrementBuilding("indigo"); };
document.getElementById("violet").onclick = function() { incrementBuilding("violet"); };

/**
 * Increments building count if building can be bought and subtracts currentCost from #clicks.
 */
function incrementBuilding(color) {
    var count = parseInt(document.getElementById(color + "-count").innerHTML);
    var cost = document.getElementById(color + "-cost").innerHTML;
    cost = parseInt(cost.substr(cost.indexOf(":") + 1));
    var clicks = parseInt(document.getElementById("clicks").innerHTML);
    if (clicks >= cost) {
        document.getElementById(color + "-count").innerHTML = count + 1;
        document.getElementById("clicks").innerHTML = parseInt(document.getElementById("clicks").innerHTML) - cost;
        if (color == "red") {
            red.count++;
        } else if (color == "orange") {
            orange.count++;
        } else if (color == "yellow") {
            yellow.count++;
        } else if (color == "green") {
            green.count++;
        } else if (color == "blue") {
            blue.count++;
        } else if (color == "indigo") {
            indigo.count++;
        } else if (color == "violet") {
            violet.count++;
        }
    }
}

/**
 * Adds the clicks produced from each building to #clicks every second.
 */
function updateClicks() {
    var count = 0;
    for (var i = 0; i < buildings.length; i++) {
        count += buildings[i].production * buildings[i].count;
    }
    document.getElementById("clicks").innerHTML = parseInt(document.getElementById("clicks").innerHTML) + count;;
    setTimeout(updateClicks, 1000);
}

updateClicks();

/**
 * Calculates the number of clicks gained per second based on building counts.
 */
function updatePerSecond() {
    var perSecond = 0;
    for (var i = 0; i < buildings.length; i++) {
        perSecond += buildings[i].production * buildings[i].count;
    }
    document.getElementById("per-second").innerHTML = perSecond + " per second";
    setTimeout(updatePerSecond, 10);
}

updatePerSecond();

/**
 * Continually updates each building's instance variables and the page's HTML.
 */
function updateGame() {
    var clicks = parseInt(document.getElementById("clicks").innerHTML);
    for (var i = 0; i < buildings.length; i++) {
        buildings[i].updateInstance();
        buildings[i].updateHTML();
    }
    setTimeout(updateGame, 100);
}

updateGame();