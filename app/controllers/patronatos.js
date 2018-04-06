(function() {
    var app = angular.module('patronatos', []);
    app.directive('patronatos', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/patronatos.html',
            controller: ['$scope', '$http', '$timeout',
                function($scope, $http, $timeout) {
                    var patronatos = this;

                    patronatos.id_diretor = '';
                    patronatos.nome = '';

                    patronatos.timer = false;
                    patronatos.prc_diretor = '';

                    patronatos.patronatos = [];
                    patronatos.diretores = [];
                    patronatos.grupos = [];
                    patronatos.grupos_selecionados = [];
                    patronatos.acao = 'incluiPatronato';
                    patronatos.id_centro = '';

                    this.buscar_patronatos = function(id_patronato) {
                        $http({
                            url: 'app/ajax/patronatos.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaPatronato',
                                id: id_patronato
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                patronatos.nome = response.data.patronatos[0].nome;
                                patronatos.diretores = response.data.diretor;
                                patronatos.id_diretor = response.data.patronatos[0].id_diretor;

                                patronatos.grupos = response.data.grupos

                                patronatos.grupos_selecionados = [];
                                for (grupo in response.data.grupos_selecionados) {
                                    patronatos.seleciona_grupo(response.data.grupos_selecionados[grupo].id_grupo, response.data.grupos_selecionados[grupo].nome);
                                }

                                patronatos.acao = 'editaPatronato';
                                patronatos.id_patronato = response.data.patronatos[0].id;
                            } else {
                                patronatos.diretores = response.data.diretores;
                                patronatos.grupos = response.data.grupos;
                                patronatos.patronatos = response.data.patronatos;
                            }
                        });
                    }

                    this.deseleciona_grupo = function(id, nome) {
                        for (var i = 0; i < patronatos.grupos_selecionados.length; i++) {
                            if (patronatos.grupos_selecionados[i].id && patronatos.grupos_selecionados[i].id === id) {
                                patronatos.grupos_selecionados.splice(i, 1);
                                break;
                            }
                        }
                        patronatos.grupos.push({
                            id: id,
                            nome: nome
                        });
                    }

                    this.excluir_patronato = function(id_patronato) {
                        if (confirm('Excluir patronato?')) {
                            $http({
                                url: 'app/ajax/patronatos.php',
                                method: 'POST',
                                data: $.param({
                                    acao: 'excluiPatronato',
                                    id: id_patronato
                                }),
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                patronatos.buscar_patronatos('-1');
                            });
                        }
                    }

                    this.limpar_tela = function() {
                        patronatos.nome = '';
                        patronatos.id_diretor = '';
                        patronatos.prc_diretor = '';
                        patronatos.grupos_selecionados = [];
                    }

                    this.procura_diretor = function() {
                        if (patronatos.timer) {
                            $timeout.cancel(patronatos.timer);
                        }
                        if (patronatos.prc_diretor.length > 3) {
                            patronatos.timer = $timeout(function() {
                                $http({
                                    url: 'app/ajax/patronatos.php',
                                    method: 'POST',
                                    data: $.param({
                                        acao: 'prcDiretor',
                                        prc_diretor: patronatos.prc_diretor
                                    }),
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(function(response) {
                                    console.log(response.data);
                                    patronatos.diretores = response.data;
                                });
                            }, 1000);
                        } else {
                            // patronatos.buscar_patronatos('-1');
                        }
                    }

                    this.salvar_patronato = function() {
                        $http({
                            url: 'app/ajax/patronatos.php',
                            method: 'POST',
                            data: $.param({
                                acao: patronatos.acao,
                                data: {
                                    id: patronatos.id_patronato,
                                    nome: patronatos.nome,
                                    id_diretor: patronatos.id_diretor,
                                    grupos_selecionados: patronatos.grupos_selecionados
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            patronatos.acao = 'incluiPatronato';
                            patronatos.buscar_patronatos('-1');
                            patronatos.limpar_tela();
                        });
                    }

                    this.seleciona_grupo = function(id, nome) {
                        for (var i = 0; i < patronatos.grupos.length; i++) {
                            if (patronatos.grupos[i].id && patronatos.grupos[i].id === id) {
                                patronatos.grupos.splice(i, 1);
                                break;
                            }
                        }
                        patronatos.grupos_selecionados.push({
                            id: id,
                            nome: nome
                        });
                    }

                    patronatos.buscar_patronatos('-1');
                }
            ],
            controllerAs: 'patronatosCtrl'
        }
    });
})();