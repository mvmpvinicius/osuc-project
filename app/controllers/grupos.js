(function() {
    var app = angular.module('grupos', []);
    app.directive('grupos', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/grupos.html',
            controller: ['$scope', '$http', '$timeout',
                function($scope, $http, $timeout) {
                    var grupos = this;

                    grupos.nome = '';
                    grupos.id_encarregado = '';
                    grupos.id_gerente_1 = '';
                    grupos.id_gerente_2 = '';

                    grupos.timer = false;
                    grupos.prc_encarregado = '';
                    grupos.prc_gerente_1 = '';
                    grupos.prc_gerente_2 = '';

                    grupos.encarregados = [];
                    grupos.gerentes_1 = [];
                    grupos.gerentes_2 = [];
                    grupos.grupos = [];
                    grupos.acao = 'incluiGrupo';
                    grupos.id_grupo = '';

                    this.buscar_grupos = function(id_grupo) {
                        $http({
                            url: 'app/ajax/grupos.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaGrupo',
                                id: id_grupo
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                grupos.nome = response.data.grupos[0].nome;
                                grupos.encarregados = response.data.encarregados;
                                grupos.id_encarregado = response.data.grupos[0].id_encarregado;
                                grupos.gerentes_1 = response.data.gerentes_1;
                                grupos.id_gerente_1 = response.data.grupos[0].id_gerente_1;
                                grupos.gerentes_2 = response.data.gerentes_2;
                                grupos.id_gerente_2 = response.data.grupos[0].id_gerente_2;

                                grupos.acao = 'editaGrupo';
                                grupos.id_grupo = response.data.grupos[0].id;
                            } else {
                                grupos.encarregados = response.data.encarregados;
                                grupos.gerentes_1 = response.data.gerentes_1;
                                grupos.gerentes_2 = response.data.gerentes_2;
                                grupos.grupos = response.data.grupos;
                            }
                        });
                    }

                    this.excluir_grupo = function(id_grupo) {
                        if (confirm('Excluir grupo?')) {
                            $http({
                                url: 'app/ajax/grupos.php',
                                method: 'POST',
                                data: $.param({
                                    acao: 'excluiGrupo',
                                    id: id_grupo
                                }),
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                grupos.buscar_grupos('-1');
                            });
                        }
                    }

                    this.limpar_tela = function() {
                        grupos.nome = '';
                        grupos.id_encarregado = '';
                        grupos.id_gerente_1 = '';
                        grupos.id_gerente_2 = '';
                        grupos.prc_encarregado = '';
                        grupos.prc_gerente_1 = '';
                        grupos.prc_gerente_2 = '';
                    }

                    this.procura_encarregado = function() {
                        if (grupos.timer) {
                            $timeout.cancel(grupos.timer);
                        }
                        if (grupos.prc_encarregado.length > 3) {
                            grupos.timer = $timeout(function() {
                                $http({
                                    url: 'app/ajax/grupos.php',
                                    method: 'POST',
                                    data: $.param({
                                        acao: 'prcEncarregado',
                                        prc_encarregado: grupos.prc_encarregado
                                    }),
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(function(response) {
                                    grupos.encarregados = response.data;
                                });
                            }, 1000);
                        } else {
                            // grupos.buscar_grupos('-1');
                        }
                    }

                    this.procura_gerente_1 = function() {
                        if (grupos.timer) {
                            $timeout.cancel(grupos.timer);
                        }
                        if (grupos.prc_gerente_1.length > 3) {
                            grupos.timer = $timeout(function() {
                                $http({
                                    url: 'app/ajax/grupos.php',
                                    method: 'POST',
                                    data: $.param({
                                        acao: 'prcGerente_1',
                                        prc_gerente_1: grupos.prc_gerente_1
                                    }),
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(function(response) {
                                    grupos.gerentes_1 = response.data;
                                });
                            }, 1000);
                        } else {
                            // grupos.buscar_grupos('-1');
                        }
                    }

                    this.procura_gerente_2 = function() {
                        if (grupos.timer) {
                            $timeout.cancel(grupos.timer);
                        }
                        if (grupos.prc_gerente_2.length > 3) {
                            grupos.timer = $timeout(function() {
                                $http({
                                    url: 'app/ajax/grupos.php',
                                    method: 'POST',
                                    data: $.param({
                                        acao: 'prcGerente_2',
                                        prc_gerente_2: grupos.prc_gerente_2
                                    }),
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(function(response) {
                                    grupos.gerentes_2 = response.data;
                                });
                            }, 1000);
                        } else {
                            // grupos.buscar_grupos('-1');
                        }
                    }

                    this.salvar_grupo = function() {
                        $http({
                            url: 'app/ajax/grupos.php',
                            method: 'POST',
                            data: $.param({
                                acao: grupos.acao,
                                data: {
                                    id: grupos.id_grupo,
                                    nome: grupos.nome,
                                    id_encarregado: grupos.id_encarregado,
                                    id_gerente_1: grupos.id_gerente_1,
                                    id_gerente_2: grupos.id_gerente_2
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            grupos.acao = 'incluiGrupo';
                            grupos.buscar_grupos('-1');
                            grupos.limpar_tela();
                        });
                    }

                    grupos.buscar_grupos('-1');
                }
            ],
            controllerAs: 'gruposCtrl'
        }
    });
})();