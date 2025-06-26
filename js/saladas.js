document.addEventListener('DOMContentLoaded', () => {
    const saladaForm = document.getElementById('saladaForm');
    const formSteps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const resumoContent = document.getElementById('resumo-content');
    const btnWhatsapp = document.getElementById('btn-whatsapp');

    let currentStep = 0;
    let selectedPlan = null; // Para armazenar o plano selecionado (essencial, completo, premium)
    let maxExtras = 0; // Limite de extras com base no plano

    const proteinWarning = document.getElementById('protein-warning');
    const extrasWarning = document.getElementById('extras-warning');

    const baseSelect = document.getElementById('base');
    const proteinaSelect = document.getElementById('proteina');
    const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');
    const molhoRadios = document.querySelectorAll('input[name="molho"]');

    const clienteNomeInput = document.getElementById('cliente-nome');
    const clienteTelefoneInput = document.getElementById('cliente-telefone');
    const tipoEntregaSelect = document.getElementById('tipo-entrega');
    const horarioPreferidoInput = document.getElementById('horario-preferido');
    const observacoesInput = document.getElementById('observacoes');

    // Funções de validação e exibição de erro
    const showError = (elementId, message) => {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    };

    const hideError = (elementId) => {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    };

    // Função para mostrar o passo atual
    const showStep = (stepIndex) => {
        formSteps.forEach((step, index) => {
            step.classList.remove('active');
            if (index === stepIndex) {
                step.classList.add('active');
            }
        });
        stepIndicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === stepIndex) {
                indicator.classList.add('active');
            } else if (index < stepIndex) {
                indicator.classList.add('completed'); // Marca passos anteriores como completos
            } else {
                indicator.classList.remove('completed');
            }
        });
        updateResumo(); // Atualiza o resumo ao mudar de passo
    };

    // Event Listeners para botões de navegação
    document.querySelectorAll('.btn-next').forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    document.querySelectorAll('.btn-prev').forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // Validação dos passos
    const validateStep = (step) => {
        let isValid = true;
        hideError('base-error');
        hideError('proteina-error');
        hideError('molho-error');
        hideError('nome-error');
        hideError('telefone-error');
        proteinWarning.style.display = 'none'; // Esconde o aviso de proteína

        if (step === 0) { // Validação do Plano ou Salada Pronta
            const planoSelecionado = document.querySelector('input[name="plano"]:checked');
            const saladaProntaSelecionada = document.querySelector('input[name="ready-salad"]:checked');

            if (!planoSelecionado && !saladaProntaSelecionada) {
                alert('Por favor, escolha um plano ou uma salada pronta para continuar.');
                isValid = false;
            } else if (saladaProntaSelecionada) {
                // Se uma salada pronta for escolhida, desabilita os outros campos
                selectedPlan = 'pronta';
            } else if (planoSelecionado) {
                selectedPlan = planoSelecionado.value;
                maxExtras = parseInt(planoSelecionado.dataset.extras);
                // Reseta seleção de salada pronta se um plano for escolhido
                document.querySelectorAll('input[name="ready-salad"]').forEach(radio => radio.checked = false);
            }
            updateResumo(); // Atualiza o resumo imediatamente após a seleção do plano/salada
        } else if (step === 1) { // Validação de Base e Proteína
            if (selectedPlan !== 'pronta') { // Só valida se não for salada pronta
                if (!baseSelect.value) {
                    showError('base-error', 'Por favor, selecione uma base.');
                    isValid = false;
                }
                if (!proteinaSelect.value) {
                    showError('proteina-error', 'Por favor, selecione uma proteína.');
                    isValid = false;
                }

                const selectedProteinOption = proteinaSelect.options[proteinaSelect.selectedIndex];
                const isPremiumProtein = selectedProteinOption && selectedProteinOption.dataset.premium === 'true';

                if (isPremiumProtein && selectedPlan !== 'premium') {
                    proteinWarning.style.display = 'block';
                    isValid = false;
                }
            }
        } else if (step === 2) { // Validação de Extras e Molho
            if (selectedPlan !== 'pronta') { // Só valida se não for salada pronta
                const checkedExtras = document.querySelectorAll('input[name="extras"]:checked').length;
                if (checkedExtras > maxExtras) {
                    extrasWarning.style.display = 'block';
                    isValid = false;
                } else {
                    extrasWarning.style.display = 'none';
                }

                const molhoSelecionado = document.querySelector('input[name="molho"]:checked');
                if (!molhoSelecionado) {
                    showError('molho-error', 'Por favor, selecione um molho.');
                    isValid = false;
                }
            }
        } else if (step === 3) { // Validação de Dados do Cliente
            if (!clienteNomeInput.value.trim()) {
                showError('nome-error', 'Por favor, digite seu nome completo.');
                isValid = false;
            }
            if (!clienteTelefoneInput.value.trim()) {
                showError('telefone-error', 'Por favor, digite seu telefone (WhatsApp).');
                isValid = false;
            }
        }
        return isValid;
    };

    // Atualiza o resumo do pedido
    const updateResumo = () => {
        let resumoHtml = '';
        let total = 0;

        const saladaPronta = document.querySelector('input[name="ready-salad"]:checked');
        const plano = document.querySelector('input[name="plano"]:checked');

        if (saladaPronta) {
            const saladName = saladaPronta.dataset.name;
            const saladPrice = parseFloat(saladaPronta.dataset.price);
            resumoHtml += `<p class="resumo-item"><strong>Salada Pronta:</strong> ${saladName}</p>`;
            total = saladPrice;
        } else if (plano) {
            const planoNome = plano.nextElementSibling.querySelector('h3').textContent;
            const planoPreco = parseFloat(plano.dataset.price);
            resumoHtml += `<p class="resumo-item"><strong>Plano:</strong> ${planoNome}</p>`;
            total = planoPreco;

            if (baseSelect.value) {
                resumoHtml += `<p class="resumo-item"><strong>Base:</strong> ${baseSelect.value}</p>`;
            }
            if (proteinaSelect.value) {
                resumoHtml += `<p class="resumo-item"><strong>Proteína:</strong> ${proteinaSelect.value}</p>`;
            }

            const extrasSelecionados = Array.from(extrasCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            if (extrasSelecionados.length > 0) {
                resumoHtml += `<p class="resumo-item"><strong>Extras:</strong> ${extrasSelecionados.join(', ')}</p>`;
            } else {
                resumoHtml += `<p class="resumo-item"><strong>Extras:</strong> Nenhum selecionado</p>`;
            }

            const molhoSelecionado = document.querySelector('input[name="molho"]:checked');
            if (molhoSelecionado) {
                resumoHtml += `<p class="resumo-item"><strong>Molho:</strong> ${molhoSelecionado.value}</p>`;
            }
        } else {
            resumoHtml = '<p>Selecione um plano ou salada pronta para ver o resumo.</p>';
        }

        // Dados do Cliente (sempre exibidos se preenchidos)
        const clienteNome = clienteNomeInput.value.trim();
        const clienteTelefone = clienteTelefoneInput.value.trim();
        const tipoEntrega = tipoEntregaSelect.value;
        const horarioPreferido = horarioPreferidoInput.value.trim();
        const observacoes = observacoesInput.value.trim();

        if (clienteNome || clienteTelefone || horarioPreferido || observacoes) {
            resumoHtml += '<p class="resumo-item"><strong>Seus Dados:</strong></p>';
            if (clienteNome) resumoHtml += `<p class="resumo-subitem">Nome: ${clienteNome}</p>`;
            if (clienteTelefone) resumoHtml += `<p class="resumo-subitem">Telefone: ${clienteTelefone}</p>`;
            resumoHtml += `<p class="resumo-subitem">Entrega: ${tipoEntrega}</p>`;
            if (horarioPreferido) resumoHtml += `<p class="resumo-subitem">Horário: ${horarioPreferido}</p>`;
            if (observacoes) resumoHtml += `<p class="resumo-subitem">Observações: ${observacoes}</p>`;
        }


        resumoHtml += `<p id="resumo-total">Total: R$ ${total.toFixed(2).replace('.', ',')}</p>`;
        resumoContent.innerHTML = resumoHtml;
    };

    // Event Listeners para atualizar o resumo dinamicamente
    saladaForm.addEventListener('change', (event) => {
        // Ignora mudanças em campos de dados do cliente se não for o último passo
        if (currentStep < 3 && (event.target.id === 'cliente-nome' || event.target.id === 'cliente-telefone' || event.target.id === 'tipo-entrega' || event.target.id === 'horario-preferido' || event.target.id === 'observacoes')) {
            return;
        }

        // Verifica a seleção de plano ou salada pronta
        const planoRadio = document.querySelector('input[name="plano"]:checked');
        const readySaladRadio = document.querySelector('input[name="ready-salad"]:checked');

        if (event.target.name === 'plano') {
            // Se um plano foi selecionado, desmarque as saladas prontas
            document.querySelectorAll('input[name="ready-salad"]').forEach(radio => radio.checked = false);
            selectedPlan = planoRadio ? planoRadio.value : null;
            maxExtras = planoRadio ? parseInt(planoRadio.dataset.extras) : 0;
            // Re-valida extras ao mudar de plano
            validateExtrasCount();
            // Esconde avisos de proteína se o plano mudar para algo que não seja premium
            if (selectedPlan !== 'premium') {
                const selectedProteinOption = proteinaSelect.options[proteinaSelect.selectedIndex];
                if (selectedProteinOption && selectedProteinOption.dataset.premium === 'true') {
                    proteinWarning.style.display = 'block';
                } else {
                    proteinWarning.style.display = 'none';
                }
            } else {
                 proteinWarning.style.display = 'none';
            }
        } else if (event.target.name === 'ready-salad') {
            // Se uma salada pronta foi selecionada, desmarque os planos
            document.querySelectorAll('input[name="plano"]').forEach(radio => radio.checked = false);
            selectedPlan = readySaladRadio ? 'pronta' : null;
        }

        updateResumo(); // Atualiza o resumo
        
        // Esconde erros e avisos ao interagir com os campos
        if (event.target.id === 'base') hideError('base-error');
        if (event.target.id === 'proteina') hideError('proteina-error');
        if (event.target.name === 'molho') hideError('molho-error');
        if (event.target.id === 'cliente-nome') hideError('nome-error');
        if (event.target.id === 'cliente-telefone') hideError('telefone-error');
    });

    // Validação e controle de extras
    const validateExtrasCount = () => {
        const checkedExtras = document.querySelectorAll('input[name="extras"]:checked').length;
        if (selectedPlan === 'pronta') {
            // Se for salada pronta, desabilita e desmarca os extras
            extrasCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.disabled = true;
            });
            extrasWarning.style.display = 'none';
            return;
        } else {
            // Reabilita extras se não for salada pronta
            extrasCheckboxes.forEach(checkbox => {
                checkbox.disabled = false;
            });
        }

        if (selectedPlan === 'premium') {
            extrasWarning.style.display = 'none'; // Sem limite no plano premium
        } else if (checkedExtras > maxExtras) {
            extrasWarning.textContent = `Limite de ${maxExtras} extras atingido para este plano. Por favor, desmarque alguns.`;
            extrasWarning.style.display = 'block';
            // Desabilitar os extras restantes que não foram marcados
            extrasCheckboxes.forEach(checkbox => {
                if (!checkbox.checked) {
                    checkbox.disabled = true;
                }
            });
        } else {
            extrasWarning.style.display = 'none';
            // Reabilita todos os extras para que possam ser marcados novamente
            extrasCheckboxes.forEach(checkbox => {
                checkbox.disabled = false
