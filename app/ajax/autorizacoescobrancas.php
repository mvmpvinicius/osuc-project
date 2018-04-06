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
			case 'buscaAutorizacaocobranca':
				if ($_POST['id'] != '-1') {
					$data['autorizacoes_cobrancas'] = $database->select('autorizacoes_cobrancas', '*', [
						'id' => $_POST['id']
					]);

					foreach ($data['autorizacoes_cobrancas'] as $key => $value) {
						$data['contribuintes'] = $database->select('pessoas', '*', [
							'id' => $value['id_contribuinte']
						]);
					}

					$data['editar'] = true;
				} else {
					$data['autorizacoes_cobrancas'] = $database->select('autorizacoes_cobrancas', '*');
				}
				echo $json_response = json_encode($data);
				break;
			case 'editaAutorizacaocobranca':
				$database->update('autorizacoes_cobrancas', [
					'id_contribuinte' => $_POST['data']['id_contribuinte'],
					'id_conta' => $_POST['data']['id_conta'],
					'data_inicio' => $_POST['data']['data_inicio'],
					'data_termino' => $_POST['data']['data_termino'],
					'periodicidade' => $_POST['data']['periodicidade'],
					'dia_desconto' => $_POST['data']['dia_desconto'],
					'valor' => $_POST['data']['valor'],
					'id_tipo_transferencia' => $_POST['data']['id_tipo_transferencia']
				], [
					'id' => $_POST['data']['id']
				]);
				break;
			case 'excluiAutorizacaocobranca':
				$database->delete('autorizacoes_cobrancas', [
					'id' => $_POST['id']
				]);
				break;
			case 'incluiAutorizacoescobrancas':
				$database->insert('autorizacoes_cobrancas', [
					'id_contribuinte' => $_POST['data']['id_contribuinte'],
					'id_conta' => $_POST['data']['id_conta'],
					'data_inicio' => $_POST['data']['data_inicio'],
					'data_termino' => $_POST['data']['data_termino'],
					'periodicidade' => $_POST['data']['periodicidade'],
					'dia_desconto' => $_POST['data']['dia_desconto'],
					'valor' => $_POST['data']['valor'],
					'id_tipo_transferencia' => $_POST['data']['id_tipo_transferencia']
				]);
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