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

	if (isset($_POST['acao'])) {
		switch ($_POST['acao']) {
			case 'buscaGrupo':
				if ($_POST['id'] != '-1') {
					$data['grupos'] = $database->select('grupos', '*', [
						'id' => $_POST['id']
					]);
					foreach ($data['grupos'] as $key => $value) {
						$data['encarregados'] = $database->select('pessoas', '*', [
							'id' => $value['id_encarregado']
						]);
						$data['gerentes_1'] = $database->select('pessoas', '*', [
							'id' => $value['id_gerente_1']
						]);
						$data['gerentes_2'] = $database->select('pessoas', '*', [
							'id' => $value['id_gerente_2']
						]);
					}
					$data['editar'] = true;
				} else {
					$data['encarregados'] = $database->select('pessoas', '*', [
						'LIMIT' => 25
					]);
					$data['gerentes_1'] = $database->select('pessoas', '*', [
						'LIMIT' => 25
					]);
					$data['gerentes_2'] = $database->select('pessoas', '*', [
						'LIMIT' => 25
					]);
					$data['grupos'] = $database->select('grupos', '*');
				}
				echo $json_response = json_encode($data);
				break;
			case 'editaGrupo':
				$database->update('grupos', [
					'nome' => $_POST['data']['nome'],
					'id_encarregado' => $_POST['data']['id_encarregado'],
					'id_gerente_1' => $_POST['data']['id_gerente_1'],
					'id_gerente_2' => $_POST['data']['id_gerente_2']
				], [
					'id' => $_POST['data']['id']
				]);
				break;
			case 'excluiGrupo':
				$database->delete('grupos', [
					'id' => $_POST['id']
				]);
				break;
			case 'incluiGrupo':
				$database->insert('grupos', [
					'nome' => $_POST['data']['nome'],
					'id_encarregado' => $_POST['data']['id_encarregado'],
					'id_gerente_1' => $_POST['data']['id_gerente_1'],
					'id_gerente_2' => $_POST['data']['id_gerente_2']
				]);
				break;
			case 'prcEncarregado':
				$data = $database->select('pessoas', '*', [
					'nome[~]' => $_POST['prc_encarregado']
				], [
					'LIMIT' => '10'
				]);
				echo $json_response = json_encode($data);
				break;
			case 'prcGerente_1':
				$data = $database->select('pessoas', '*', [
					'nome[~]' => $_POST['prc_gerente_1']
				], [
					'LIMIT' => '10'
				]);
				echo $json_response = json_encode($data);
				break;
			case 'prcGerente_2':
				$data = $database->select('pessoas', '*', [
					'nome[~]' => $_POST['prc_gerente_2']
				], [
					'LIMIT' => '10'
				]);
				echo $json_response = json_encode($data);
				break;
		}
	}
?>