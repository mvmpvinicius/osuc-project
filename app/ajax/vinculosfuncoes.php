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
			case 'buscavinculoFuncao':
				if ($_POST['id'] != '-1') {
					$funcao = ['funcao' => $_POST['funcao']];
					switch ($_POST['funcao']) {
						case 'contribuinte':
							$data = $database->select('contribuintes', '*', [
								'id' => $_POST['id']
							]);
							$data[0] = array_merge($data[0], $funcao);
							break;
						case 'colaborador':
							$data = $database->select('colaboradores', '*', [
								'id' => $_POST['id']
							]);
							$data[0] = array_merge($data[0], $funcao);
							break;
						case 'gerente':
							$data = $database->select('gerentes', '*', [
								'id' => $_POST['id']
							]);
							$data[0] = array_merge($data[0], $funcao);
							break;
						case 'encarregado':
							$data = $database->select('encarregados', '*', [
								'id' => $_POST['id']
							]);
							$data[0] = array_merge($data[0], $funcao);
							break;
						case 'diretor':
							$data = $database->select('diretores', '*', [
								'id' => $_POST['id']
							]);
							$data[0] = array_merge($data[0], $funcao);
							break;
					}
					$data['editar'] = true;
				} else {
					$data['todos'] = [];

					$data['contribuintes'] = $database->select('contribuintes', '*', [
						'LIMIT' => 10
					]);
					foreach ($data['contribuintes'] as $key => $value) {
						$data_pessoa = $database->select('pessoas', '*', [
							'id' => $value['id_pessoa']
						]);
						$data['contribuintes'][$key]['nome'] = $data_pessoa[0]['nome'];
						$data['contribuintes'][$key]['funcao'] = 'contribuinte';
					}

					$data['colaboradores'] = $database->select('colaboradores', '*', [
						'LIMIT' => 10
					]);
					foreach ($data['colaboradores'] as $key => $value) {
						$data_pessoa = $database->select('pessoas', '*', [
							'id' => $value['id_pessoa']
						]);
						$data['colaboradores'][$key]['nome'] = $data_pessoa[0]['nome'];
						$data['colaboradores'][$key]['funcao'] = 'colaborador';
					}

					$data['gerentes'] = $database->select('gerentes', '*', [
						'LIMIT' => 10
					]);
					foreach ($data['gerentes'] as $key => $value) {
						$data_pessoa = $database->select('pessoas', '*', [
							'id' => $value['id_pessoa']
						]);
						$data['gerentes'][$key]['nome'] = $data_pessoa[0]['nome'];
						$data['gerentes'][$key]['funcao'] = 'gerente';
					}

					$data['encarregados'] = $database->select('encarregados', '*', [
						'LIMIT' => 10
					]);
					foreach ($data['encarregados'] as $key => $value) {
						$data_pessoa = $database->select('pessoas', '*', [
							'id' => $value['id_pessoa']
						]);
						$data['encarregados'][$key]['nome'] = $data_pessoa[0]['nome'];
						$data['encarregados'][$key]['funcao'] = 'encarregado';
					}
					
					$data['diretores'] = $database->select('diretores', '*', [
						'LIMIT' => 10
					]);
					foreach ($data['diretores'] as $key => $value) {
						$data_pessoa = $database->select('pessoas', '*', [
							'id' => $value['id_pessoa']
						]);
						$data['diretores'][$key]['nome'] = $data_pessoa[0]['nome'];
						$data['diretores'][$key]['funcao'] = 'diretor';
					}
					$data['todos'] = array_merge($data['contribuintes'], $data['colaboradores'], $data['gerentes'], $data['encarregados'], $data['diretores']);
				}
				echo $json_response = json_encode($data);
				break;
			case 'excluivinculoFuncao':
				switch ($_POST['funcao']) {
					case 'contribuinte':
						$database->delete('contribuintes', [
							'id' => $_POST['id']
						]);
						break;
					case 'colaborador':
						$database->delete('colaboradores', [
							'id' => $_POST['id']
						]);
						break;
					case 'gerente':
						$database->delete('gerentes', [
							'id' => $_POST['id']
						]);
						break;
					case 'encarregado':
						$database->delete('encarregados', [
							'id' => $_POST['id']
						]);
						break;
					case 'diretor':
						$database->delete('diretores', [
							'id' => $_POST['id']
						]);
						break;
				}
				break;
			case 'editavinculoFuncao':
				switch ($_POST['data']['funcao_antiga']) {
					case 'contribuinte':
						$database->delete('contribuintes', [
							'id' => $_POST['data']['id']
						]);
						break;
					case 'colaborador':
						$database->delete('colaboradores', [
							'id' => $_POST['data']['id']
						]);
						break;
					case 'gerente':
						$database->delete('gerentes', [
							'id' => $_POST['data']['id']
						]);
						break;
					case 'encarregado':
						$database->delete('encarregados', [
							'id' => $_POST['data']['id']
						]);
						break;
					case 'diretor':
						$database->delete('diretores', [
							'id' => $_POST['data']['id']
						]);
						break;
				}
			case 'incluivinculoFuncao':
				switch ($_POST['data']['funcao']) {
					case 'contribuinte':
						$database->insert('contribuintes', [
							'id_pessoa' => $_POST['data']['id_pessoa'],
							'id_vinculo' => $_POST['data']['id_vinculo']
						]);
						break;
					case 'colaborador':
						$database->insert('colaboradores', [
							'id_pessoa' => $_POST['data']['id_pessoa'],
							'id_vinculo' => $_POST['data']['id_vinculo']
						]);
						break;
					case 'gerente':
						$database->insert('gerentes', [
							'id_pessoa' => $_POST['data']['id_pessoa'],
							'id_vinculo' => $_POST['data']['id_vinculo']
						]);
						break;
					case 'encarregado':
						$database->insert('encarregados', [
							'id_pessoa' => $_POST['data']['id_pessoa'],
							'id_vinculo' => $_POST['data']['id_vinculo']
						]);
						break;
					case 'diretor':
						$database->insert('diretores', [
							'id_pessoa' => $_POST['data']['id_pessoa'],
							'id_vinculo' => $_POST['data']['id_vinculo']
						]);
						break;
				}
				break;
		}
	}
?>