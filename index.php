<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" ng-app="app">
	<head>
		<title>Osuc</title>
		<meta charset="utf-8">
		<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, target-densitydpi=device-dpi" />
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" href="assets/css/normalize.css">
		<link rel="stylesheet" href="assets/css/foundation.css">
		<link rel="stylesheet" href="assets/css/osuc.css">
		<link rel="stylesheet" href="assets/css/foundation-icons.css">
		<script src="app/js/vendor/jquery.js"></script>
		<script src="app/js/vendor/jquery.inputmask.js"></script>
		<script src="app/js/vendor/jquery.inputmask.money.js"></script>
		<script src="app/js/angular.min.js"></script>
		<script src="app/js/foundation.min.js"></script>
		<script src="app/app.js"></script>
		<script src="app/controllers/autorizacoescobrancas.js"></script>
		<script src="app/controllers/bancos.js"></script>
		<script src="app/controllers/centros.js"></script>
		<script src="app/controllers/colaboradores.js"></script>
		<script src="app/controllers/contas.js"></script>
		<script src="app/controllers/grupos.js"></script>
		<script src="app/controllers/patronatos.js"></script>
		<script src="app/controllers/pessoas.js"></script>
		<script src="app/controllers/tipostransferencias.js"></script>
		<!-- // <script src="app/controllers/vinculosfuncoes.js"></script> -->
	</head>
	<body ng-controller="appController as appCtrl">
		<div class="off-canvas-wrap" data-offcanvas>
			<div class="inner-wrap">
				<nav class="tab-bar">
					<section class="left-small">
						<a class="left-off-canvas-toggle menu-icon" href="#">
							<span></span>
						</a>
					</section>
					<section class="middle tab-bar-section">
						<h1 class="title">Osuc</h1>
					</section>
				</nav>
				<aside class="left-off-canvas-menu" style="height: 50em;">
					<ul class="off-canvas-list">
						<li>
							<label>Osuc</label>
						</li>
						<li>
							<a ng-click="pagina_atual = 'autorizacoescobrancas'; limpar_telas();">Autorizações de Cobranças</a>
						</li>
						<li>
							<a ng-click="pagina_atual = 'bancos'; limpar_telas();">Bancos</a>
						</li>
						<li>
							<a ng-click="pagina_atual = 'centros'; limpar_telas();">Centros</a>
						</li>
						<li>
							<a ng-click="pagina_atual = 'colaboradores'; limpar_telas();">Colaboradores</a>
						</li>
						<li>
							<a ng-click="pagina_atual = 'contas'; limpar_telas();">Contas</a>
						</li>
						<li>
							<a ng-click="pagina_atual = 'grupos'; limpar_telas();">Grupos</a>
						</li>
						<li>
							<a ng-click="pagina_atual = 'patronatos'; limpar_telas();">Patronatos</a>
						</li>
						<li>
							<a ng-click="pagina_atual = 'pessoas'; limpar_telas();">Pessoas</a>
						</li>
						<li>
							<a ng-click="pagina_atual = 'tipostransferencias'; limpar_telas();">Tipos de Transferências</a>
						</li>
						<!-- <li>
								<a ng-click="pagina_atual = 'vinculosfuncoes'">Vínculos / Funções</a>
						</li> -->
					</ul>
				</aside>
				<section class="main-section">
					<div ng-show="pagina_atual == 'autorizacoescobrancas'" id="pg_autorizacoescobrancas" autorizacoescobrancas data-role="page"></div>
					<div ng-show="pagina_atual == 'bancos'" id="pg_bancos" bancos data-role="page"></div>
					<div ng-show="pagina_atual == 'centros'" id="pg_centros" centros data-role="page"></div>
					<div ng-show="pagina_atual == 'colaboradores'" id="pg_colaboradores" colaboradores data-role="page"></div>
					<div ng-show="pagina_atual == 'contas'" id="pg_contas" contas data-role="page"></div>
					<div ng-show="pagina_atual == 'grupos'" id="pg_grupos" grupos data-role="page"></div>
					<div ng-show="pagina_atual == 'patronatos'" id="pg_patronatos" patronatos data-role="page"></div>
					<div ng-show="pagina_atual == 'pessoas'" id="pg_pessoas" pessoas data-role="page"></div>
					<div ng-show="pagina_atual == 'tipostransferencias'" id="pg_tipostransferencias" tipostransferencias data-role="page"></div>
					<!-- <div ng-show="pagina_atual == 'vinculosfuncoes'" id="pg_vinculosfuncoes" vinculosfuncoes data-role="page"></div> -->
				</section>
			</div>
		</div>
		<script>
		$(document).foundation();
		</script>
	</body>
</html>