		//http://www.javascriptlint.com/online_lint.php
		
		
		function echeck(str) {
			var at="@";
			var dot=".";
			var lat=str.indexOf(at);
			var lstr=str.length;
			var ldot=str.indexOf(dot);
			if (str.indexOf(at)==-1){
			   //alert("Invalid E-mail ID")
			   return false;
			}

			if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
			   //alert("Invalid E-mail ID")
			   return false;
			}

			if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
				//alert("Invalid E-mail ID")
				return false;
			}

			 if (str.indexOf(at,(lat+1))!=-1){
				//alert("Invalid E-mail ID")
				return false;
			 }

			 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
				//alert("Invalid E-mail ID")
				return false;
			 }

			 if (str.indexOf(dot,(lat+2))==-1){
				//alert("Invalid E-mail ID")
				return false;
			 }
			
			 if (str.indexOf(" ")!=-1){
				//alert("Invalid E-mail ID")
				return false;
			 }

			 return true;				
		}
		
		
		//Funcoes especificas do Phonegap
		
		var celular_modelo = "";	
		var celular_plataforma = "";
		var celular_uuid = "";
		var celular_versao = "";
		var isPhoneGapReady = false;
		//var isConnected = false;
		var isConnected = true;
		var isHighSpeed = false;
		var watchID;
		var retorno_rastreio = "(nao houve o envio de dados)";
		var enderDe = "";
		var enderAte = "";
		var distancia = "";
		var duracao = "";
		var MapaPronto = "NAO";
		
		//Variaveis da aplicacao
		var email_aplicativo;
		var var_chave;
		
		// Wait for device API libraries to load
		// device APIs are available
		//
		
		document.addEventListener("deviceready", onDeviceReady, false);
		 
		function onDeviceReady() {
			isPhoneGapReady = true;
			// detect for network access
			networkDetection();
			// attach events for online and offline detection
			document.addEventListener("online", onOnline, false);
			document.addEventListener("offline", onOffline, false);
			if (isConnected){
				$.getScript("http://maps.google.com/maps/api/js?v=3.1&sensor=false&language=pt-BR&key=AIzaSyB-dudx6w0oDbDuAcrcMUEmD-cVc5fHVmE").done(function( script, textStatus ) {
					MapaPronto = "SIM";
					$.mobile.changePage("#pageone");
					//console.log( textStatus );
				}).fail(function( jqxhr, settings, exception ) {
					$.mobile.changePage("#aviso");
					//$( "div.log" ).text( "Triggered ajaxError handler." );
				});
			}
		}
		
		 // alert dialog dismissed
		function alertDismissed() {
			// do something
		}
		
	
		
		function networkDetection() {
			if (isPhoneGapReady) {
				// as long as the connection type is not none,
				// the device should have Internet access
				var states = {};
				states[navigator.connection.UNKNOWN]  = 'Unknown connection';
				states[navigator.connection.ETHERNET] = 'Ethernet connection';
				states[navigator.connection.WIFI]     = 'WiFi connection';
				states[navigator.connection.CELL_2G]  = 'Cell 2G connection';
				states[navigator.connection.CELL_3G]  = 'Cell 3G connection';
				states[navigator.connection.CELL_4G]  = 'Cell 4G connection';
				states[navigator.connection.NONE]     = 'No network connection';
				var tipo_conexao = states[navigator.connection.type];
				
				if (tipo_conexao != 'No network connection') {
					isConnected = true;
				}
			}
		}
		
		function onOnline() {
			isConnected = true;
		}
		function onOffline() {
			//isConnected = false;
		}
		
		
		$(document).on('pageinit', '#pageone', function(){
			if (isPhoneGapReady){
				if (isConnected) {
					var geocoder;
					geocoder = new google.maps.Geocoder();
					 
					$("#endereco1").autocomplete({
						search: function(event, ui) {
							$('#lst_endereco1').empty();
						},
						minLength: 5,
						
						source: function (request, response) {
							geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
								response($.map(results, function (item) {
									return {
										label: item.formatted_address,
										value: item.formatted_address,
										latitude: item.geometry.location.lat(),
										longitude: item.geometry.location.lng()
									}
								}));
							})
						},
						select: function (event, ui) {
							//$("#txtLatitude").val(ui.item.latitude);
							//$("#txtLongitude").val(ui.item.longitude);
							//var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
							//marker.setPosition(location);
							//map.setCenter(location);
							//map.setZoom(16);
						}
					}).data('autocomplete')._renderItem = function(ul, item) {
						return $('<li>')
					   .append( "<a><h3>" + item.value + "</h3></a>" )
					   .appendTo($('#lst_endereco1'));
					};
					
					$("#endereco2").autocomplete({
						search: function(event, ui) {
							$('#lst_endereco2').empty();
						},
						minLength: 5,
						source: function (request, response) {
							geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
								response($.map(results, function (item) {
									return {
										label: item.formatted_address,
										value: item.formatted_address,
										latitude: item.geometry.location.lat(),
										longitude: item.geometry.location.lng()
									}
								}));
							})
						},
						select: function (event, ui) {
							//$("#txtLatitude").val(ui.item.latitude);
							//$("#txtLongitude").val(ui.item.longitude);
							//var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
							//marker.setPosition(location);
							//map.setCenter(location);
							//map.setZoom(16);
						}
					}).data('autocomplete')._renderItem = function(ul, item) {
						return $('<li>')
					   .append( "<a><h3>" + item.value + "</h3></a>" )
					   .appendTo($('#lst_endereco2'));
					};
					
					$('#lst_endereco1').delegate('li', 'click', function () {
						var ul = $(this); 
						$('#endereco1').val(ul.text());
						$('#lst_endereco1').empty();
					 });
					
					$('#lst_endereco2').delegate('li', 'click', function () {
						var ul = $(this); 
						$('#endereco2').val(ul.text());
						$('#lst_endereco2').empty();
					 });
					
					$(document).on('click', '#enviar_contato', function() { // catch the form's submit event
					
						var continuar = true;
						var mensagem ="Ocorreram os seguintes erros:\n";
						
						if ($('#endereco1').val() == "") {
							mensagem = mensagem +  'Digite o endereco de origem\n';
							continuar = false;
						} 
						
						if ($('#endereco2').val() == "") {
							mensagem = mensagem +  'Digite o endereco de destino\n';
							continuar = false;
						} 

						if (continuar){
							enderDe = $('#endereco1').val();
							enderAte = $('#endereco2').val();
							$.mobile.changePage("#rastreio");
						} else {
							alert(mensagem);
							//navigator.notification.alert(mensagem, alertDismissed, 'Consulta Rota', 'OK');
						}
						return false; // cancel original event to prevent form submitting
				 
					});
					
				} else {
					$.mobile.changePage("#aviso");
				}
			
			} else {
				$.mobile.changePage("#aviso");
			}

		});
		
		$(document).on('pageshow', '#pageone', function(){
			$("#endereco1").val('');
			$("#endereco2").val('');
		});
		
		$(document).on('pageshow', '#rastreio', function(){
			if (isPhoneGapReady){
				if (isConnected) {
					//criando o mapa
					document.getElementById("map_canvas").style.display = "none";
					initialize_mapa();
				} else {
					$.mobile.changePage("#aviso");
				}
			} else {
				$.mobile.changePage("#aviso");
			}
		});
		
		
		//Funcoes para montar o mapa
		var map, geocoder;
		var mapDisplay, directionsService;

		function initialize_mapa() {
		  document.getElementById("map_canvas").style.display = "block";
		  var myOptions = {zoom: 15,mapTypeId: google.maps.MapTypeId.ROADMAP};
		  map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
		  geocoder = new google.maps.Geocoder();
		  
		  //var enderDe = 'ALAMEDA SANTOS, 1000, SAO PAULO - SP, 01418-9028';
		  //var enderAte = 'AVENIDA NACOES UNIDAS, 17-17, BAURU - SP, 17013-035';
		  
		  geocoder.geocode( { 'address': enderAte, 'region' : 'BR'},trataLocs);
		  
		  initializeDirections ();
		  
		  calcRota (enderDe, enderAte);
		}

		function initializeDirections () {
		 directionsService = new google.maps.DirectionsService();
		 mapDisplay = new google.maps.DirectionsRenderer();
		 mapDisplay.setMap(map);
		 mapDisplay.setPanel(document.getElementById("panel"));
		}

		function calcRota(endDe, endPara) {
		  
		  //calcular os waypoints de acordo com os enderecos  
		  var request = {
			  origin:endDe, 
			  destination:endPara,
			  travelMode: google.maps.DirectionsTravelMode.DRIVING
		  };
		  directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
			  mapDisplay.setDirections(response);
			  var route = response.routes[0];
			  document.getElementById("distance").innerHTML = 'Distancia:' + response.routes[0].legs[0].distance.text;
			  document.getElementById("duration").innerHTML = ' Tempo estimado: ' + response.routes[0].legs[0].duration.text;
			  distancia = response.routes[0].legs[0].distance.text;;
			  duracao = response.routes[0].legs[0].duration.text;
				
			}
		  });
		  
		  
		}

		function trataLocs (results, status) {
		  var elem = document.getElementById('msg');
		  if (status == google.maps.GeocoderStatus.OK) {
		   map.setCenter(results[0].geometry.location);
		  var marker = new google.maps.Marker({
		  map: map, 
		  position: results[0].geometry.location  });
		  if (results.length > 1) {
		   var i, txt = '<select style="font-family:Verdana;font-size:8pt;width=550px;" onchange="mostraEnd(this.options[this.selectedIndex].text);">';
		   elem.innerHTML = 'O endereço exato não foi localizado - há ' +  results.length.toString() + ' resultados aproximados.<br />';
		   for (i = 0; i < results.length; i++) {
		   txt = txt + '<option value="' + i.toString() + '"';
			if (i == 0) {
				txt = txt + ' selected="selected"'; 
				txt = txt + '>' + results[i].formatted_address + '</option>';
			}
			}
		  txt = txt + '</select>';
		   elem.innerHTML = elem.innerHTML + txt;
		   }
		  } else {
		   elem.innerHTML = 'Erro no tratamento do endereço :<br /><b>' + status + '</b>';
		 }
		 
		} 

