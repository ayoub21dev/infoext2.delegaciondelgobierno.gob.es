jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height()- 300 - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}
var decrementoTab = 0; // esta variable sirve para controlar la numeracion de los tab
var final = true;
var relleno = false;

var userAgent = navigator.userAgent.toLowerCase();
$.browser = {
    version: (userAgent.match( /.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/ ) || [])[1],
    chrome: /chrome/.test( userAgent ),
    safari: /webkit/.test( userAgent ) && !/chrome/.test( userAgent ),
    opera: /opera/.test( userAgent ),
    msie: (/msie/.test( userAgent ) && !/opera/.test( userAgent )) || /trident/.test( userAgent ),
    mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) && !/trident/.test( userAgent )
};
// VALIDACIONES
function autoCompletaFecha(parFecha,event){
	var fecha = parFecha.value;
	if(event.keyCode>=48 && event.keyCode<=105){
		if ((fecha.length==2) || (fecha.length==5 && fecha.charAt(2)=='/')) parFecha.value+="/";
		parFecha.value=parFecha.value.replace("//","/");
	}
	else{
		if(event.keyCode==8){
			if ((fecha.length==2) || (fecha.length==5 && fecha.charAt(2)=='/')) parFecha.value=parFecha.value.substr(0,fecha.length-1);
		}
	}
}
function esVacio(cadena)
{
	if(cadena==null) return true;
	if(cadena.length<1) return true;
	if(HacerTrim(cadena)=="") return true;
	return false;
}
function HacerTrim(cadena)
{
	for(i=0; i<cadena.length;)
	{
		if(cadena.charAt(i)==" ")
		{
			cadena=cadena.substring(i+1, cadena.length);
		}else
			break;
	}
	
	for(i=cadena.length-1; i>=0; i=cadena.length-1)
	{
		if(cadena.charAt(i)==" ")
		{
			cadena=cadena.substring(0,i);
		}else
			break;
	}
	return cadena;
}
function depuraFechaM(pFecha) 
{
var i = 0;
var cont = 0;
var correcto = true;

for (i = 0; i < pFecha.length ; i++) 	// Busco barras ****************
	if (pFecha.substr(i,1) == '/')
		cont++;
// INICIO DEPURACION DE FORMATO dd/mm/aaaa ************************
if (cont == 2) // el formato debe ser dd/mm/aaaa
	{
	if (pFecha.length != 10) 
		correcto = false;
	// Veo si las barras estAn bien colocadas en las posiciones 2 y 5
	if ( ((pFecha.substr(2,1) != '/') || (pFecha.substr(5,1) != '/')) && correcto == true) 			
		correcto = false;										
	
	if (correcto == true)// comprobamos fechas
	{
 		var Anio = pFecha.substr(6,4);
		var Mes = pFecha.substr(3,2);
		var Dia = pFecha.substr(0,2);		
		
		correcto = esFechaM(Dia,Mes,Anio);
		}
	}else{	//NO HAY BARRAS
	
		var Mes = pFecha.substr(2,2);
		var Dia = pFecha.substr(0,2);			

		switch (pFecha.length)
		{
			case 6: //formato ddmmaa
			{
		 		var Anio = pFecha.substr(4,2);
		 		var Anyo =0;
				Anyo = Anio / 1;
		 		Anyo < 56 ? Anyo = Anyo + 2000 : Anyo = Anyo + 1900;
		 		Anio = Anyo;
				pFecha = Dia+"/"+Mes+"/"+Anio;
				parFecha.value = pFecha; 
				
				correcto = esFechaM(Dia,Mes,Anio);
				
				break;
				}
			case 8: //formato ddmmaaaa
				{
				var Anio = pFecha.substr(4,4);
				pFecha = Dia+"/"+Mes+"/"+Anio;
				parFecha.value = pFecha; 
				correcto = esFechaM(Dia,Mes,Anio);
				break;
				}			
			default: 
				{
				correcto = false;
				break;	
				}			
			}
	}	
	
	if (correcto == true) 
		return true;			
	else {
		return false;						
	}
}

function esFechaM(Dia,Mes,Anio)	
{
var estado = true;
var ano = parseInt(Anio,10);
var mes = parseInt(Mes,10);
var dia = parseInt(Dia,10);
var fechaActual = new Date();
var fecha = new Date(ano,mes-1,dia);
var month = fecha.getMonth()+1;
var day = fecha.getDate();
var year = fecha.getFullYear();
	if(ano>1900){
		if ((mes<13) && (mes>0)){
			switch (mes)
			{
				case 1:{if (dia > 31) estado= false; 
						break;}
				case 2:{
							if((ano % 4 == 0 && ano % 100 != 0) || (ano % 400 == 0)){
								if (dia > 29) estado= false; 
							}else {
								if (dia > 28) estado= false; 
							}
							break;
						}
				case 3:{if (dia > 31) estado= false; 
						break;}
				case 4:{if (dia > 30) estado= false; 
						break;}
				case 5:{if (dia > 31) estado= false; 
						break;}
				case 6:{if (dia > 30) estado= false; 
						break;}
				case 7:{if (dia > 31) estado= false; 
						break;}
				case 8:{if (dia > 31) estado= false; 
						break;}
				case 9:{if (dia > 30) estado= false; 
						break;}
				case 10:{if (dia > 31) estado= false; 
						break;}
				case 11:{if (dia > 30) estado= false; 
						break;}
				case 12:{if (dia > 31) estado= false; 
						break;}
				default:{estado= false; 
						break;} 
			}
		}else{
			estado= false;
		}
	}else{
	estado= false;
}
	return estado;
}

function validarEmail(valor)
{
	var expreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(expreg.test(valor)) return (true);
	else return (false);
}

var DNI_REGEX = /^(\d{8})([A-Z])$/;
var CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
var NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;

var validDNI = function( dni ) {
	if ( dni.match( DNI_REGEX ) ) {
	 
		var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
		var letter = dni_letters.charAt( parseInt( dni, 10 ) % 23 );
    
		return letter == dni.charAt(8);
	}else{
		return false;
	}
  };

  var validNIE = function( nie ) {
	  if ( nie.match( NIE_REGEX ) ) {
    // Change the initial letter for the corresponding number and validate as DNI
    var nie_prefix = nie.charAt( 0 );

    switch (nie_prefix) {
      case 'X': nie_prefix = 0; break;
      case 'Y': nie_prefix = 1; break;
      case 'Z': nie_prefix = 2; break;
    }

    return validDNI( nie_prefix + nie.substr(1) );
	  }else{
		  return false;
	  }
  };
//DESHABILITAMOS EL BOTON ATRAS DEL NAVEGADOR
// Disabled for local use: if (history.forward(1)){location.replace(history.forward(1))}	
function deshabilitarContainer(){
	$('#container').attr('disabled', 'disabled');
	$('.simbutton').hide();
	$('.ajax-loader').show();
}
function habilitarContainer(){
	$('#container').removeAttr('disabled');
	$('.ajax-loader').hide();
	$('.simbutton').show();
	
}
function volverIni()
{
	$('#container').removeAttr('disabled');
	document.getElementById("formSalir").submit();
}
$(document).ready(function() {
	
	
    $('.tooltip').tooltipster({
            theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
            side: 'right'
        
    });

	$(document).on("click",".mdCer",function() {
		$(".mf-dialog--btn .mf-icon-cancel").trigger("click");
    })
	// Button w/multiple sec. actions
	$('.buttonAction').click(function() {
		deshabilitarContainer();
	});

	$('.fecha').keyup(function() {
	  autoCompletaFecha(this,event);
	});
	
	 $(".lblObliga input, .lblObliga select").on('blur', function() {
			
			if($(this).val()!=null && $(this).val()!=""){
				$(this).removeClass("lblObligaCl");
				$(this).parent().find(".dvReError").remove();
			} 
			
		});
	  $(".lblObliga .merval-date").on('change', function() {
			
			if($(this).val()!=null && $(this).val()!=""){
				$(this).removeClass("lblObligaCl");
				$(this).parent().find(".dvReError").remove();
			} 
			
		});
	  
	
	 	$(document.body).on('keyup', '.merval-upper', function(){
			this.value = this.value.toUpperCase();
			this.value = this.value.replace(/[^A-ZÑÇÜ \][^0-9]/g,'');
		});  
		$('.merval-number').keyup(function () {     
			  this.value = this.value.replace(/[^0-9]/g,'');
		});
		$('.merval-date').keyup(function () {     
			// FORMATO: DD/MM/YYYY
			this.value = this.value.replace(/[^0-9\/-]/g,''); // caracteres validos
			this.value = this.value.replace('-' , '/');
			if (this.value.length>0 && (this.value[0]=='/' || this.value[0]=='-')) this.value=''; // 1. D
			if (this.value.length>1 && (this.value[1]=='/' || this.value[1]=='-')) this.value='0'+this.value.substr(0,1)+'/'; // 2. D
			if (this.value.length>2 && (this.value[2]!='/' && this.value[2]!='-')) this.value = this.value.substr(0,2) + '/'+ this.value[2]; // 3. /
			if (this.value.length>3 && (this.value[3]=='/' || this.value[3]=='-')) this.value = this.value.substr(0,3); // 4. M
			if (this.value.length>4 && (this.value[4]=='/' || this.value[4]=='-')) this.value= this.value.substr(0,3) + '0' + this.value[3] + '/'; // 5. M
			if (this.value.length>5 && (this.value[5]!='/' && this.value[5]!='-')) this.value = this.value.substr(0,5) + '/'+ this.value[5]; // 6. /
			if (this.value.length>6 && (this.value[6]=='/' || this.value[6]=='-')) this.value = this.value.substr(0,6); // 7. Y
			if (this.value.length>7 && (this.value[7]=='/' || this.value[7]=='-')) this.value = this.value.substr(0,7); // 8. Y
			if (this.value.length>8 && (this.value[8]=='/' || this.value[8]=='-')) this.value = this.value.substr(0,8); // 9. Y
			if (this.value.length>9 && (this.value[9]=='/' || this.value[9]=='-')) this.value = this.value.substr(0,9); // 10.Y
			if(this.value.length>10) this.value = this.value.substr(0,10);
		});
		
		
		
	  
});


function NewWindow(mypage,myname,w,h,scroll)
{
	LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
	TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
	TopPosition = TopPosition - 10;
	settings =	'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable';
	win = window.open(mypage,myname,settings);
}



function alertaMercurio(mensaje, tipo)
{
	titulo="Aviso de MERCURIO";
	if(tipo=="V") titulo="Alerta de validación";
	mensaje="<div class='mf-dialog--content'>" + mensaje + "</div>";
	vbuttons="<div class='tc'><button class='mdCer' title='Cerrar la ventana'>Cerrar</button></div>";
	$mf.my_dialog.appendDialog({
        cargando: "Loading",
        clazz: "mf-dialog open_in_dialog",
        title:titulo,
        buttons: vbuttons,
        is_min: 1,
        width:	400,
        position_h: "center",
        position_v: "center",
        modal: 1,
        hide_resize_button: 1,
        draggable: 0,
        data: mensaje
    }, false, true);
	
} 

 
function continuarATelematica(){
	$("#btnConfirmarLegitimo").trigger("click");
	
	$(".mf-dialog--buttonbar button:eq(1)").prop("disabled",true);
	$(".mf-dialog--buttonbar button:eq(1)").addClass("disabledBoton");
	//document.getElementById('FrmDatos').submit();
}
