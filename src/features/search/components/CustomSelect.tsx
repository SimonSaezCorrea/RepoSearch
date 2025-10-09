import React, { useEffect, useRef, useState } from 'react';
import type { MultiValue, SingleValue, StylesConfig } from 'react-select';
import Select from 'react-select';

import '../styles/CustomSelect.css';
import type { CustomSelectProps, SelectOption } from '../types/search';

/**
 * Componente Select personalizado usando React Select
 * Con estilos que coinciden con el tema de la aplicación
 */
const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Seleccionar...',
  isMulti = false,
  isDisabled = false,
  className = '',
  menuPlacement = 'auto',
  maxMenuHeight = 150, // Altura más pequeña por defecto
  isCompact = false,
  smartPlacement = false
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [dynamicMenuPlacement, setDynamicMenuPlacement] = useState<'auto' | 'bottom' | 'top'>(menuPlacement);

  // Función para calcular la colocación inteligente del menú
  const calculateSmartPlacement = () => {
    if (!smartPlacement || !selectRef.current) return menuPlacement;

    const rect = selectRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const estimatedMenuHeight = Math.min(maxMenuHeight, options.length * 40 + 20); // Estimación de altura del menú

    // Si hay suficiente espacio abajo, usar 'bottom'
    if (spaceBelow >= estimatedMenuHeight) {
      return 'bottom';
    }
    
    // Si hay más espacio arriba que abajo, usar 'top'
    if (spaceAbove > spaceBelow) {
      return 'top';
    }
    
    // Por defecto, usar 'auto' para que react-select decida
    return 'auto';
  };

  // Actualizar la colocación cuando el componente se monta o cambia
  useEffect(() => {
    if (smartPlacement) {
      const newPlacement = calculateSmartPlacement();
      setDynamicMenuPlacement(newPlacement);
    }
  }, [smartPlacement, options.length, maxMenuHeight]);

  // Recalcular en resize de ventana
  useEffect(() => {
    if (!smartPlacement) return;

    const handleResize = () => {
      const newPlacement = calculateSmartPlacement();
      setDynamicMenuPlacement(newPlacement);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [smartPlacement]);

  // Cerrar dropdown cuando se hace scroll en el área de cards
  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      // Si el scroll es en el área de cards, cerrar el dropdown
      if (target && target.closest('.scrollable-card-area-content')) {
        // Solo cerrar si el dropdown está abierto
        const selectElement = selectRef.current?.querySelector('.custom-select__control--menu-is-open');
        if (selectElement) {
          (selectElement as HTMLElement).blur();
        }
      }
    };

    // Escuchar scroll en el área de cards específicamente
    const cardArea = document.querySelector('.scrollable-card-area-content');
    if (cardArea) {
      cardArea.addEventListener('scroll', handleScroll, { passive: true });
      return () => cardArea.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // Configuración de estilos personalizada
  const customStyles: StylesConfig<SelectOption, boolean> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--color-bg-primary)',
      borderColor: state.isFocused 
        ? 'var(--color-primary)' 
        : 'var(--color-border-primary)',
      borderRadius: 'var(--radius-lg)',
      borderWidth: '1px',
      boxShadow: state.isFocused 
        ? '0 0 0 3px rgba(59, 130, 246, 0.1)' 
        : 'none',
      minHeight: isCompact ? '36px' : '44px', // Altura más pequeña en modo compacto
      padding: isCompact ? '0 var(--spacing-xs)' : '0 var(--spacing-sm)',
      fontSize: '0.875rem',
      fontFamily: 'inherit',
      color: 'var(--color-text-primary)',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: state.isFocused 
          ? 'var(--color-primary)' 
          : 'var(--color-border-secondary)'
      }
    }),
    
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--color-bg-primary)',
      border: '1px solid var(--color-border-primary)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      zIndex: 99999, // Z-index muy alto para evitar superposiciones
      overflow: 'hidden',
      position: 'absolute', // Asegurar posicionamiento absoluto
      width: '100%',
      minWidth: '100%'
    }),
    
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      maxHeight: `${maxMenuHeight}px`, // Usar altura configurable
      overflowY: 'auto'
    }),
    
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? 'var(--color-primary)'
        : state.isFocused
        ? 'var(--color-bg-secondary)'
        : 'transparent',
      color: state.isSelected
        ? 'white'
        : 'var(--color-text-primary)',
      padding: 'var(--spacing-md) var(--spacing-lg)',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: state.isSelected
          ? 'var(--color-primary)'
          : 'var(--color-bg-secondary)'
      }
    }),
    
    placeholder: (provided) => ({
      ...provided,
      color: 'var(--color-text-tertiary)',
      fontSize: '0.875rem'
    }),
    
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--color-text-primary)',
      fontSize: '0.875rem'
    }),
    
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--color-primary)',
      borderRadius: 'var(--radius-md)',
      margin: '2px'
    }),
    
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
      fontSize: '0.75rem',
      padding: '2px 6px'
    }),
    
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white'
      }
    }),
    
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'var(--color-text-secondary)',
      padding: 'var(--spacing-sm)',
      '&:hover': {
        color: 'var(--color-text-primary)'
      }
    }),
    
    clearIndicator: (provided) => ({
      ...provided,
      color: 'var(--color-text-secondary)',
      padding: 'var(--spacing-sm)',
      '&:hover': {
        color: 'var(--color-text-primary)'
      }
    })
  };

  // Convertir valor(es) a formato de React Select
  const getSelectValue = () => {
    if (!value) return null;
    
    if (isMulti) {
      const values = Array.isArray(value) ? value : [value];
      return options.filter(option => values.includes(option.value));
    } else {
      return options.find(option => option.value === value) || null;
    }
  };

  // Manejar cambios de selección
  const handleChange = (
    selectedOption: SingleValue<SelectOption> | MultiValue<SelectOption>
  ) => {
    if (isMulti) {
      const multiSelection = selectedOption as MultiValue<SelectOption>;
      const values = multiSelection ? multiSelection.map(opt => opt.value) : [];
      onChange(values);
    } else {
      const singleSelection = selectedOption as SingleValue<SelectOption>;
      onChange(singleSelection ? singleSelection.value : null);
    }
  };

  return (
    <div ref={selectRef} className={`custom-select-wrapper ${className}`}>
      <Select<SelectOption, boolean>
        options={options}
        value={getSelectValue()}
        onChange={handleChange}
        placeholder={placeholder}
        isMulti={isMulti}
        isDisabled={isDisabled}
        styles={customStyles}
        menuPlacement={smartPlacement ? dynamicMenuPlacement : menuPlacement}
        menuPosition="absolute" // Forzar posición absoluta
        menuShouldBlockScroll={false} // No bloquear scroll del contenedor padre
        menuPortalTarget={document.body} // Renderizar en el body para evitar z-index issues
        classNamePrefix="custom-select"
        isClearable={false}
        isSearchable={false}
        closeMenuOnScroll={false} // Temporalmente deshabilitado para debug
        closeMenuOnSelect={true} // Cerrar al seleccionar una opción
        blurInputOnSelect={true} // Quitar foco al seleccionar
        formatOptionLabel={(option) => (
          <div className="custom-select-option">
            {option.icon && <span className="custom-select-icon">{option.icon}</span>}
            <span className="custom-select-label">{option.label}</span>
          </div>
        )}
      />
    </div>
  );
};

export default CustomSelect;