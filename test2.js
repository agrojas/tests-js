/* */
function Box(id) {
	this.id = id;
	this.stack = [];
	this.currentPosition = this.id;

	this.setCurrentPosition = function(position) {
		this.currentPosition = position;
	}	

	this.setOriginPosition = function() {
		this.currentPosition = this.id;
	}

	this.getCurrentPosition = function() {
		return this.currentPosition;
	}
	
	this.getId = function() {
		return this.id;
	}
	
	this.getOrigin = function() {
		return this.id;
	}

	this.showBoxOver = function() {
		return this.stack[this.stack.length-1];
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
	this.boxes = [];

	for (var i = 0; i < this.numPositions; i++) {
		var box = new Box(i);
		// this.positions[i] = box; 
		this.boxes[i] = box; 
	}

	this.isValidPosition = function(position) {
		return (position < this.numPositions && position  >= 0);
	}

	this.getBox = function(position) {
		return this.boxes[position];
	}

	this.showBoxes = function(){
		this.boxes.forEach(function(box){console.log(box);})
	}

}

function Arm(map){

	this.map = map;

	this.validatePositions = function(from,to) {

		if (from == undefined || to == undefined) {
			return false;
		}
		
		//Chequeo que haya algo en el from
		if (!map.isValidPosition(from) || !map.isValidPosition(to)) {
			return false;
		}
		return true;
	}

	this.cleanBoxStack = function(box,boxOver) {
		console.log('cleanBoxStack');
		console.log(box);
		console.log('boxOver.getId()',boxOver.getId())
		console.log('boxOver.getCurrentPosition()',boxOver.getCurrentPosition());
		var boxOverAux = boxOver;
		var moveResult = false;
		while (boxOverAux != undefined && !moveResult) {
			moveResult = this.move(boxOverAux.getId(),boxOverAux.getId());
			boxOverAux = box.getBoxOver(); 
		}

	}

	this.move = function(from,to) {
		console.log('**************************');
		console.log("From ", from, " to ", to);
		
		if (!this.validatePositions(from,to)) {
			return false;
		}
		
		var boxFrom = map.getBox(from);
		var boxTo = map.getBox(to);
		
		// Caja volviendo al origen
		if (boxTo == null){
			console.log('Caja volviendo al origen');
			boxFrom.setOriginPosition();
			return true;
		} 

		//Valido que exista una caja encima
		var boxOverFrom = boxFrom.showBoxOver(); 
		var boxOverTo = boxTo.showBoxOver(); 

		if (boxOverFrom == undefined && boxOverTo == undefined) {
			console.log(boxOverFrom)
			console.log(boxOverTo)
			console.log('No existe caja arriba y se mueve');
			boxTo.addBoxOver(boxFrom);
			boxFrom.setCurrentPosition(to);
			return true;	
		}

		// La caja ya se encuentra arriba
		if (boxOverTo != undefined && boxOverTo.getId() == from) {
			console.log('La caja ya se encuentra arriba');
			return false;
		}

		if (boxOverFrom != undefined) {
			this.cleanBoxStack(boxFrom,boxOverFrom);
		}
	
		if (boxOverTo != undefined) {
			this.cleanBoxStack(boxTo,boxOverTo);
		}
	
	
		boxTo.addBoxOver(boxFrom);
		boxFrom.setCurrentPosition(to);
		return true;

	}
}

function test1(map,arm) {
	map.showBoxes();
	var result = arm.move(1,2);
	console.log("--------------------- RESULT ",result);
	map.showBoxes();
	result = arm.move(1,2);
	console.log("--------------------- RESULT ",result);
	map.showBoxes();
	result = arm.move(0,1);
	console.log("--------------------- RESULT ",result);
	map.showBoxes();
}

function test2(map,arm) {
	map.showBoxes();
	var result = arm.move(1,2);
	console.log("--------------------- RESULT ",result);
	map.showBoxes();
	result = arm.move(0,2);
	console.log("--------------------- RESULT ",result);
	map.showBoxes();
	result = arm.move(0,2);
	console.log("--------------------- RESULT ",result);
	map.showBoxes();
	result = arm.move(1,0);
	console.log("--------------------- RESULT ",result);
	map.showBoxes();
}

function test3(map,arm) {
	map.showBoxes();
	var result = arm.move(1,2);
	console.log("--------------------- RESULT ",result);
	map.showBoxes();
	result = arm.move(0,1);
	console.log("--------------------- RESULT ",result);	
	map.showBoxes();
	result = arm.move(2,0);
	console.log("--------------------- RESULT ",result);
	map.showBoxes();
}


function main() {
	var map = new Map(3);
	var arm = new Arm(map);
	
	// test1(map,arm)
	test2(map,arm);
	// test3(map,arm)

}

main();