var preloader = $('.preloader');
$(window).on('load', function() {
	preloader.fadeOut(1000, function(){ $(this).remove();});
	//console.log("SE QUITO");
	$(function(){
		$(".element").typed({
			strings: ["tu sitio web.", "tu identidad corporativa.","la publicidad que necesitas."],
			loop: true,
			typeSpeed: 60,
			backSpeed: 0,
		});

		/*Tooltip*/
		$('.tool').tooltip();

		$.validator.addMethod(
			"soloLetras",
			function(value, element) {
				return value.match(/^[a-zA-Z_áéíóúñ\s]*$/);
			},"Sólo están permitidas letras",
			);

		$.validator.addMethod(
			"soloNumeros",
			function(value, element) {
				return value.match(/^[0-9\s]*$/);
			},"Sólo están permitidas letras",
			);

		$('#frmContacto').validate({
			errorElement: 'div',
			errorClass: 'inp-error',
			rules: { 
				inNombre:   {required: true, soloLetras: true},
				inCorreo:   {required: true, email: true},
				inTelefono: {required: true, soloNumeros: true},
				inMensaje:  {required: true}
			},
			messages: {
				inNombre:   {required: "Llena la información", soloLetras: "Introduce solo letras"},
				inCorreo:   {required: "Llena el campo", email: "Introduce un correo válido"},
				inTelefono: {required: "Llena la información", soloNumeros: "Introduce solo números"},
				inMensaje:  {required: "Llena la información"}
			},
			submitHandler: function (form) {
				var dataString = $(form).serialize();
				$.ajax({
					type: "POST",
					url: "php/newContacto.php",
					data: dataString,
					beforeSend: function() {
						alert("Enviando"+dataString);
						$('.inpu').prop('disabled', true);
					},
					success: function(data) {
						console.log(data);
						$('.inpu').prop('disabled', false);
						var json=JSON.parse(data);
						if(json.respuesta=='bien') {
							$('.inpu').val('');
							swal({ 
								title: json.res, 
								text: "Gracias por tu mensaje.", 
								type: "success"
							});
						} else {
							console.log("Error: "+json.error+" | Data: "+data);
						}
					},
					error: function (xhr, ajaxOptions, thrownError) {
						alert(xhr.status);
						alert(thrownError);
					}
				});
			}
		});


		$('.nav a').click(function(){
			$('.navbar-ex1-collapse').collapse('hide');
		});

		/*Waypoint*/
		$('#quienes-somos').css('opacity', 0);
		$('.ser-general').css('opacity', 0);
		$('.mmv').css('opacity', 0);
		$('.tecnologias').css('opacity', 0);

		$('#quienes-somos').waypoint(function() {
			$('#quienes-somos').addClass('fadeInUp');
		}, { offset: '70%' });

		$('.ser-general').waypoint(function() {
			$('.ser-general').addClass('bounceIn');
		}, { offset: '70%' });

		$('.mmv').waypoint(function() {
			$('.mmv').addClass('bounceIn');
		}, { offset: '70%' });

		$('.tecnologias').waypoint(function() {
			$('.tecnologias').addClass('bounceIn');
		}, { offset: '70%' });


		

	});
});

