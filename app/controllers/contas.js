(function() {
    var app = angular.module('contas', []);
    app.directive('contas', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/contas.html',
            controller: ['$scope', '$http',
                function($scope, $http) {
                    var contas = this;

                    contas.tipo_conta = '';
                    contas.conta = '';
                    contas.agencia = '';
                    contas.id_banco = '';
                    contas.modalidade = '';

                    contas.contas = [];
                    contas.acao = 'incluiConta';
                    contas.id_conta = '';

                    this.buscar_contas = function(id_conta) {
                        $http({
                            url: 'app/ajax/contas.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaConta',
                                id: id_conta
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                contas.conta = response.data[0].conta;
                                contas.tipo_conta = response.data[0].tipo_conta;
                                contas.agencia = response.data[0].agencia;
                                contas.id_banco = response.data[0].id_banco;
                                contas.modalidade = response.data[0].modalidade;

                                contas.acao = 'editaConta';
                                contas.id_conta = response.data[0].id;
                            } else {
                                contas.contas = response.data;
                            }
                        });
                    }

                    this.excluir_conta = function(id_conta) {
                        if (confirm('Excluir conta?')) {
                            $http({
                                url: 'app/ajax/contas.php',
                                method: 'POST',
                                data: $.param({
                                    acao: 'excluiConta',
                                    id: id_conta
                                }),
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                contas.buscar_contas('-1');
                            });
                        }
                    }

                    this.limpar_tela = function() {
                        contas.tipo_conta = '';
                        contas.conta = '';
                        contas.agencia = '';
                        contas.id_banco = '';
                        contas.modalidade = '';
                    }

                    this.salvar_conta = function() {
                        $http({
                            url: 'app/ajax/contas.php',
                            method: 'POST',
                            data: $.param({
                                acao: contas.acao,
                                data: {
                                    id: contas.id_conta,
                                    tipo_conta: contas.tipo_conta,
                                    conta: contas.conta,
                                    agencia: contas.agencia,
                                    id_banco: contas.id_banco,
                                    modalidade: contas.modalidade
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            contas.acao = 'incluiConta';
                            contas.buscar_contas('-1');
                            contas.limpar_tela();
                        });
                    }

                    contas.buscar_contas('-1');
                }
            ],
            controllerAs: 'contasCtrl'
        }
    });
})();