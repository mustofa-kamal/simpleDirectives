angular.module('components', [])

.directive('accordions', function() {
  return {
      restrict: 'E', //compiler will match element only
      transclude: true, 
      scope: {},//new empty scope, no inheritance -> makes this directive independent as per as scope is concerned 

      /* Compiler will call this controller once; because there is a single accordions element. Therefore a good place for initialization */ 
      controller: function($scope, $element) {
         this.accordions = []; // array for accordion scope. 

        this.addAccordion = function(accordion) { // For each instance of accordion instance, this function is called with respective accordion scope 
          if (this.accordions.length == 0) this.select(accordion);
          this.accordions.push(accordion);
        }

        this.select = function(accordion) { //accordion is an alias for accordion scope. 
          angular.forEach(this.accordions, function(accordion) {
            accordion.selected = false;
          });
          accordion.selected = true;
        }
      },
      template:'<div class="panel-group" id="accordion" ng-transclude></div>',
      replace: true
    };
  })

.directive('accordion', function() {
  return {
    require: '^accordions', //accordions controller object will be passed as 4th argument in link function. 
    restrict: 'E',
    transclude: true,
      /*scope is initialized with title. title will receive value from <accordion title="xxxx">. Instead of this we could also do the following:
      scope: {}, and inside the link function, scope.title=attrs.title
      */
      scope: { title: '@'}, 
      link: function(scope, element, attrs, accordionsCtrl) {
        accordionsCtrl.addAccordion(scope);// adding accordion scope for each instances of accordion. 
        scope.panelCollapse='panel-collapse';//adding css

        scope.select = function(){ //ng-click="select()". select is an expression which is parsed in respect to a context and in this case it is scope object. So 'this' denotes scope object
          accordionsCtrl.select(this);
        }
      },
      template:
      '<div class="panel panel-default">'+
      '<div class="panel-heading">'+
      '<h4 class="panel-title">'+
      '<a class="accordion-toggle" data-toggle="collapse" >'+
      '<a href="" ng-click="select()">{{title}}</a>' +
      '</h4>'+
      '</div>' +
      '<div id="collapseTwo"  ng-class="{panelCollapse:true, collapse:true, in: selected}">'+
      '<div class="panel-body" ng-transclude>'+
      '</div>'+
      '</div>'+
      '</div>',
      replace: true
    };
  })