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
    componentMap: widget.components ? Object.fromEntries(
      Object.entries(widget.components).map(([size, componentName]) => [
        size,
        widgetComponents[componentName]
      ])
    ) : {}
  })));

  const activeWidgets = shallowRef([]);

  const availableWidgets = computed(() => {
    return widgets.value.filter(widget => widget.status === 'available');
  });

  const addWidget = (widget) => {
    const newWidget = { 
      ...widget, 
      position: findAvailablePosition(widget.size),
      component: widget.componentMap[widget.size]
    };
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

  const findAvailablePosition = (size) => {
    const [width, height] = size.split('x').map(Number);
    for (let row = 1; row <= 4; row++) {
      for (let col = 1; col <= 3; col++) {
        if (isPositionAvailable(row, col, width, height)) {
          return { row, col };
        }
      }
    }
    return null;
  };

  const isPositionAvailable = (row, col, width, height) => {
    return !activeWidgets.value.some(widget => {
      const [w, h] = widget.size.split('x').map(Number);
      return (
        row < widget.position.row + h &&
        row + height > widget.position.row &&
        col < widget.position.col + w &&
        col + width > widget.position.col
      );
    });
  };

  const saveToLocalStorage = () => {
    const dataToSave = activeWidgets.value.map(widget => ({
      id: widget.id,
      size: widget.size,
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
        if (widget && widget.componentMap[savedWidget.size]) {
          return {
            ...widget,
            size: savedWidget.size,
            position: savedWidget.position,
            component: widget.componentMap[savedWidget.size]
          };
        }
        return null;
      }).filter(Boolean);
    }
  };

  const resizeWidget = (widgetId, newSize) => {
    const widgetIndex = activeWidgets.value.findIndex(w => w.id === widgetId);
    if (widgetIndex !== -1) {
      const widget = activeWidgets.value[widgetIndex];
      const newPosition = findAvailablePosition(newSize);
      if (newPosition) {
        const updatedWidget = {
          ...widget,
          size: newSize,
          position: newPosition,
          component: widget.componentMap[newSize]
        };
        activeWidgets.value.splice(widgetIndex, 1, updatedWidget);
        saveToLocalStorage();
      }
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
    resizeWidget,
    initWidgets
  };
}