const pool = require('./src/config/db');
const columnsService = require('./src/services/columnsService');
const columnOptionsService = require('./src/services/columnOptionsService');

async function testCompleteFlow() {
  try {
    console.log('Testing complete column creation flow...');
    
    // Test con datos de columna
    const testColumnData = {
      table_id: 1,
      name: 'test_select_column_' + Date.now(),
      data_type: 'select',
      is_required: false,
      is_foreign_key: false,
      foreign_table_id: null,
      foreign_column_name: null,
      column_position: 0,
      relation_type: null,
      validations: null
    };
    
    const customOptions = ['Opción A', 'Opción B', 'Opción C'];
    
    console.log('Creating column with data:', testColumnData);
    console.log('Custom options:', customOptions);
    
    // Crear la columna
    const result = await columnsService.createColumn(testColumnData);
    console.log('Column creation result:', result);
    
    const newColumnId = result.column_id;
    console.log('New column ID:', newColumnId);
    
    // Verificar si es tipo select y tiene opciones
    if (testColumnData.data_type === 'select' && customOptions && Array.isArray(customOptions) && customOptions.length > 0) {
      console.log('Processing custom options for select column');
      
      if (newColumnId) {
        console.log('Creating custom options for column ID:', newColumnId);
        // Crear las opciones personalizadas
        await columnOptionsService.createColumnOptions(newColumnId, customOptions);
        console.log('Custom options created successfully');
        
        // Verificar que se guardaron
        const savedOptions = await columnOptionsService.getColumnOptions(newColumnId);
        console.log('Saved options:', savedOptions);
      } else {
        console.log('Error: Could not get newly created column ID');
      }
    }
    
  } catch (error) {
    console.error('Error in test:', error);
  } finally {
    process.exit(0);
  }
}

testCompleteFlow();
