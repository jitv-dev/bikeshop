document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('tbody tr').forEach(tableRow => {
        const cantidadInput = tableRow.querySelector('.cantidad')
        const precio = parseFloat(tableRow.querySelector('.precio').dataset.precio)
        const subtotal = tableRow.querySelector('.subtotal')

        function actualizarSubtotal() {
            const cantidad = parseInt(cantidadInput.value) || 1
            subtotal.textContent = `$${(precio * cantidad).toFixed(2)}`
        }

        cantidadInput.addEventListener('input', actualizarSubtotal)
        actualizarSubtotal()
    })
})

