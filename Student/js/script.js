window.onload = function(){document.getElementById("signOut").style.visibility = "hidden"; };
var app = angular.module("sampleApp", ["firebase"]);


app.controller("SampleCtrl", function($scope, $firebase) {
	$scope.signin = function(){
		document.getElementById("signOut").style.visibility = "visible";
  		$scope.ref =  new Firebase("https://interactive-lecture.firebaseio.com/Test/"+$scope.id+"/Questions").limitToLast(1);
      $scope.mainRef = new Firebase("https://interactive-lecture.firebaseio.com/Test/"+$scope.id);
    
      
  		var sync = $firebase($scope.ref);
  		var syncObject = sync.$asObject();
  		syncObject.$bindTo($scope, "data");
  		
  		
  		var conns = $scope.mainRef.child('connections');

      $scope.userRef = $scope.mainRef.child('users').push(1);
      

		conns.transaction(function (current_value) {
  		return (current_value || 0) + 1;
		});
  		
  		$scope.ref.on("child_added",function(){
			$scope.ref.once('value', function(allMessagesSnapshot) {
  			allMessagesSnapshot.forEach(function(messageSnapshot) {
				var time = messageSnapshot.child('time').val();
    			var type = messageSnapshot.child('type').val();
    			var diff = Date.now() - parseInt(time);
    			console.log(diff);
    			if(diff <= 120000){
    				if (type === 1){
    				
    					alert("True or False");
    				
    				} 
    				else{
    					var str = "";
    					for(var i = 1;i <= type;i++){
    					
    					
    						str += String.fromCharCode(96 + i) + ",";
    					
    					}
    					alert(str.substring(0,str.length-1));
    				}
    			}
  			});
		});
			
		})
  	}
  	$scope.decrement = function(){
  		$scope.userRef.remove();
  	}
  	$scope.signout = function(){
  			$scope.decrement();
		}
    $scope.mainRef = function(){
        $scope.decrement();
    }
		
});










