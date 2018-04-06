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
			case 'buscaPatronato':
				if ($_POST['id'] != '-1') {
					$data['patronatos'] = $database->select('patronatos', '*', [
						'id' => $_POST['id']
					]);

					foreach ($data['patronatos'] as $key => $value) {
						$data['diretor'] = $database->select('pessoas', '*', [
							'id' => $value['id_diretor']
						]);
					}

					$data['grupos_selecionados'] = $database->select('patronatos_grupos', '*', [
						'id_patronato' => $_POST['id']
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
					$data['diretores'] = $database->select('pessoas', '*', [
						'LIMIT' => 25
					]);
					$data['grupos'] = $database->select('grupos', '*');
					$data['patronatos'] = $database->select('patronatos', '*');
				}
				echo $json_response = json_encode($data);
				break;
			case 'editaPatronato':
				$database->update('patronatos', [
					'nome' => $_POST['data']['nome'],
					'id_diretor' => $_POST['data']['id_diretor']
				], [
					'id' => $_POST['data']['id']
				]);

				$database->delete('patronatos_grupos', [
					'id_patronato' => $_POST['data']['id']
				]);

				foreach ($_POST['data']['grupos_selecionados'] as $key) {
					$database->insert('patronatos_grupos', [
						'id_patronato' => $_POST['data']['id'],
						'id_grupo' => $key['id']
					]);
				}
				break;
			case 'excluiPatronato':
				$database->delete('patronatos', [
					'id' => $_POST['id']
				]);

				$database->delete('patronatos_grupos', [
					'id_patronato' => $_POST['id']
				]);
				break;
			case 'incluiPatronato':
				$insertId = $database->insert('patronatos', [
					'nome' => $_POST['data']['nome'],
					'id_diretor' => $_POST['data']['id_diretor']
				]);

				foreach ($_POST['data']['grupos_selecionados'] as $key) {
					$database->insert('patronatos_grupos', [
						'id_patronato' => $insertId,
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