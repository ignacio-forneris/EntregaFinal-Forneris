async function obtenerTasasDeCambio() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error('Error al obtener tasas de cambio:', error);
        return null;
    }
}

async function calcular() {
    const miMoneda = document.getElementById('moneda-entrada').value;
    const cantidad = parseFloat(document.getElementById('monto').value);
    const monedaNecesito = document.getElementById('moneda-salida').value;

    const tasasDeCambio = await obtenerTasasDeCambio();

    if (!tasasDeCambio) {
        alert('Error al obtener tasas de cambio. Por favor, inténtalo de nuevo más tarde.');
        return;
    }

    const tasaMiMoneda = tasasDeCambio[miMoneda];
    const tasaMonedaNecesito = tasasDeCambio[monedaNecesito];

    if (tasaMiMoneda && tasaMonedaNecesito) {
        const montoConvertido = (cantidad / tasaMiMoneda) * tasaMonedaNecesito;
        mostrarResultado(montoConvertido.toFixed(2), monedaNecesito);
        Swal.fire({
            title: "Conversion exitosa",
            text: `Has obtenido ${montoConvertido.toFixed(2)} ${monedaNecesito}` ,
            icon: "success"
          });
    } else {
        alert('Monedas no válidas. Por favor, selecciona monedas válidas.');
    }
}

function mostrarResultado(resultado, monedaNecesito) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `El monto final es ${resultado} ${monedaNecesito}`;
}

async function cargarTasasDeCambio() {
    const tasasDeCambio = await obtenerTasasDeCambio();

    if (tasasDeCambio) {
        console.log('Tasas de cambio cargadas con éxito:', tasasDeCambio);
    } else {
        console.error('Error al cargar tasas de cambio.');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await cargarTasasDeCambio();
});
