import { ref, computed, markRaw, shallowRef } from 'vue';
import widgetsData from '@/assets/data/widgets.json';

// Chargement dynamique des composants de widget avec webpack
const requireWidget = require.context('@/components/widgets', true, /\.vue$/);
const widgetComponents = {};
requireWidget.keys().forEach(fileName => {
  const componentConfig = requireWidget(fileName);
  const componentName = fileName.split('/').pop().replace(/\.\w+$/, '');
  widgetComponents[componentName] = markRaw(componentConfig.default || componentConfig);
});

export function useWidgets() {
  const widgets = shallowRef(widgetsData.widgets.map(widget => ({
    ...widget,
    component: widget.component ? widgetComponents[widget.component] : null
  })));

  const activeWidgets = shallowRef([]);

  const availableWidgets = computed(() => {
    return widgets.value.filter(widget => widget.status === 'available');
  });

  const addWidget = (widget) => {
    const newWidget = { 
      ...widget, 
      position: findAvailablePosition(),
    };
    console.log("Adding widget:", newWidget);  // Debug log
    activeWidgets.value = [...activeWidgets.value, newWidget];
    saveToLocalStorage();
  };

  const updateWidgetPosition = (updatedWidgets) => {
    activeWidgets.value = updatedWidgets;
    saveToLocalStorage();
  };

  const removeWidget = (widgetId) => {
    activeWidgets.value = activeWidgets.value.filter(widget => widget.id !== widgetId);
    saveToLocalStorage();
  };

  const findAvailablePosition = () => {
    const occupiedPositions = activeWidgets.value.map(widget => widget.position);
    let newPosition = 1;
    while (occupiedPositions.includes(newPosition)) {
      newPosition++;
    }
    return newPosition;
  };

  const saveToLocalStorage = () => {
    const dataToSave = activeWidgets.value.map(widget => ({
      id: widget.id,
      position: widget.position
    }));
    localStorage.setItem('activeWidgets', JSON.stringify(dataToSave));
  };

  const loadFromLocalStorage = () => {
    const savedWidgets = localStorage.getItem('activeWidgets');
    if (savedWidgets) {
      const parsedWidgets = JSON.parse(savedWidgets);
      activeWidgets.value = parsedWidgets.map((savedWidget) => {
        const widget = widgets.value.find(w => w.id === savedWidget.id);
        if (widget) {
          return {
            ...widget,
            position: savedWidget.position,
          };
        }
        return null;
      }).filter(Boolean);
    }
  };

  const initWidgets = () => {
    loadFromLocalStorage();
  };

  return {
    widgets,
    activeWidgets,
    availableWidgets,
    addWidget,
    updateWidgetPosition,
    removeWidget,
    initWidgets
  };
}