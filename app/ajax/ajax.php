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
			//						//
			//		OUTROS AJAX		//
			//						//
			case 'buscaCidade':
				$data = $database->select('cidade', [
					'id',
					'nome'
				], [
					'estado' => $_POST['estado']
				]);
				echo $json_response = json_encode($data);
				break;
			case 'buscaUf':
				$data = $database->select('estado', [
					'id',
					'nome'
				]);
				echo $json_response = json_encode($data);
				break;
			////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////			
		}
	}
?>