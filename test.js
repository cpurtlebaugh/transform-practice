'use strict';

var moment = require('moment');

const input = [
	{
		type: "cat",
		dob: "1/24/2019",
	},
	{
		type: "cat",
		dob: "3/03/2019"
	},
	{
		type: "cat",
		dob: "06/22/2019"
	},
	{
		type: "dog",
		dob: "02/02/2019"
	},
	{
		type: "dog",
		dob: "11/03/2019"
	},
	{
		type: "dog",
		dob: "12/25/2018"
	},
	{
		type: "bird",
		dob: "04/02/2019"
	},
	{
		type: "bird",
		dob: "10/28/2017"
	},
	{
		type: "bird",
		dob: "07/19/2013"
	},
	{
		type: "bird",
		dob: "09/09/2011"
	}
];

const dateRage = {
	0: "0-1",
	1: "2-4",
	2: "5-8",
	3: ">9"
};

async function checkAge(dob){
	const date = moment(dob, 'MM-DD-YYYY').toDate();
	const today = new Date();
	const diff = moment(today).year() - moment(date).year();
	let ageRange;

	switch(true){
		case diff < 1: 
			ageRange =  Object.keys(dateRage)[0];
			break;
		case diff < 4: 
			ageRange =  Object.keys(dateRage)[1];
			break;
		case diff < 8: 
			ageRange =  Object.keys(dateRage)[2];
			break;
		default:
			ageRange =  Object.keys(dateRage)[3];
			break;
	};
	
	return ageRange;
};

// *** 
// wanted to just return Object.fromEntries(animalMap) 
// but it isn't supported in node yet
// https://davidwalsh.name/objectfromentries
// https://thecodebarbarian.com/whats-new-in-es2019-flat-flatmap-catch.html
// ***

// RUN SCRIPT
(async () => {
	let animalMap = new Map();
	for(let i = 0; i < input.length; i++ ){
		let ageRange = await checkAge(input[i].dob);
		
		if(animalMap.has(input[i].type)){
			let val = animalMap.get(input[i].type);
			val.count++;
			val.ageRange[`${ageRange}`] = val.ageRange[`${ageRange}`] + 1;
			val.percentage = Math.round(val.ageRange[`${ageRange}`] / val.count * 100);
			animalMap.set(input[i].type, val);	
		} else {
			let initialMap = { 
				type: input[i].type, 
				count: 1, 
				ageRange: [0,0,0,0],
			};
			initialMap.ageRange[`${ageRange}`] = 1;
			initialMap.percentage = Math.round(1 / 1 * 100);
			animalMap.set(input[i].type, initialMap);	
		};
	};

	const reuslt = [...animalMap.values()];
	console.log("result: ", reuslt)
	return reuslt;
})();
