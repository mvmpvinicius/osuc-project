(function() {
    var app = angular.module('colaboradores', []);
    app.directive('colaboradores', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/colaboradores.html',
            controller: ['$scope', '$http', '$timeout',
                function($scope, $http, $timeout) {
                    var colaboradores = this;

                    colaboradores.id_colaborador_pessoa = '';
                    colaboradores.id_grupo = '';

                    colaboradores.timer = false;
                    colaboradores.prc_colaborador = '';
                    colaboradores.prc_contribuinte = '';

                    colaboradores.colaboradores = [];
                    colaboradores.contribuintes = [];
                    colaboradores.contribuintes_selecionados = [];
                    colaboradores.acao = 'incluiColaborador';
                    colaboradores.id_colaborador = '';

                    this.buscar_colaboradores = function(id_colaborador) {
                        $http({
                            url: 'app/ajax/colaboradores.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaColaborador',
                                id: id_colaborador
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                colaboradores.colaboradores_pessoas = response.data.colaboradores_pessoas;
                                colaboradores.id_colaborador_pessoa = response.data.colaborador[0].id_pessoa;
                                colaboradores.nome = response.data.colaborador[0].nome;
                                colaboradores.id_grupo = response.data.colaborador[0].id_grupo;

                                colaboradores.contribuintes = response.data.contribuintes;

                                colaboradores.contribuintes_selecionados = [];
                                for (contribuinte in response.data.contribuintes_selecionados) {
                                    colaboradores.seleciona_contribuinte(response.data.contribuintes_selecionados[contribuinte].id_contribuinte, response.data.contribuintes_selecionados[contribuinte].nome);
                                }

                                colaboradores.acao = 'editaColaborador';
                                colaboradores.id_colaborador = response.data.colaborador[0].id;
                            } else {
                                colaboradores.colaboradores = response.data.colaboradores;
                                colaboradores.colaboradores_pessoas = response.data.colaboradores_pessoas;
                                colaboradores.contribuintes = response.data.contribuintes;
                            }
                        });
                    }

                    this.deseleciona_contribuinte = function(id, nome) {
                        for (var i = 0; i < colaboradores.contribuintes_selecionados.length; i++) {
                            if (colaboradores.contribuintes_selecionados[i].id && colaboradores.contribuintes_selecionados[i].id === id) {
                                colaboradores.contribuintes_selecionados.splice(i, 1);
                                break;
                            }
                        }
                        colaboradores.contribuintes.push({
                            id: id,
                            nome: nome
                        });
                    }

                    this.excluir_colaborador = function(id_colaborador) {
                        if (confirm('Excluir colaborador?')) {
                            $http({
                                url: 'app/ajax/colaboradores.php',
                                method: 'POST',
                                data: $.param({
                                    acao: 'excluiColaborador',
                                    id: id_colaborador
                                }),
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                colaboradores.buscar_colaboradores('-1');
                            });
                        }
                    }

                    this.limpar_tela = function() {
                        colaboradores.id_colaborador_pessoa = '';
                        colaboradores.id_grupo = '';
                        colaboradores.prc_colaborador = '';
                        colaboradores.prc_contribuinte = '';
                        colaboradores.contribuintes_selecionados = [];
                    }

                    this.procura_colaborador = function() {
                        if (colaboradores.timer) {
                            $timeout.cancel(colaboradores.timer);
                        }
                        if (colaboradores.prc_colaborador.length > 3) {
                            colaboradores.timer = $timeout(function() {
                                $http({
                                    url: 'app/ajax/colaboradores.php',
                                    method: 'POST',
                                    data: $.param({
                                        acao: 'prcColaborador',
                                        prc_colaborador: colaboradores.prc_colaborador
                                    }),
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(function(response) {
                                    colaboradores.colaboradores_pessoas = response.data;
                                });
                            }, 1000);
                        } else {
                            // colaboradores.buscar_centros('-1');
                        }
                    }

                    this.procura_contribuinte = function() {
                        if (colaboradores.timer) {
                            $timeout.cancel(colaboradores.timer);
                        }
                        if (colaboradores.prc_contribuinte.length > 3) {
                            colaboradores.timer = $timeout(function() {
                                $http({
                                    url: 'app/ajax/colaboradores.php',
                                    method: 'POST',
                                    data: $.param({
                                        acao: 'prcContribuinte',
                                        prc_contribuinte: colaboradores.prc_contribuinte
                                    }),
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(function(response) {
                                    colaboradores.contribuintes = response.data;
                                });
                            }, 1000);
                        } else {
                            // colaboradores.buscar_colaboradores('-1');
                        }
                    }

                    this.salvar_colaborador = function() {
                        $http({
                            url: 'app/ajax/colaboradores.php',
                            method: 'POST',
                            data: $.param({
                                acao: colaboradores.acao,
                                data: {
                                    id: colaboradores.id_colaborador,
                                    id_colaborador_pessoa: colaboradores.id_colaborador_pessoa,
                                    id_grupo: colaboradores.id_grupo,
                                    contribuintes_selecionados: colaboradores.contribuintes_selecionados
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            colaboradores.acao = 'incluiColaborador';
                            colaboradores.buscar_colaboradores('-1');
                            colaboradores.limpar_tela();
                        });
                    }

                    this.seleciona_contribuinte = function(id, nome) {
                        for (var i = 0; i < colaboradores.contribuintes.length; i++) {
                            if (colaboradores.contribuintes[i].id && colaboradores.contribuintes[i].id === id) {
                                colaboradores.contribuintes.splice(i, 1);
                                break;
                            }
                        }
                        colaboradores.contribuintes_selecionados.push({
                            id: id,
                            nome: nome
                        });
                    }

                    colaboradores.buscar_colaboradores('-1');
                }
            ],
            controllerAs: 'colaboradoresCtrl'
        }
    });
})();