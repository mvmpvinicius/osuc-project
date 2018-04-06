(function() {
    var app = angular.module('pessoas', []);
    app.directive('pessoas', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/pessoas.html',
            controller: ['$scope', '$http', '$timeout',
                function($scope, $http, $timeout) {
                    var pessoas = this;

                    $('.cep').inputmask("99999-999");
                    $('.cnpj').inputmask("99.999.999/9999-99");
                    $('.cpf').inputmask("999.999.999-99");
                    $('.phone').inputmask("(99)99999-9999");

                    pessoas.nome = '';
                    pessoas.sobrenome = '';
                    pessoas.status = '';
                    pessoas.pessoa = '';
                    pessoas.cpf_cnpj = '';
                    pessoas.telefone = '';
                    pessoas.email = '';
                    pessoas.data_cadastro = '';
                    pessoas.comentarios = '';

                    pessoas.endereco = '';
                    pessoas.numero = '';
                    pessoas.cep = '';
                    pessoas.estado = '-1';
                    pessoas.estados = [];
                    pessoas.cidade = '-1';
                    pessoas.cidades = [];

                    pessoas.timer = false;
                    pessoas.prc_pessoa = '';

                    pessoas.pessoas = [];
                    pessoas.acao = 'incluiPessoa';
                    pessoas.id_pessoa = '';

                    this.buscar_cidade = function() {
                        $http({
                            url: 'app/ajax/ajax.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaCidade',
                                estado: pessoas.estado
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            pessoas.cidades = response.data;
                        });
                    }

                    this.buscar_pessoas = function(id_pessoa) {
                        $http({
                            url: 'app/ajax/pessoas.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaPessoa',
                                id: id_pessoa
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            if (response.data.editar == true) {
                                if (response.data.enderecos.length != 0) {
                                    pessoas.endereco = response.data.enderecos[0].endereco;
                                    pessoas.numero = response.data.enderecos[0].numero;
                                    pessoas.cep = response.data.enderecos[0].cep;
                                    pessoas.estado = response.data.enderecos[0].estado;
                                } else {
                                    pessoas.limpar_tela();
                                }
                                
                                pessoas.nome = response.data.pessoas[0].nome;
                                pessoas.sobrenome = response.data.pessoas[0].sobrenome;
                                pessoas.status = response.data.pessoas[0].status;
                                pessoas.pessoa = response.data.pessoas[0].pessoa;
                                pessoas.cpf_cnpj = response.data.pessoas[0].cpf_cnpj;
                                pessoas.telefone = response.data.pessoas[0].telefone;
                                pessoas.email = response.data.pessoas[0].email;
                                pessoas.data_cadastro = response.data.pessoas[0].data_cadastro;
                                pessoas.comentarios = response.data.pessoas[0].comentarios;

                                pessoas.buscar_cidade();
                                $timeout(function() {
                                    pessoas.cidade = response.data.enderecos[0].cidade
                                }, 100);

                                pessoas.acao = 'editaPessoa';
                                pessoas.id_pessoa = response.data.pessoas[0].id;
                            } else {
                                pessoas.pessoas = response.data.pessoas;
                            }
                        });
                    }

                    this.buscar_uf = function() {
                        $http({
                            url: 'app/ajax/ajax.php',
                            method: 'POST',
                            data: $.param({
                                acao: 'buscaUf',
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            pessoas.estados = response.data;
                        });
                    }

                    this.excluir_pessoa = function(id_pessoa) {
                        if (confirm('Excluir pessoa?')) {
                            $http({
                                url: 'app/ajax/pessoas.php',
                                method: 'POST',
                                data: $.param({
                                    acao: 'excluiPessoa',
                                    id: id_pessoa
                                }),
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                pessoas.buscar_pessoas('-1');
                            });
                        }
                    }

                    this.limpar_tela = function() {
                        pessoas.nome = '';
                        pessoas.sobrenome = '';
                        pessoas.status = '';
                        pessoas.pessoa = '';
                        pessoas.cpf_cnpj = '';
                        pessoas.telefone = '';
                        pessoas.email = '';
                        pessoas.data_cadastro = '';
                        pessoas.comentarios = '';

                        pessoas.endereco = '';
                        pessoas.numero = '';
                        pessoas.cep = '';
                        pessoas.estado = '-1';
                        pessoas.cidade = '-1';
                        pessoas.cidades = [];
                    }

                    this.procura_pessoa = function() {
                        if (pessoas.timer) {
                            $timeout.cancel(pessoas.timer);
                        }
                        if (pessoas.prc_pessoa.length > 3) {
                            pessoas.timer = $timeout(function() {
                                $http({
                                    url: 'app/ajax/pessoas.php',
                                    method: 'POST',
                                    data: $.param({
                                        acao: 'prcPessoa',
                                        prc_pessoa: pessoas.prc_pessoa
                                    }),
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(function(response) {
                                    pessoas.pessoas = response.data;
                                });
                            }, 1000);
                        } else {
                            pessoas.buscar_pessoas('-1');
                        }
                    }

                    this.salvar_pessoa = function() {
                        $http({
                            url: 'app/ajax/pessoas.php',
                            method: 'POST',
                            data: $.param({
                                acao: pessoas.acao,
                                data: {
                                    id: pessoas.id_pessoa,
                                    nome: pessoas.nome,
                                    sobrenome: pessoas.sobrenome,
                                    status: pessoas.status,
                                    pessoa: pessoas.pessoa,
                                    cpf_cnpj: pessoas.cpf_cnpj,
                                    telefone: pessoas.telefone,
                                    email: pessoas.email,
                                    data_cadastro: pessoas.data_cadastro,
                                    comentarios: pessoas.comentarios,
                                    endereco: pessoas.endereco,
                                    numero: pessoas.numero,
                                    cep: pessoas.cep,
                                    estado: pessoas.estado,
                                    cidade: pessoas.cidade
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            pessoas.acao = 'incluiPessoa';
                            pessoas.buscar_pessoas('-1');
                            pessoas.limpar_tela();
                        });
                    }

                    pessoas.buscar_pessoas('-1');
                    pessoas.buscar_uf();
                }
            ],
            controllerAs: 'pessoasCtrl'
        }
    });
})();