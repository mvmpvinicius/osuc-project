<?php
	require 'medoo.min.php';

	$database = new medoo([
		'database_type' => 'mysql',
		'database_name' => 'osuc',
		'server' => 'localhost',
		'username' => 'root',
		'password' => '',
		'charset' => 'utf8',
	]);

	if(isset($_POST['acao'])){
		switch($_POST['acao']){
			case 'buscaPessoa':
				if ($_POST['id'] != '-1') {
					$data['pessoas'] = $database->select('pessoas', '*', [
						'id' => $_POST['id']
					]);
					$data['enderecos'] = $database->select('enderecos', '*', [
						'id_pessoa' => $_POST['id']
					]);
					$data['editar'] = true;
				} else {
					$data['pessoas'] = $database->select('pessoas', '*', [
						'LIMIT' => 25
					]);
				}
				echo $json_response = json_encode($data);
				break;
			case 'editaPessoa':
				$database->update('pessoas', [
					'nome' => $_POST['data']['nome'],
					'sobrenome' => $_POST['data']['sobrenome'],
					'status' => $_POST['data']['status'],
					'pessoa' => $_POST['data']['pessoa'],
					'cpf_cnpj' => $_POST['data']['cpf_cnpj'],
					'telefone' => $_POST['data']['telefone'],
					'email' => $_POST['data']['email'],
					'data_cadastro' => $_POST['data']['data_cadastro'],
					'comentarios' => $_POST['data']['comentarios']
				], [
					'id' => $_POST['data']['id']
				]);

				$database->delete('enderecos', [
					'id_pessoa' => $_POST['data']['id']
				]);

				$database->insert('enderecos', [
					'id_pessoa' => $_POST['data']['id'],
					'endereco' => $_POST['data']['endereco'],
					'numero' => $_POST['data']['numero'],
					'cep' => $_POST['data']['cep'],
					'estado' => $_POST['data']['estado'],
					'cidade' => $_POST['data']['cidade']
				]);
				break;
			case 'excluiPessoa':
				$database->delete('pessoas', [
					'id' => $_POST['id']
				]);

				$database->delete('endderecos', [
					'id_pessoa' => $_POST['id']
				]);
				break;
			case 'incluiPessoa':
				$insertId = $database->insert('pessoas', [
					'nome' => $_POST['data']['nome'],
					'sobrenome' => $_POST['data']['sobrenome'],
					'status' => $_POST['data']['status'],
					'pessoa' => $_POST['data']['pessoa'],
					'cpf_cnpj' => $_POST['data']['cpf_cnpj'],
					'telefone' => $_POST['data']['telefone'],
					'email' => $_POST['data']['email'],
					'data_cadastro' => $_POST['data']['data_cadastro'],
					'comentarios' => $_POST['data']['comentarios']
				]);

				$database->insert('enderecos', [
					'id_pessoa' => $insertId,
					'endereco' => $_POST['data']['endereco'],
					'numero' => $_POST['data']['numero'],
					'cep' => $_POST['data']['cep'],
					'estado' => $_POST['data']['estado'],
					'cidade' => $_POST['data']['cidade']
				]);
				break;
			case 'prcPessoa':
				$data = $database->select('pessoas', '*', [
					'nome[~]' => $_POST['prc_pessoa']
				], [
					'LIMIT' => '10'
				]);
				echo $json_response = json_encode($data);
				break;
		}
	}
?>