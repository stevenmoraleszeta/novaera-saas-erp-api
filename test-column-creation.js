const pool = require('./src/config/db');
const columnsService = require('./src/services/columnsService');

async function testColumnCreation() {
  try {
    console.log('Testing column creation...');
    
    // Test con datos de columna
    const testColumnData = {
      table_id: 1,
      name: 'test_column_' + Date.now(),
      data_type: 'select',
      is_required: false,
      is_foreign_key: false,
      foreign_table_id: null,
      foreign_column_name: null,
      column_position: 0,
      relation_type: null,
      validations: null
    };
    
    console.log('Creating column with data:', testColumnData);
    
    const result = await columnsService.createColumn(testColumnData);
    console.log('Column creation result:', result);
    console.log('Column ID:', result.column_id);
    
  } catch (error) {
    console.error('Error in test:', error);
  } finally {
    process.exit(0);
  }
}

testColumnCreation();
