(function() {
    var app = angular.module('autorizacoescobrancas', []);
    app.directive('autorizacoescobrancas', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/autorizacoescobrancas.html',
            controller: ['$scope', '$http', '$timeout',
                function($scope, $http, $timeout) {
                    var autorizacoescobrancas = this;

                    $('.money').maskMoney();

                    autorizacoescobrancas.id_contribuinte = '';
                    autorizacoescobrancas.id_conta = '';
                    autorizacoescobrancas.data_inicio = '';
                    autorizacoescobrancas.data_termino = '';
                    autorizacoescobrancas.periodicidade = '';
                    autorizacoescobrancas.dia_desconto = '';
                    autorizacoescobrancas.valor = '';
                    autorizacoescobrancas.id_tipo_transferencia = '';

                    autorizacoescobrancas.contribuintes = [];
                    autorizacoescobrancas.autorizacoescobrancas = [];
                    autorizacoescobrancas.acao = 'incluiAutorizacoescobrancas';
                    autorizacoescobrancas.id_autorizacaocobranca = '';

                    this.buscar_autorizacoescobrancas = function(id_autorizacaocobranca) {
                        $http({
                            url: 'app/ajax/autorizacoescobrancas.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaAutorizacaocobranca',
                                id: id_autorizacaocobranca
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                autorizacoescobrancas.contribuintes = response.data.contribuintes;
                                autorizacoescobrancas.id_contribuinte = response.data.autorizacoes_cobrancas[0].id_contribuinte;
                                autorizacoescobrancas.id_conta = response.data.autorizacoes_cobrancas[0].id_conta;
                                autorizacoescobrancas.data_inicio = response.data.autorizacoes_cobrancas[0].data_inicio;
                                autorizacoescobrancas.data_termino = response.data.autorizacoes_cobrancas[0].data_termino;
                                autorizacoescobrancas.periodicidade = response.data.autorizacoes_cobrancas[0].periodicidade;
                                autorizacoescobrancas.dia_desconto = response.data.autorizacoes_cobrancas[0].dia_desconto;
                                autorizacoescobrancas.valor = response.data.autorizacoes_cobrancas[0].valor;
                                autorizacoescobrancas.id_tipo_transferencia = response.data.autorizacoes_cobrancas[0].id_tipo_transferencia;

                                autorizacoescobrancas.acao = 'editaAutorizacaocobranca';
                                autorizacoescobrancas.id_autorizacaocobranca = response.data.autorizacoes_cobrancas[0].id;
                            } else {
                                autorizacoescobrancas.autorizacoescobrancas = response.data.autorizacoes_cobrancas;
                            }
                        });
                    }

                    this.excluir_autorizacaocobranca = function(id_autorizacaocobranca) {
                        if (confirm('Excluir autorização de cobrança?')) {
                            $http({
                                url: 'app/ajax/autorizacoescobrancas.php',
                                method: 'POST',
                                data: $.param({
                                    acao: 'excluiAutorizacaocobranca',
                                    id: id_autorizacaocobranca
                                }),
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                autorizacoescobrancas.buscar_autorizacoescobrancas('-1');
                            });
                        }
                    }

                    this.limpar_tela = function() {
                        autorizacoescobrancas.id_contribuinte = '';
                        autorizacoescobrancas.id_conta = '';
                        autorizacoescobrancas.data_inicio = '';
                        autorizacoescobrancas.data_termino = '';
                        autorizacoescobrancas.periodicidade = '';
                        autorizacoescobrancas.dia_desconto = '';
                        autorizacoescobrancas.valor = '';
                        autorizacoescobrancas.id_tipo_transferencia = '';
                    }

                    this.procura_contribuinte = function() {
                        if (autorizacoescobrancas.timer) {
                            $timeout.cancel(autorizacoescobrancas.timer);
                        }
                        if (autorizacoescobrancas.prc_contribuinte.length > 3) {
                            autorizacoescobrancas.timer = $timeout(function() {
                                $http({
                                    url: 'app/ajax/autorizacoescobrancas.php',
                                    method: 'POST',
                                    data: $.param({
                                        acao: 'prcContribuinte',
                                        prc_contribuinte: autorizacoescobrancas.prc_contribuinte
                                    }),
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(function(response) {
                                    autorizacoescobrancas.contribuintes = response.data;
                                });
                            }, 1000);
                        } else {
                            // autorizacoescobrancas.buscar_centros('-1');
                        }
                    }

                    this.salvar_autorizacaocobranca = function() {
                        $http({
                            url: 'app/ajax/autorizacoescobrancas.php',
                            method: 'POST',
                            data: $.param({
                                acao: autorizacoescobrancas.acao,
                                data: {
                                    id: autorizacoescobrancas.id_autorizacaocobranca,
                                    id_contribuinte: autorizacoescobrancas.id_contribuinte,
                                    id_conta: autorizacoescobrancas.id_conta,
                                    data_inicio: autorizacoescobrancas.data_inicio,
                                    data_termino: autorizacoescobrancas.data_termino,
                                    periodicidade: autorizacoescobrancas.periodicidade,
                                    dia_desconto: autorizacoescobrancas.dia_desconto,
                                    valor: autorizacoescobrancas.valor,
                                    id_tipo_transferencia: autorizacoescobrancas.id_tipo_transferencia
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            autorizacoescobrancas.acao = 'incluiAutorizacaocobranca';
                            autorizacoescobrancas.buscar_autorizacoescobrancas('-1');
                            autorizacoescobrancas.limpar_tela();
                        });
                    }

                    autorizacoescobrancas.buscar_autorizacoescobrancas('-1');
                }
            ],
            controllerAs: 'autorizacoescobrancasCtrl'
        }
    });
})();