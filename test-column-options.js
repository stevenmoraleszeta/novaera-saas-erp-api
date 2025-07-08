const pool = require('./src/config/db');
const columnOptionsService = require('./src/services/columnOptionsService');

async function testColumnOptions() {
  try {
    console.log('Testing column options creation...');
    
    // Test con datos simples
    const testOptions = ['Opción 1', 'Opción 2', 'Opción 3'];
    const testColumnId = 1; // Usar un ID de columna que exista
    
    console.log('Creating options for column ID:', testColumnId);
    console.log('Options:', testOptions);
    
    await columnOptionsService.createColumnOptions(testColumnId, testOptions);
    console.log('Options created successfully');
    
    // Verificar que se guardaron
    const savedOptions = await columnOptionsService.getColumnOptions(testColumnId);
    console.log('Saved options:', savedOptions);
    
  } catch (error) {
    console.error('Error in test:', error);
  } finally {
    process.exit(0);
  }
}

testColumnOptions();
