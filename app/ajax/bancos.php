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
			case 'buscaBanco':
				if ($_POST['id'] != '-1') {
					$data = $database->select('bancos', '*', [
						'id' => $_POST['id']
					]);
					$data['editar'] = true;
				} else {
					$data = $database->select('bancos', '*');
				}
				echo $json_response = json_encode($data);
				break;
			case 'editaBanco':
				$database->update('bancos', [
					'nome' => $_POST['data']['nome'],
					'numero' => $_POST['data']['numero']
				], [
					'id' => $_POST['data']['id']
				]);
				break;
			case 'excluiBanco':
				$database->delete('bancos', [
					'id' => $_POST['id']
				]);
				break;
			case 'incluiBanco':
				$database->insert('bancos', [
					'nome' => $_POST['data']['nome'],
					'numero' => $_POST['data']['numero']
				]);
				break;
		}
	}
?>