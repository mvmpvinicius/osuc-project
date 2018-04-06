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
			case 'buscaConta':
				if ($_POST['id'] != '-1') {
					$data = $database->select('contas', '*', [
						'id' => $_POST['id']
					]);
					$data['editar'] = true;
				} else {
					$data = $database->select('contas', '*');
				}
				echo $json_response = json_encode($data);
				break;
			case 'editaConta':
				$database->update('contas', [
					'tipo_conta' => $_POST['data']['tipo_conta'],
					'conta' => $_POST['data']['conta'],
					'agencia' => $_POST['data']['agencia'],
					'id_banco' => $_POST['data']['id_banco'],
					'modalidade' => $_POST['data']['modalidade']
				], [
					'id' => $_POST['data']['id']
				]);
				break;
			case 'excluiConta':
				$database->delete('contas', [
					'id' => $_POST['id']
				]);
				break;
			case 'incluiConta':
				$database->insert('contas', [
					'tipo_conta' => $_POST['data']['tipo_conta'],
					'conta' => $_POST['data']['conta'],
					'agencia' => $_POST['data']['agencia'],
					'id_banco' => $_POST['data']['id_banco'],
					'modalidade' => $_POST['data']['modalidade']
				]);
				break;
		}
	}
?>