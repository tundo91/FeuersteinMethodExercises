'use strict';

angular.module('myApp.view5', ['ngRoute'])

.controller('View5Ctrl', ['$scope', 'myService', '$location', function($scope, myService, $location) {
	$scope.results = { 'ex1': "", 'ex2': "", 'ex3': "" }

	// mockup
	var user = {
	  "inputs": {
	    "hyp2": true,
	    "name": "TommieK",
	    "age": "23",
	    "gender": "male",
	    "hyp1": true
	  },
	  "ex1": {
	    "step1": "1",
	    "step2": "2",
	    "step3": "3",
	    "step4": "1",
	    "step5": "2",
	    "step6": "3",
	    "step7": "1",
	    "step8": "2",
	    "step9": "3",
	    "step10": "1"
	  },
	  "ex2": {
	    "step1": "123456789",
	    "step2": "123456789",
	    "step3": "987654321"
	  },
	  "ex3": {
	    "step1": "...",
	    "step2": "...",
	    "step3": "..."
	  }
	}
	// $scope.user = user; 
	$scope.user = myService.get();

	// ----- NOTE -----
	// the following analyse functions
	// implement the rules fo the "verify" 
	// step of the inference model

	$scope.analyse_ex1 = function() {
		var correct_solution = [1,2,3,1,2,3,1,2,3,1]
		var scores = []

		for (var i = 0; i < correct_solution.length; i++) { 
			console.log("index:" + i)
			console.log("correct_solution[i]:" + correct_solution[i])
			console.log("user solution: " + $scope.user.ex1[String('step'+String(i+1))])
    		
    		if (correct_solution[i] == $scope.user.ex1[String('step'+String(i+1))]) {
    			scores.push(1/correct_solution.length)
    		} else {
    			scores.push(0)
    		}
		}

		console.log(scores)
		var sum = scores.reduce(function(pv, cv) { return pv + cv; }, 0);		
		if (sum > 0.999999) {
			return 1
		} else{
			return sum
		};
	};


	$scope.analyse_ex2 = function() {
		if ($scope.user.ex2['step1'] === "123456789" &&
			$scope.user.ex2['step2'] === "123456789" &&
				$scope.user.ex2['step3'] === "987654321") {
			return 1
		} else {
			return 0
		};
	};

	$scope.analyse_ex3 = function() {
		
		
	};
	
	var score_ex1 = $scope.analyse_ex1()	
	var score_ex2 = $scope.analyse_ex2()
	var score_ex3 = $scope.analyse_ex3()

	console.log("Score for ex1: "+score_ex1)
	console.log("Score for ex2: "+score_ex2)
	console.log("Score for ex3: "+score_ex2)


	// ----- NOTE -----
	// the following functions
	// implement the rules fo the "verify" 
	// step of the inference model

	$scope.verify = function(score1, score2, score3) {
		if (score1 > 0.6) {
			$scope.results['ex1'] = "Present"
		} else{
			$scope.results['ex1'] = "Absent"
		};

		if (score2 > 0.6) {
			$scope.results['ex2'] = "Present"
		} else{
			$scope.results['ex2'] = "Absent"
		};

		if (score3 > 0.6) {
			$scope.results['ex3'] = "Present"
		} else{
			$scope.results['ex3'] = "Absent"
		};
		
	};

	console.log($scope.verify(score_ex1,score_ex2,score_ex3))
}]);