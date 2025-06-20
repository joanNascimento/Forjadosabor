document.getElementById('saladaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const base = document.querySelector('input[name="base"]:checked');
    const proteina = document.querySelector('input[name="proteina"]:checked');
    const extras = [...document.querySelectorAll('input[name="extras"]:checked')];

    if (extras.length > 5) {
        alert("Você pode escolher no máximo 5 extras.");
        return;
    }

    const preco = extras.length <= 3 ? '45,00' :
        (proteina.value === 'Peixe' || proteina.value === 'Mignon') ? '65,00' : '55,00';

    const resumo = `
        Base: ${base?.value}<br>
        Proteína: ${proteina?.value}<br>
        Extras: ${extras.map(e => e.value).join(', ')}<br>
        Preço: R$ ${preco}
    `;
    document.getElementById('resumo').innerHTML = resumo;
});

// Limita a seleção de extras a 5
document.querySelectorAll('input[name="extras"]').forEach(cb => {
    cb.addEventListener('change', () => {
        const checked = document.querySelectorAll('input[name="extras"]:checked');
        if (checked.length > 5) {
            cb.checked = false;
            alert("Você só pode escolher até 5 extras.");
        }
    });
});
