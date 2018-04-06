(function() {
    var app = angular.module('centros', []);
    app.directive('centros', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/centros.html',
            controller: ['$scope', '$http', '$timeout',
                function($scope, $http, $timeout) {
                    var centros = this;

                    centros.id_diretor = '';
                    centros.nome = '';

                    centros.timer = false;
                    centros.prc_diretor = '';

                    centros.centros = [];
                    centros.diretores = [];
                    centros.grupos = [];
                    centros.grupos_selecionados = [];
                    centros.acao = 'incluiCentro';
                    centros.id_centro = '';

                    this.buscar_centros = function(id_centro) {
                        $http({
                            url: 'app/ajax/centros.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaCentro',
                                id: id_centro
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                centros.nome = response.data.centros[0].nome;
                                centros.diretores = response.data.diretores;
                                centros.id_diretor = response.data.centros[0].id_diretor;

                                centros.grupos = response.data.grupos;

                                centros.grupos_selecionados = [];
                                for (grupo in response.data.grupos_selecionados) {
                                    centros.seleciona_grupo(response.data.grupos_selecionados[grupo].id_grupo, response.data.grupos_selecionados[grupo].nome);
                                }

                                centros.acao = 'editaCentro';
                                centros.id_centro = response.data.centros[0].id;
                            } else {
                                centros.centros = response.data.centros;
                                centros.diretores = response.data.diretores;
                                centros.grupos = response.data.grupos;
                            }
                        });
                    }

                    this.deseleciona_grupo = function(id, nome) {
                        for (var i = 0; i < centros.grupos_selecionados.length; i++) {
                            if (centros.grupos_selecionados[i].id && centros.grupos_selecionados[i].id === id) {
                                centros.grupos_selecionados.splice(i, 1);
                                break;
                            }
                        }
                        centros.grupos.push({
                            id: id,
                            nome: nome
                        });
                    }

                    this.excluir_centro = function(id_centro) {
                        if (confirm('Excluir centro?')) {
                            $http({
                                url: 'app/ajax/centros.php',
                                method: 'POST',
                                data: $.param({
                                    acao: 'excluiCentro',
                                    id: id_centro
                                }),
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                centros.buscar_centros('-1');
                            });
                        }
                    }

                    this.limpar_tela = function() {
                        centros.nome = '';
                        centros.id_diretor = '';
                        centros.prc_diretor = '';
                        // centros.grupo = [];
                        centros.grupos_selecionados = [];
                    }

                    this.procura_diretor = function() {
                        if (centros.timer) {
                            $timeout.cancel(centros.timer);
                        }
                        if (centros.prc_diretor.length > 3) {
                            centros.timer = $timeout(function() {
                                $http({
                                    url: 'app/ajax/centros.php',
                                    method: 'POST',
                                    data: $.param({
                                        acao: 'prcDiretor',
                                        prc_diretor: centros.prc_diretor
                                    }),
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(function(response) {
                                    centros.diretores = response.data;
                                });
                            }, 1000);
                        } else {
                            // centros.buscar_centros('-1');
                        }
                    }

                    this.salvar_centro = function() {
                        $http({
                            url: 'app/ajax/centros.php',
                            method: 'POST',
                            data: $.param({
                                acao: centros.acao,
                                data: {
                                    id: centros.id_centro,
                                    nome: centros.nome,
                                    id_diretor: centros.id_diretor,
                                    grupos_selecionados: centros.grupos_selecionados
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            centros.acao = 'incluiCentro';
                            centros.buscar_centros('-1');
                            centros.limpar_tela();
                        });
                    }

                    this.seleciona_grupo = function(id, nome) {
                        for (var i = 0; i < centros.grupos.length; i++) {
                            if (centros.grupos[i].id && centros.grupos[i].id === id) {
                                centros.grupos.splice(i, 1);
                                break;
                            }
                        }
                        centros.grupos_selecionados.push({
                            id: id,
                            nome: nome
                        });
                    }

                    centros.buscar_centros('-1');
                }
            ],
            controllerAs: 'centrosCtrl'
        }
    });
})();