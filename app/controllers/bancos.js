(function() {
    var app = angular.module('bancos', []);
    app.directive('bancos', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/bancos.html',
            controller: ['$scope', '$http',
                function($scope, $http) {
                    var bancos = this;

                    bancos.nome = '';
                    bancos.numero = '';

                    bancos.bancos = [];
                    bancos.acao = 'incluiBanco';
                    bancos.id_banco = '';

                    this.buscar_bancos = function(id_banco) {
                        $http({
                            url: 'app/ajax/bancos.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaBanco',
                                id: id_banco
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                bancos.nome = response.data[0].nome;
                                bancos.numero = response.data[0].numero;

                                bancos.acao = 'editaBanco';
                                bancos.id_banco = response.data[0].id;
                            } else {
                                bancos.bancos = response.data;
                            }
                        });
                    }

                    this.excluir_banco = function(id_banco) {
                        if (confirm('Excluir banco?')) {
                            $http({
                                url: 'app/ajax/bancos.php',
                                method: 'POST',
                                data: $.param({
                                    acao: 'excluiBanco',
                                    id: id_banco
                                }),
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                bancos.buscar_bancos('-1');
                            });
                        }
                    }

                    this.limpar_tela = function() {
                        bancos.nome = '';
                        bancos.numero = '';
                    }

                    this.salvar_banco = function() {
                        $http({
                            url: 'app/ajax/bancos.php',
                            method: 'POST',
                            data: $.param({
                                acao: bancos.acao,
                                data: {
                                    id: bancos.id_banco,
                                    nome: bancos.nome,
                                    numero: bancos.numero
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            bancos.acao = 'incluiBanco';
                            bancos.buscar_bancos('-1');
                            bancos.limpar_tela();
                        });
                    }

                    bancos.buscar_bancos('-1');
                }
            ],
            controllerAs: 'bancosCtrl'
        }
    });
})();