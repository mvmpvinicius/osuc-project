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
			case 'buscaColaborador':
				if ($_POST['id'] != '-1') {
					$data['colaborador'] = $database->select('colaboradores', '*', [
						'id' => $_POST['id']
					]);

					foreach ($data['colaborador'] as $key => $value) {
						$data['colaboradores_pessoas'] = $database->select('pessoas', '*', [
							'id' => $value['id_pessoa']
						]);
					}

					foreach ($data['colaborador'] as $key => $value) {
						$data_nome = $database->select('pessoas', '*', [
							'id' => $value['id_pessoa']
						]);

						foreach ($data_nome as $key2 => $value2) {
							$data['colaborador'][$key]['nome'] = $value2['nome'];
						}
					}

					$data['contribuintes_selecionados'] = $database->select('colaboradores_contribuintes', '*', [
						'id_colaborador' => $_POST['id']
					]);

					foreach ($data['contribuintes_selecionados'] as $key => $value) {
						$data_nome = $database->select('pessoas', '*', [
							'id' => $value['id_contribuinte']
						]);

						foreach ($data_nome as $key2 => $value2) {
							$data['contribuintes_selecionados'][$key]['nome'] = $value2['nome'];
						}
					}

					$data['contribuintes'] = $database->select('pessoas', '*', [
						'LIMIT' => 25
					]);
					$data['editar'] = true;
				} else {
					$data['colaboradores'] = $database->select('colaboradores', '*');

					foreach ($data['colaboradores'] as $key => $value) {
						$data_nome = $database->select('pessoas', '*', [
							'id' => $value['id_pessoa']
						]);

						foreach ($data_nome as $key2 => $value2) {
							$data['colaboradores'][$key]['nome'] = $value2['nome'];
						}
					}

					$data['colaboradores_pessoas'] = $database->select('pessoas', '*', [
						'LIMIT' => 25
					]);

					$data['contribuintes'] = $database->select('pessoas', '*', [
						'LIMIT' => 25
					]);
				}
				echo $json_response = json_encode($data);
				break;
			case 'editaColaborador':
				$database->update('colaboradores', [
					'id_pessoa' => $_POST['data']['id_colaborador_pessoa'],
					'id_grupo' => $_POST['data']['id_grupo']
				], [
					'id' => $_POST['data']['id']
				]);

				$database->delete('colaboradores_contribuintes', [
					'id_colaborador' => $_POST['data']['id']
				]);
				
				foreach ($_POST['data']['contribuintes_selecionados'] as $key) {
					$database->insert('colaboradores_contribuintes', [
						'id_colaborador' => $_POST['data']['id'],
						'id_contribuinte' => $key['id']
					]);
				}
				break;
			case 'excluiColaborador':
				$database->delete('colaboradores', [
					'id' => $_POST['id']
				]);

				$database->delete('colaboradores_contribuintes', [
					'id_colaborador' => $_POST['id']
				]);
				break;
			case 'incluiColaborador':
				print_r($_POST);
				$insertId = $database->insert('colaboradores', [
					'id_pessoa' => $_POST['data']['id_colaborador_pessoa'],
					'id_grupo' => $_POST['data']['id_grupo']
				]);
				
				foreach ($_POST['data']['contribuintes_selecionados'] as $key) {
					$database->insert('colaboradores_contribuintes', [
						'id_colaborador' => $insertId,
						'id_contribuinte' => $key['id']
					]);
				}
				break;
			case 'prcColaborador':
				$data = $database->select('pessoas', '*', [
					'nome[~]' => $_POST['prc_colaborador']
				], [
					'LIMIT' => '10'
				]);
				echo $json_response = json_encode($data);
				break;
			case 'prcContribuinte':
				$data = $database->select('pessoas', '*', [
					'nome[~]' => $_POST['prc_contribuinte']
				], [
					'LIMIT' => '10'
				]);
				echo $json_response = json_encode($data);
				break;
		}
	}
?>