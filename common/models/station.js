'use strict';

module.exports = function(Station) {
  // remote method hook
  Station.observe('before save', async function(ctx) {
    try {
      const queue = await Station.app.models.Queue.create();
      ctx.instance.queueId = queue.id;
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  });
};
