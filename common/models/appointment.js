'use strict';

module.exports = function(Appointment) {
  // appointment should not set user id
  Appointment.observe('before save', async function(ctx) {
    if (!ctx.isNewInstance) {
      return Promise.resolve();
    }
    if (ctx.instance.userId) {
      return Promise.reject(new Error('Should not set user ID'));
    }
    return Promise.resolve();
  });

  // get userId from access token
  Appointment.observe('before save', async function(ctx) {
    if (!ctx.isNewInstance) {
      return Promise.resolve();
    }
    const accessToken = ctx.options.accessToken;
    if (!accessToken) {
      return Promise.reject(new Error('Cannot find access token'));
    }
    const userId = accessToken.userId;
    ctx.instance.userId = userId;
    return Promise.resolve();
  });
  // set should not set status
  Appointment.observe('before save', async function(ctx) {
    if (!ctx.isNewInstance) {
      return Promise.resolve();
    }
    if (ctx.instance.status) {
      return Promise.reject(new Error('Should not set status'));
    }
    return Promise.resolve();
  });
  // set default status
  Appointment.observe('before save', async function(ctx) {
    if (!ctx.isNewInstance) {
      return Promise.resolve();
    }
    ctx.instance.status = 'BOOKED';
    return Promise.resolve();
  });
  Appointment.prototype.confirm = async function() {
    // payment logic
    this.status = 'confirmed';
    return this.save();
  };
};
