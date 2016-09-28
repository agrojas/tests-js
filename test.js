/* */
function Box(id) {
	this.id = id;
	this.stack = [];

	this.getOrigin = function() {
		return this.id;
	}

	this.getBoxOver = function() {
		return this.stack.pop();
	}
	this.addBoxOver = function(box) {
		this.stack.push(box);
	}

	
}

function Map(numPositions) {

	this.numPositions = numPositions;
	this.positions = [];

	for (var i = 0; i < this.numPositions; i++) {
		this.positions[i] = new Box(i);
	}

	this.isValidPosition = function(position) {
		return (position < this.numPositions && position  > 0);
	}

	this.get = function(position) {
		return this.positions[position];
	}

	this.addBox = function(box,position) {
		this.positions[position] = box;
	}

	this.removeBox = function(position) {
		return this.splice(position,1);
	}
}

function Arm(map){

	this.map = map;

	this.move = function(from,to) {
		console.log("From ", from, " to ", to);
		if (from == undefined || to == undefined) {
			return false;
		}
		//Chequeo que haya algo en el from
		if (!map.isValidPosition(from) || !map.isValidPosition(to)) {
			return false;
		}

		//Valido que exista una caja 
		var boxFrom = map.get(from);
		if (boxFrom == null) {
			return false;
		}

		// Valido que no exista otra caja arriba de la destino
		var boxTo = map.get(to);

		if (boxTo == null) {
			map.addBox(boxFrom);
		}
		
		var boxOver = boxTo.getBoxOver();
		
		while (boxOver != null) {
			this.move(to,boxOver.getOrigin());
			boxOver = boxTo.getBoxOver();
		}

		boxTo.addBoxOver(boxFrom);

		return true;
	}
}

function main() {
	var map = new Map(3);
	var arm = new Arm(map);
	console.log(map);
	var result = arm.move(1,2);
	console.log(result);
	console.log(map);
	// console.log(arm);
}

main();