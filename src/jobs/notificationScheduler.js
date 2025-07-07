const cron = require('node-cron');
const scheduledNotificationsService = require('../services/scheduledNotificationsService');

class NotificationScheduler {
  constructor() {
    this.jobs = [];
  }

  // Iniciar el programador de notificaciones
  start() {
    // Ejecutar cada día a las 9:00 AM
    const dailyJob = cron.schedule('0 9 * * *', async () => {
      try {
        console.log('Ejecutando proceso de notificaciones diarias...');
        const processedCount = await scheduledNotificationsService.processDailyNotifications();
        console.log(`Se procesaron ${processedCount} notificaciones`);
      } catch (error) {
        console.error('Error procesando notificaciones diarias:', error);
      }
    }, {
      timezone: 'America/Mexico_City'
    });

    // Ejecutar cada hora para verificar notificaciones urgentes
    const hourlyJob = cron.schedule('0 * * * *', async () => {
      try {
        console.log('Verificando notificaciones urgentes...');
        const notifications = await scheduledNotificationsService.getNotificationsDueForSending();
        
        if (notifications.length > 0) {
          console.log(`Se encontraron ${notifications.length} notificaciones urgentes`);
          await scheduledNotificationsService.processDailyNotifications();
        }
      } catch (error) {
        console.error('Error verificando notificaciones urgentes:', error);
      }
    });

    this.jobs.push(dailyJob, hourlyJob);
    console.log('Programador de notificaciones iniciado');
  }

  // Detener todos los trabajos programados
  stop() {
    this.jobs.forEach(job => job.destroy());
    this.jobs = [];
    console.log('Programador de notificaciones detenido');
  }

  // Ejecutar manualmente el proceso de notificaciones
  async processNotificationsManually() {
    try {
      console.log('Ejecutando proceso manual de notificaciones...');
      const processedCount = await scheduledNotificationsService.processDailyNotifications();
      console.log(`Se procesaron ${processedCount} notificaciones manualmente`);
      return processedCount;
    } catch (error) {
      console.error('Error en proceso manual de notificaciones:', error);
      throw error;
    }
  }
}

module.exports = new NotificationScheduler();
