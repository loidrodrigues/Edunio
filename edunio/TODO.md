# TODO - Simplificar Sistema de Solicitação de Aulas

## Objetivo

Substituir o LessonRequestForm complexo por um campo de texto simples (SMS) e botão "Solicitar Aula", fazendo com que as solicitações apareçam no dashboard do mentor.

## Passos a Executar

### 1. Modificar MentorDetail (app/mentor/[id]/page.tsx)

- [x] Remover import do LessonRequestForm
- [x] Remover estado showRequestForm
- [x] Substituir o componente LessonRequestForm por:
  - Campo de texto para mensagem/SMS
  - Botão "Solicitar Aula"
  - Estados para loading, error e success
- [x] Implementar função handleSubmit para enviar solicitação

### 2. Atualizar Modelo LessonRequest (models/LessonRequest.ts)

- [x] Tornar campos subject e dateTime opcionais
- [x] Manter message como campo principal

### 3. Modificar API (app/api/lesson-requests/route.ts)

- [x] Remover validação obrigatória de subject e dateTime
- [x] Aceitar apenas message no POST
- [x] Usar valores padrão ou null para campos opcionais

### 4. Simplificar SolicitationCard (app/components/SolicitationCard.tsx)

- [x] Remover exibição de subject, dateTime
- [x] Mostrar apenas studentName, studentEmail e message
- [x] Ajustar layout para ser mais compacto

### 5. Atualizar Dashboard (app/mentor/dashboard/page.tsx)

- [x] Ajustar interface Solicitation se necessário
- [x] Verificar se a exibição funciona corretamente

### 6. Corrigir Problema de Autenticação

- [x] Identificar que o campo isMentor não estava sendo capturado pelo hook useAuth
- [x] Atualizar interface User para incluir campo isMentor
- [x] Modificar hook useAuth para extrair isMentor do token
- [x] Adicionar logs de debug para identificar problema na condição
- [x] Corrigir condição de exibição do botão para user.isMentor === false
- [x] Remover logs de debug após correção

### 7. Testar Fluxo Completo

- [x] Testar criação de solicitação no MentorDetail
- [x] Verificar se aparece no dashboard do mentor
- [x] Testar aceitar/recusar solicitações

### 8. Sistema Funcional - Pronto para Uso

- [x] API de criação de solicitações funcionando
- [x] API de listagem de solicitações funcionando
- [x] Interface simplificada implementada
- [x] Autenticação corrigida
- [x] Banco de dados conectado e operacional
