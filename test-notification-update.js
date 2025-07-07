const pool = require('./src/config/db');
const scheduledNotificationsService = require('./src/services/scheduledNotificationsService');

async function testNotificationOnUpdate() {
  console.log('🔄 Iniciando prueba de notificaciones por actualización...');
  
  try {
    // Primero, verificar qué datos existen
    console.log('0. Verificando datos existentes...');
    
    // Obtener una tabla existente
    const tablesResult = await pool.query('SELECT id, name FROM tables LIMIT 1');
    if (tablesResult.rows.length === 0) {
      throw new Error('No hay tablas en la base de datos');
    }
    const tableId = tablesResult.rows[0].id;
    const tableName = tablesResult.rows[0].name;
    console.log(`   Tabla encontrada: ${tableName} (ID: ${tableId})`);
    
    // Obtener un registro existente de esa tabla
    const recordsResult = await pool.query('SELECT id FROM records WHERE table_id = $1 LIMIT 1', [tableId]);
    if (recordsResult.rows.length === 0) {
      throw new Error(`No hay registros en la tabla ${tableName}`);
    }
    const recordId = recordsResult.rows[0].id;
    console.log(`   Registro encontrado: ID ${recordId}`);
    
    // Obtener un usuario existente
    const usersResult = await pool.query('SELECT id, name FROM users LIMIT 1');
    if (usersResult.rows.length === 0) {
      throw new Error('No hay usuarios en la base de datos');
    }
    const userId = usersResult.rows[0].id;
    const username = usersResult.rows[0].name;
    console.log(`   Usuario encontrado: ${username} (ID: ${userId})`);
    
    // 1. Crear una notificación programada para un usuario en un registro específico
    console.log('1. Creando notificación programada de prueba...');
    const testNotification = await scheduledNotificationsService.createScheduledNotification({
      table_id: tableId,
      record_id: recordId,
      column_id: null,
      target_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Mañana
      notification_title: 'Notificación de prueba',
      notification_message: 'Esta es una notificación de prueba para verificar el sistema.',
      notify_before_days: 0,
      assigned_users: [userId],
      created_by: userId
    });
    
    console.log('✅ Notificación programada creada:', testNotification);
    
    // 2. Simular actualización del registro
    console.log('2. Simulando actualización del registro...');
    const notifiedUsers = await scheduledNotificationsService.notifyUsersOnRecordUpdate(tableId, recordId);
    
    console.log(`✅ Notificación enviada a ${notifiedUsers} usuarios`);
    
    // 3. Verificar que se creó la notificación de modificación
    console.log('3. Verificando notificaciones del usuario...');
    const userNotifications = await scheduledNotificationsService.getAllUserNotifications(userId);
    
    console.log('📋 Notificaciones del usuario:');
    userNotifications.forEach((notification, index) => {
      console.log(`   ${index + 1}. ${notification.notification_title} - ${notification.notification_message}`);
    });
    
    // 4. Verificar que hay una notificación de modificación
    const modificationNotifications = userNotifications.filter(n => 
      n.notification_title && n.notification_title.includes('modificado')
    );
    
    if (modificationNotifications.length > 0) {
      console.log('✅ Se encontraron notificaciones de modificación:', modificationNotifications.length);
    } else {
      console.log('❌ No se encontraron notificaciones de modificación');
    }
    
    console.log('🎉 Prueba completada exitosamente');
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error);
  } finally {
    // Cerrar conexión a la base de datos
    await pool.end();
  }
}

// Ejecutar la prueba
testNotificationOnUpdate();
