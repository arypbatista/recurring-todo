export type Locale = "en" | "es" | "pt";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // App
    appTitle: "Recurring TO-DOs",
    appSubtitle: "Keep track of what matters, month by month",
    import: "Import",
    addTask: "Add Recurring Task",
    loading: "Loading...",

    // List sections
    pending: "Pending",
    completed: "Completed",
    allCaughtUp: "All caught up!",
    nothingPending: "Nothing pending right now",

    // Item
    overdue: "Overdue",
    due: "Due",

    // Summary
    inbound: "Inbound",
    outbound: "Outbound",

    // Month nav
    backToCurrentMonth: "Back to current month",

    // Add/Edit dialog
    editTask: "✏️ Edit Task",
    newTask: "✨ New Task",
    titleLabel: "Title",
    titlePlaceholder: "e.g., Rent, Internet",
    categoryLabel: "Category (Optional)",
    categoryPlaceholder: "e.g., Housing, Utilities",
    dueDayLabel: "Due Day (1-31, Optional)",
    dueDayPlaceholder: "e.g., 5",
    amountLabel: "Amount (Optional)",
    amountPlaceholder: "e.g., 50.00",
    directionLabel: "Direction",
    outboundExpense: "Outbound (Expense)",
    inboundIncome: "Inbound (Income)",
    activeLabel: "Active (generates monthly occurrences)",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    addTaskButton: "Add Task",
    required: "*",

    // Bulk import dialog
    bulkImportTitle: "📋 Bulk Import",
    bulkImportDesc: "Paste a list of tasks. Format:",
    bulkImportFormat: "- Task Name (30/mes)",
    bulkImportPlaceholder: "- Common Expenses (30/mes)\n- Property Tax (30/mes)\n- Internet",
    previewTitle: "Preview ({count} items to add):",
    noMatchingItems: "No matching items found.",
    importNItems: "Import {count} Items",
    day: "Day",
    privacyNote: "Your data is stored locally in your browser. Nothing is uploaded to the cloud.",
  },
  es: {
    appTitle: "Tareas Recurrentes",
    appSubtitle: "Lleva el control de lo importante, mes a mes",
    import: "Importar",
    addTask: "Agregar tarea recurrente",
    loading: "Cargando...",

    pending: "Pendientes",
    completed: "Completados",
    allCaughtUp: "¡Todo al día!",
    nothingPending: "Nada pendiente por ahora",

    overdue: "Vencido",
    due: "Vence",

    inbound: "Ingreso",
    outbound: "Egreso",

    backToCurrentMonth: "Volver al mes actual",

    editTask: "✏️ Editar Tarea",
    newTask: "✨ Nueva Tarea",
    titleLabel: "Título",
    titlePlaceholder: "ej., Alquiler, Internet",
    categoryLabel: "Categoría (Opcional)",
    categoryPlaceholder: "ej., Vivienda, Servicios",
    dueDayLabel: "Día de vencimiento (1-31, Opcional)",
    dueDayPlaceholder: "ej., 5",
    amountLabel: "Monto (Opcional)",
    amountPlaceholder: "ej., 50.00",
    directionLabel: "Dirección",
    outboundExpense: "Egreso (Gasto)",
    inboundIncome: "Ingreso (Cobro)",
    activeLabel: "Activa (genera ocurrencias mensuales)",
    cancel: "Cancelar",
    saveChanges: "Guardar Cambios",
    addTaskButton: "Agregar Tarea",
    required: "*",

    bulkImportTitle: "📋 Importar en Lote",
    bulkImportDesc: "Pega una lista de tareas. Formato:",
    bulkImportFormat: "- Nombre de Tarea (30/mes)",
    bulkImportPlaceholder: "- Gastos Comunes (30/mes)\n- Tributos domiciliarios (30/mes)\n- Internet",
    previewTitle: "Vista previa ({count} elementos a agregar):",
    noMatchingItems: "No se encontraron elementos.",
    importNItems: "Importar {count} Elementos",
    day: "Día",
    privacyNote: "Tus datos se almacenan localmente en tu navegador. Nada se sube a la nube.",
  },
  pt: {
    appTitle: "Tarefas Recorrentes",
    appSubtitle: "Acompanhe o que importa, mês a mês",
    import: "Importar",
    addTask: "Adicionar tarefa recorrente",
    loading: "Carregando...",

    pending: "Pendentes",
    completed: "Concluídos",
    allCaughtUp: "Tudo em dia!",
    nothingPending: "Nada pendente no momento",

    overdue: "Atrasado",
    due: "Vence",

    inbound: "Entrada",
    outbound: "Saída",

    backToCurrentMonth: "Voltar ao mês atual",

    editTask: "✏️ Editar Tarefa",
    newTask: "✨ Nova Tarefa",
    titleLabel: "Título",
    titlePlaceholder: "ex., Aluguel, Internet",
    categoryLabel: "Categoria (Opcional)",
    categoryPlaceholder: "ex., Moradia, Serviços",
    dueDayLabel: "Dia do vencimento (1-31, Opcional)",
    dueDayPlaceholder: "ex., 5",
    amountLabel: "Valor (Opcional)",
    amountPlaceholder: "ex., 50.00",
    directionLabel: "Direção",
    outboundExpense: "Saída (Despesa)",
    inboundIncome: "Entrada (Receita)",
    activeLabel: "Ativa (gera ocorrências mensais)",
    cancel: "Cancelar",
    saveChanges: "Salvar Alterações",
    addTaskButton: "Adicionar Tarefa",
    required: "*",

    bulkImportTitle: "📋 Importar em Lote",
    bulkImportDesc: "Cole uma lista de tarefas. Formato:",
    bulkImportFormat: "- Nome da Tarefa (30/mes)",
    bulkImportPlaceholder: "- Despesas Comuns (30/mes)\n- Tributos (30/mes)\n- Internet",
    previewTitle: "Pré-visualização ({count} itens a adicionar):",
    noMatchingItems: "Nenhum item encontrado.",
    importNItems: "Importar {count} Itens",
    day: "Dia",
    privacyNote: "Seus dados são armazenados localmente no seu navegador. Nada é enviado para a nuvem.",
  },
};

type TranslationKey = keyof typeof translations.en;

export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("es")) return "es";
  if (lang.startsWith("pt")) return "pt";
  return "en";
}

export function t(key: string, locale: Locale, params?: Record<string, string | number>): string {
  let value = translations[locale]?.[key] ?? translations.en[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(`{${k}}`, String(v));
    }
  }
  return value;
}

export type { TranslationKey };

export { translations };
