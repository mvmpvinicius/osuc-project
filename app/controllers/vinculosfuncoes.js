(function() {
    var app = angular.module('vinculosfuncoes', []);
    app.directive('vinculosfuncoes', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/vinculosfuncoes.html',
            controller: ['$scope', '$http',
                function($scope, $http) {
                    var vinculosfuncoes = this;

                    vinculosfuncoes.id_pessoa = '';
                    vinculosfuncoes.id_vinculo = '';
                    vinculosfuncoes.funcao = 'contribuinte';
                    vinculosfuncoes.funcao_antiga = '';

                    vinculosfuncoes.colaboradores = [];
                    vinculosfuncoes.gerentes = [];
                    vinculosfuncoes.encarregados = [];
                    vinculosfuncoes.diretores = [];

                    vinculosfuncoes.vinculosfuncoes = [];
                    vinculosfuncoes.acao = 'incluivinculoFuncao';
                    vinculosfuncoes.id_vinculofuncao = '';

                    this.buscar_vinculosfuncoes = function(id_vinculofuncao, funcao_vinculofuncao) {
                        $http({
                            url: 'app/ajax/vinculosfuncoes.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscavinculoFuncao',
                                id: id_vinculofuncao,
                                funcao: funcao_vinculofuncao
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                vinculosfuncoes.id_pessoa = response.data[0].id_pessoa;
                                vinculosfuncoes.id_vinculo = response.data[0].id_vinculo;
                                vinculosfuncoes.funcao = response.data[0].funcao;
                                vinculosfuncoes.funcao_antiga = response.data[0].funcao;

                                vinculosfuncoes.acao = 'editavinculoFuncao';
                                vinculosfuncoes.id_vinculofuncao = response.data[0].id;
                            } else {
                                vinculosfuncoes.colaboradores = response.data['colaboradores'];
                                vinculosfuncoes.gerentes = response.data['gerentes'];
                                vinculosfuncoes.encarregados = response.data['encarregados'];
                                vinculosfuncoes.diretores = response.data['diretores'];
                                vinculosfuncoes.vinculosfuncoes = response.data['todos'];
                            }
                        });
                    }

                    this.excluir_vinculofuncao = function(id_vinculofuncao, funcao_vinculofuncao) {
                        $http({
                            url: 'app/ajax/vinculosfuncoes.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'excluivinculoFuncao',
                                id: id_vinculofuncao,
                                funcao: funcao_vinculofuncao
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            vinculosfuncoes.buscar_vinculosfuncoes('-1');
                        });
                    }

                    this.limpar_tela = function() {
                        vinculosfuncoes.id_pessoa = '';
                        vinculosfuncoes.id_vinculo = '';
                        vinculosfuncoes.funcao = 'contribuinte';
                        vinculosfuncoes.funcao_antiga = '';
                    }

                    this.salvar_vinculofuncao = function() {
                        $http({
                            url: 'app/ajax/vinculosfuncoes.php',
                            method: 'POST',
                            data: $.param({
                                acao: vinculosfuncoes.acao,
                                data: {
                                    id: vinculosfuncoes.id_vinculofuncao,
                                    id_pessoa: vinculosfuncoes.id_pessoa,
                                    id_vinculo: vinculosfuncoes.id_vinculo,
                                    funcao: vinculosfuncoes.funcao,
                                    funcao_antiga: vinculosfuncoes.funcao_antiga
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            vinculosfuncoes.acao = 'incluivinculoFuncao';
                            vinculosfuncoes.buscar_vinculosfuncoes('-1');
                            vinculosfuncoes.limpar_tela();
                        });
                    }

                    vinculosfuncoes.buscar_vinculosfuncoes('-1');
                }
            ],
            controllerAs: 'vinculosfuncoesCtrl'
        }
    });
})();