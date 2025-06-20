# Site Forja do Sabor - Documentação Completa

## 📁 Estrutura do Projeto

```
Forjadosabor/
├── index.html                 # Página inicial com banner rotativo
├── saladas.html              # Página Monte sua Salada (formulário interativo)
├── gourmet.html              # Página Tábuas & Combos Gourmet
├── manicoba.html             # Página Maniçoba da Forja
├── quem-somos.html           # Página institucional
├── como-pedir.html           # Instruções de pedido
├── css/
│   ├── style.css             # Estilos principais e responsivos
│   ├── saladas.css           # Estilos específicos para saladas
│   ├── gourmet.css           # Estilos específicos para gourmet
│   ├── manicoba.css          # Estilos específicos para maniçoba
│   ├── quem-somos.css        # Estilos específicos para quem somos
│   └── como-pedir.css        # Estilos específicos para como pedir
├── js/
│   ├── script.js             # JavaScript principal (menu, carrossel)
│   └── saladas.js            # JavaScript para formulário de saladas
└── assets/
    ├── imagens/
    │   ├── banner-salada.jpg     # Banner para saladas
    │   ├── banner-tabua.jpg      # Banner para tábuas gourmet
    │   └── banner-manicoba.jpg   # Banner para maniçoba
    └── icones/
        └── whatsapp-icon.png     # Ícone do WhatsApp
```

## 🎨 Identidade Visual por Categoria

### Cores Definidas (CSS Variables)
- **Saladas**: Verde claro (#81C784), Verde escuro (#2E7D32), Laranja (#FF9800)
- **Gourmet**: Vinho (#800020), Marrom madeira (#8B4513), Dourado suave (#DAA520)
- **Maniçoba**: Verde terroso (#556B2F), tons terrosos
- **Quem Somos**: Neutros com vermelho gourmet (#B22222)
- **Como Pedir**: Verde claro e laranja

## 🌐 Páginas Implementadas

### 1. index.html - Página Inicial
- **Banner rotativo** com 3 imagens (saladas, tábuas, maniçoba)
- **Navegação automática** a cada 5 segundos
- **Botões de acesso rápido** para cada categoria
- **Design responsivo** com cores neutras

### 2. saladas.html - Monte sua Salada
- **Formulário interativo** com validação em tempo real
- **Seleção obrigatória**: Base e Proteína
- **Extras limitados**: Até 3, 5 ou 5 conforme o plano
- **3 Planos disponíveis**:
  - Essencial (até 3 extras) - R$ 45
  - Completo (até 5 extras) - R$ 55
  - Premium (proteína nobre) - R$ 65
- **Cálculo automático** do preço total
- **Integração WhatsApp** com mensagem formatada

### 3. gourmet.html - Tábuas & Combos Gourmet
- **Tábuas de Frios**: Brasa Suave (R$ 39,90), Forja Clássica (R$ 69,90), Fogo Nobre (R$ 119,90), Banquete do Ferreiro (R$ 189,90)
- **Barcas Forja do Sabor**: P (R$ 80), M (R$ 130), G (R$ 180)
- **Combos Especiais**: Casal, Amigos, Amor em Tábuas, Noite de Vinhos
- **Design em tons de vinho e madeira**

### 4. manicoba.html - Maniçoba da Forja
- **Potes Individuais**: 250ml (R$ 20), 500ml (R$ 35), 1L (R$ 65)
- **Combos**: Forjinha (R$ 39,90), Forja Dupla (R$ 74,90), Família (R$ 130), Degustação (R$ 55)
- **Sucos Extras**: Cupuaçu (R$ 10), Bacuri (R$ 12)
- **Design em tons terrosos**

### 5. quem-somos.html - Sobre a Marca
- **Texto institucional** completo
- **Missão, valores e compromisso**
- **Design neutro com detalhes em vermelho gourmet**

### 6. como-pedir.html - Instruções de Pedido
- **Passo a passo** visual para fazer pedidos
- **Informações importantes**: Horários (10h-23h), prazos (24h para tábuas grandes), taxa de entrega (a partir de R$ 4,00)
- **Botão direto para WhatsApp**

## ⚙️ Funcionalidades JavaScript

### script.js - Funcionalidades Gerais
- **Menu responsivo** para dispositivos móveis
- **Carrossel automático** na página inicial
- **Navegação por botões** no carrossel

### saladas.js - Formulário de Saladas
- **Validação em tempo real** de base e proteína
- **Controle de extras** conforme o plano selecionado
- **Cálculo automático** do preço total
- **Desabilitação de extras** quando limite atingido
- **Geração automática** de mensagem para WhatsApp
- **Formatação completa** do pedido

## 📱 Responsividade

### Breakpoints Implementados
- **Desktop**: > 992px
- **Tablet**: 768px - 992px
- **Mobile**: < 768px
- **Mobile pequeno**: < 480px

### Adaptações Responsivas
- **Menu hamburger** em dispositivos móveis
- **Grid adaptativo** para produtos
- **Formulários otimizados** para touch
- **Botões maiores** em mobile
- **Carrossel adaptado** para diferentes tamanhos

## 🔗 Integração WhatsApp

### Número Configurado
- **(91) 98514-8050**

### Funcionalidades
- **Botão flutuante** em todas as páginas
- **Mensagem formatada** automática para saladas
- **Links diretos** nas outras páginas

### Formato da Mensagem (Saladas)
```
Olá, Forja do Sabor! Gostaria de pedir uma salada personalizada:

*Base:* [Seleção do usuário]
*Proteína:* [Seleção do usuário]
*Extras:* [Lista de extras ou "Nenhum"]
*Plano:* [Plano selecionado]
*Total:* R$ [Valor calculado]

Aguardando a confirmação!
```

## 🎯 Recursos Implementados

### ✅ Concluído
- [x] 6 páginas HTML completas
- [x] CSS responsivo com identidade visual por categoria
- [x] JavaScript funcional para todas as interações
- [x] Formulário de saladas com validação completa
- [x] Integração WhatsApp
- [x] Menu de navegação responsivo
- [x] Carrossel de banners
- [x] Imagens geradas para banners e ícones
- [x] Estrutura pronta para GitHub Pages

### 📋 Especificações Atendidas
- [x] HTML, CSS e JavaScript puro (sem frameworks)
- [x] Site 100% responsivo
- [x] Páginas interligadas por menu fixo
- [x] Identidade visual segmentada por categoria
- [x] Botão flutuante WhatsApp em todas as páginas
- [x] Layout limpo com blocos e estilo rústico refinado
- [x] Cálculo dinâmico de preços
- [x] Estrutura organizada em pastas

## 🚀 Como Usar

### Para Testar Localmente
1. Abra o arquivo `index.html` em um navegador
2. Navegue pelas páginas usando o menu
3. Teste o formulário de saladas
4. Verifique a responsividade redimensionando a janela

### Para Publicar no GitHub Pages
1. Faça upload de toda a pasta `Forjadosabor` para um repositório GitHub
2. Ative o GitHub Pages nas configurações do repositório
3. Selecione a branch principal como fonte
4. O site estará disponível em `https://[usuario].github.io/[repositorio]`

### Para Editar Conteúdo
- **Preços**: Edite os arquivos HTML correspondentes
- **Textos**: Modifique diretamente nos arquivos HTML
- **Imagens**: Substitua os arquivos na pasta `assets/imagens/`
- **Cores**: Ajuste as variáveis CSS no arquivo `css/style.css`
- **WhatsApp**: Altere o número nos links `wa.me/5591985148050`

## 📞 Contato Configurado
- **WhatsApp**: (91) 98514-8050
- **Instagram**: @forja.do.sabor (mencionado no código)
- **Localização**: Belém, Pará

---

**Site 100% funcional e pronto para uso!** 🎉

