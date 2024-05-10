document.addEventListener('DOMContentLoaded', () => {

    //Declaracion de funciones
    const cargarLightModeLS = () => {
        // a traves del === 'true' se evita el null de la primera vez que se entra en la pagina
        const lightModeGuardado = localStorage.getItem('lightmode') === 'true';
        
        if(lightModeGuardado){
            const $calculadoraContainer = document.querySelector('#calculadora-container');
            $calculadoraContainer.classList.add('modo-claro');
        }
    };

    const guardarLightModeLS = (estado) => {
        localStorage.setItem('lightmode', estado);
    };

    const cambiarColor = () => {
        const $calculadoraContainer = document.querySelector('#calculadora-container');

        if($calculadoraContainer.classList.contains('modo-claro')){
            $calculadoraContainer.classList.remove('modo-claro')
        }else{
            $calculadoraContainer.classList.add('modo-claro');
        }
        guardarLightModeLS($calculadoraContainer.classList.contains('modo-claro'));
    };

    const obtenerNumeroCliqueado = (evento) => {
        return evento.target.textContent;
    };

    const anadirNumeroAPantalla = (numero) => {
        const $pantallaCalculadora = document.querySelector('#pantalla-calculadora');
        $pantallaCalculadora.textContent += `${numero}`;
    };

    const obtenerTextoPantalla = () => {

        const $pantallaCalculadora = document.querySelector('#pantalla-calculadora'); 
        return $pantallaCalculadora.textContent
    };

    const anadirNuevoNumeroAPantalla = (nuevoTextoPantalla) => {
        const $pantallaCalculadora = document.querySelector('#pantalla-calculadora');
        $pantallaCalculadora.textContent = `${nuevoTextoPantalla}`
    };

    const eliminarUltimoCaracter = (textoPantalla) => {
        const nuevoTextoPantalla = textoPantalla.slice(0, -1)
        anadirNuevoNumeroAPantalla(nuevoTextoPantalla);
    };

    const limpiarPantalla = () => {
        const $pantallaCalculadora = document.querySelector('#pantalla-calculadora');
        $pantallaCalculadora.textContent = '0';
    };

    const verificarSiExistePunto = () => {
        const textoPantalla = obtenerTextoPantalla();

        if(textoPantalla.includes('.')){
            return true
        }
        else{
            return false
        }
    };

    const verificarSiExisteUnCaracter = () => {
        const textoPantalla = obtenerTextoPantalla();

        if(textoPantalla.length > 0){
            return true
        }
        else{
            return false;
        }

    };

    const verificarSiExisteSigno = () => {
        const textoPantalla = obtenerTextoPantalla();

        if(textoPantalla.includes('+') || textoPantalla.includes('-') ||
        textoPantalla.includes('*') || textoPantalla.includes('/'))
        {
            return true;
        }
        else{
            return false;
        }

    }

    const verificarUltimoCaracter = () => {
        const textoPantalla = obtenerTextoPantalla();
        const ultimoCaracter = textoPantalla[textoPantalla.length - 1];

        if(ultimoCaracter === '+' || ultimoCaracter === '-' ||
        ultimoCaracter === '*' || ultimoCaracter === '/')
        {
            return true;
        }
        else{
            return false;
        }
        
    };

    const obtenerSignoOperacion = (textoPantalla) => {

        let signo;

        if(textoPantalla.includes('+')){
            signo = '+';
        }
        if(textoPantalla.includes('-')){
            signo = '-';
        }
        if(textoPantalla.includes('*')){
            signo = '*';
        }
        if(textoPantalla.includes('/')){
            signo = '/'
        }

        return signo;
    };

    const obtenerIndiceDelSigno = (signo, textoPantalla) => {
        const indice = textoPantalla.indexOf(`${signo}`);

        return indice;
    }

    const obtenerValorPrimerNumero = (indiceDelSigno, textoPantalla) => {

        const numero = parseFloat(textoPantalla.slice(0, (indiceDelSigno)));
        return numero
    };

    const obtenerValorSegundoNumero = (indiceDelSigno, textoPantalla) => {

        const numero = parseFloat(textoPantalla.slice((indiceDelSigno + 1), (textoPantalla.length)))
        return numero
    };

    let banderaDivision = false;

    const validacionSegundoNumeroEnDivision = (segundoNumero) => {

        let bandera = false
        if(segundoNumero === 0){
            bandera = true;
        }

        return bandera;
    }

    const mostrarMensajeError = () =>{
        const $pantallaCalculadora = document.querySelector('#pantalla-calculadora');
        $pantallaCalculadora.textContent = "ERROR!!!";

        setTimeout(() => {
            $pantallaCalculadora.textContent = "0";
        }, 2000);
    }

    const obtenerOperacionARealizar = (primerNumero, segundoNumero, signo) => {

        let resultado = 0;
        //BUSCAR SI ANTERIORMENTE SE OLVIDO DECLARAR IGUAL A 0 UNA VARIABLE QUE TOMARA UN VALOR NUMERICO
        //CREO QUE SOLO BANDERAS
        switch (signo) {
            case '+':
                resultado = primerNumero + segundoNumero;
                break;
            
            case '-':
                resultado = primerNumero - segundoNumero;
                break;

            case '*':
                resultado = primerNumero * segundoNumero;
                break;

            case '/':
                if(!validacionSegundoNumeroEnDivision(segundoNumero)){
                    resultado = primerNumero / segundoNumero;
                }
                else{
                    // mostrarMensajeError();
                    resultado = 0;
                    banderaDivision = true;
                }
                break;
        
            default:
                break;

            }
        
            return resultado
    };

    const mostrarResultadoEnPantalla = (resultado) => {
        const $pantallaCalculadora = document.querySelector('#pantalla-calculadora');
        $pantallaCalculadora.textContent = `${resultado}`;
    }

    const realizarOperacion = () => {
        const textoPantalla = obtenerTextoPantalla();

        const signo = obtenerSignoOperacion(textoPantalla);
        const indiceDelSigno = obtenerIndiceDelSigno(signo, textoPantalla);
        const primerNumero = obtenerValorPrimerNumero(indiceDelSigno, textoPantalla);
        const segundoNumero = obtenerValorSegundoNumero(indiceDelSigno, textoPantalla);
        const resultado = obtenerOperacionARealizar(primerNumero, segundoNumero, signo);

        if(banderaDivision){
            mostrarMensajeError();
            banderaDivision = false;
        }
        else{
            mostrarResultadoEnPantalla(resultado);
        }
    };

    //Logica del codigo
    cargarLightModeLS();
    let banderaIgual = false;
    
    const $btncolorFondo = document.querySelector('.color-fondo');
    $btncolorFondo.addEventListener('click', cambiarColor);

    const $btnNumeros = document.querySelectorAll('.num');
    $btnNumeros.forEach((numerocliqueado) => {
        
        numerocliqueado.addEventListener('click', (e) => {
            const numero = obtenerNumeroCliqueado(e);
            anadirNumeroAPantalla(numero);
        });
    });

    const $btnBorrar = document.querySelector('#borrar');
    $btnBorrar.addEventListener('click', () => {
        const textoPantalla = obtenerTextoPantalla();
        eliminarUltimoCaracter(textoPantalla);
    })

    const $btnBorrarTodo = document.querySelector('#C');
    $btnBorrarTodo.addEventListener('click', () => {
        limpiarPantalla();
    });

    const $btnPunto = document.querySelector('#punto')
    $btnPunto.addEventListener('click', () => {

        const bandera = verificarSiExistePunto();
        if(!bandera){
            anadirNumeroAPantalla('.');
        }
    });

    const $btnDobleCero = document.querySelector('#doblecero');
    $btnDobleCero.addEventListener('click', () => {

        anadirNumeroAPantalla('00');
    });

    const $btnSignos = document.querySelectorAll('.signo')
    $btnSignos.forEach((signocliqueado) => {
        signocliqueado.addEventListener('click', (e) =>{
            const signo = obtenerNumeroCliqueado(e);
            
            const bandera1 = verificarSiExisteUnCaracter();
            const bandera2 = verificarSiExisteSigno();

            if(bandera1 && !bandera2){
                anadirNumeroAPantalla(signo);
                banderaIgual = true;
            }
        });
    });

    const $btnIgual = document.querySelector('#igual');
    $btnIgual.addEventListener('click', () => {

        const bandera = verificarUltimoCaracter();

        if(banderaIgual && !bandera){
            realizarOperacion();
            console.log('igual');
            banderaIgual = false;
        }
        
    });

});