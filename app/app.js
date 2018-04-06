(function() {
    var app = angular.module('app', ['autorizacoescobrancas', 'bancos', 'centros', 'colaboradores', 'contas', 'grupos', 'patronatos', 'pessoas', 'tipostransferencias']);
    app.controller('appController', ['$scope', '$http',
        function($scope, $http) {
            $scope.limpar_telas = function() {
                $scope.autorizacoescobrancasCtrl.limpar_tela();
                $scope.bancosCtrl.limpar_tela();
                $scope.centrosCtrl.limpar_tela();
                $scope.colaboradoresCtrl.limpar_tela();
                $scope.contasCtrl.limpar_tela();
                $scope.gruposCtrl.limpar_tela();
                $scope.patronatosCtrl.limpar_tela();
                $scope.pessoasCtrl.limpar_tela();
                $scope.tipostransferenciasCtrl.limpar_tela();
            }
        }
    ]);
})();