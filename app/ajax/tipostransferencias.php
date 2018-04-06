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
			case 'buscatipoTransferencia':
				if ($_POST['id'] != '-1') {
					$data['tipostransferencias'] = $database->select('tipos_transferencias', '*', [
						'id' => $_POST['id']
					]);
					$data['editar'] = true;
				} else {
					$data['tipostransferencias'] = $database->select('tipos_transferencias', '*');
				}
				echo $json_response = json_encode($data);
				break;
			case 'editatipoTransferencia':
				$database->update('tipos_transferencias', [
					'nome' => $_POST['data']['tipotransferencia']
				], [
					'id' => $_POST['data']['id']
				]);
				break;
			case 'excluitipoTransferencia':
				$database->delete('tipos_transferencias', [
					'id' => $_POST['id']
				]);
				break;
			case 'incluitipoTransferencia':
				$database->insert('tipos_transferencias', [
					'nome' => $_POST['data']['tipotransferencia']
				]);
				break;
		}
	}
?>