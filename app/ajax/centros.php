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
			case 'buscaCentro':
				if ($_POST['id'] != '-1') {
					$data['centros'] = $database->select('centros', '*', [
						'id' => $_POST['id']
					]);

					foreach ($data['centros'] as $key => $value) {
						$data['diretores'] = $database->select('pessoas', '*', [
							'id' => $value['id_diretor']
						]);
					}

					$data['grupos_selecionados'] = $database->select('centros_grupos', '*', [
						'id_centro' => $_POST['id']
					]);

					foreach ($data['grupos_selecionados'] as $key => $value) {
						$data_nome = $database->select('grupos', '*', [
							'id' => $value['id_grupo']
						]);

						foreach ($data_nome as $key2 => $value2) {
							$data['grupos_selecionados'][$key]['nome'] = $value2['nome'];
						}
					}

					$data['grupos'] = $database->select('grupos', '*');
					$data['editar'] = true;
				} else {
					$data['centros'] = $database->select('centros', '*');
					$data['diretores'] = $database->select('pessoas', '*', [
						'LIMIT' => 25
					]);
					$data['grupos'] = $database->select('grupos', '*');
				}
				echo $json_response = json_encode($data);
				break;
			case 'editaCentro':
				$database->update('centros', [
					'nome' => $_POST['data']['nome'],
					'id_diretor' => $_POST['data']['id_diretor']
				], [
					'id' => $_POST['data']['id']
				]);

				$database->delete('centros_grupos', [
					'id_centro' => $_POST['data']['id']
				]);

				foreach ($_POST['data']['grupos_selecionados'] as $key) {
					$database->insert('centros_grupos', [
						'id_centro' => $_POST['data']['id'],
						'id_grupo' => $key['id']
					]);
				}
				break;
			case 'excluiCentro':
				$database->delete('centros', [
					'id' => $_POST['id']
				]);

				$database->delete('centros_grupos', [
					'id_centro' => $_POST['id']
				]);
				break;
			case 'incluiCentro':
				$insertId = $database->insert('centros', [
					'nome' => $_POST['data']['nome'],
					'id_diretor' => $_POST['data']['id_diretor']
				]);
				
				foreach ($_POST['data']['grupos_selecionados'] as $key) {
					$database->insert('centros_grupos', [
						'id_centro' => $insertId,
						'id_grupo' => $key['id']
					]);
				}
				break;
			case 'prcDiretor':
				$data = $database->select('pessoas', '*', [
					'nome[~]' => $_POST['prc_diretor']
				], [
					'LIMIT' => '10'
				]);
				echo $json_response = json_encode($data);
				break;
		}
	}
?>