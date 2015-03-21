angular.module('components', [])
 
  .directive('accordions', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var accordions = $scope.accordions = [];
 
        $scope.select = function(accordion) {
          angular.forEach(accordions, function(accordion) {
            accordion.selected = false;
          });
          accordion.selected = true;
        }
 
        this.addAccordion = function(accordion) {
          if (accordions.length == 0) $scope.select(accordion);
          accordions.push(accordion);
        }

        this.getAccordions = function() {
           return $scope.accordions;
        }

        this.getpScope = function() {
           return $scope;
        }

      },
      template:'<div class="panel-group" id="accordion" ng-transclude></div>',
      replace: true
    };
  })
 
  .directive('accordion', function() {
    return {
      require: '^accordions',
      restrict: 'E',
      transclude: true,
      scope: { title: '@'},
      link: function(scope, element, attrs, accordionsCtrl) {
        accordionsCtrl.addAccordion(scope);
        scope.thisScope = scope;
        scope.panelCollapse='panel-collapse';
        
        scope.test = function(accordion) {
        
         var y = accordionsCtrl.getAccordions();

         var z = accordionsCtrl.getpScope();

         z.select(accordion);

         var k=scope;

         var c=1;







        }
      },


     

      template:
       

    '<div class="panel panel-default">'+
    '<div class="panel-heading">'+
      '<h4 class="panel-title">'+
        '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">'+
           '<a href="" ng-click="test(thisScope)">{{title}}</a>' +
        '</a><i class="indicator glyphicon glyphicon-chevron-up  pull-right"></i>'+
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