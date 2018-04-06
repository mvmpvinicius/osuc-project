(function() {
    var app = angular.module('tipostransferencias', []);
    app.directive('tipostransferencias', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/tipostransferencias.html',
            controller: ['$scope', '$http',
                function($scope, $http) {
                    var tipostransferencias = this;

                    tipostransferencias.nome = '';

                    tipostransferencias.tipostransferencias = [];
                    tipostransferencias.acao = 'incluitipoTransferencia';
                    tipostransferencias.id_tipotransferencia = '';

                    this.buscar_tipostransferencias = function(id_tipotransferencia) {
                        $http({
                            url: 'app/ajax/tipostransferencias.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscatipoTransferencia',
                                id: id_tipotransferencia
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                console.log(response.data);
                                tipostransferencias.nome = response.data.tipostransferencias[0].nome;

                                tipostransferencias.acao = 'editatipoTransferencia';
                                tipostransferencias.id_tipotransferencia = response.data.tipostransferencias[0].id;
                            } else {
                                // tipostransferencias.tipostransferencias = [];
                                tipostransferencias.tipostransferencias = response.data.tipostransferencias;
                            }
                        });
                    }

                    this.excluir_tipotransferencia = function(id_tipotransferencia) {
                        if (confirm('Excluir tipo de transferência?')) {
                            $http({
                                url: 'app/ajax/tipostransferencias.php',
                                method: 'POST',
                                data: $.param({
                                    acao: 'excluitipoTransferencia',
                                    id: id_tipotransferencia
                                }),
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                tipostransferencias.buscar_tipostransferencias('-1');
                            });
                        }
                    }

                    this.limpar_tela = function() {
                        tipostransferencias.nome = '';
                    }

                    this.salvar_tipotransferencia = function() {
                        $http({
                            url: 'app/ajax/tipostransferencias.php',
                            method: 'POST',
                            data: $.param({
                                acao: tipostransferencias.acao,
                                data: {
                                    id: tipostransferencias.id_tipotransferencia,
                                    tipotransferencia: tipostransferencias.nome,
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            tipostransferencias.acao = 'incluitipoTransferencia';
                            tipostransferencias.buscar_tipostransferencias('-1');
                            tipostransferencias.limpar_tela();
                        });
                    }

                    tipostransferencias.buscar_tipostransferencias('-1');
                }
            ],
            controllerAs: "tipostransferenciasCtrl"
        }
    });
})();