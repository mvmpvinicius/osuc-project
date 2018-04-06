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

	$nome_arquivo = 'teste';

	$fp = fopen($nome_arquivo . '.txt', 'r');

	$arr = array();

	while (!feof($fp)) {
		$txt = fgets($fp);

		$arr[] = explode("\t", $txt);
		$atual = end($arr);

		$nome = ucwords(strtolower($atual[3]));
		$data = $database->query("SELECT id FROM pessoas WHERE nome LIKE '%" . $nome . "%'")->fetchAll();

		$database->insert('autorizacoes_cobrancas', [
			'id_contribuinte' => $data[0]['id'],
			'data_inicio' => $atual[7],
			'data_termino' => $atual[8],
			'valor' => $atual[10]
		]);
	}
?>