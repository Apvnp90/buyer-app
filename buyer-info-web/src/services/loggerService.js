const loggerService = {
  error: (message, error, context = {}) => {
    console.error(`[ERROR] ${message}`, {
      error: error?.message || error,
      stack: error?.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  },

  warn: (message, context = {}) => {
    console.warn(`[WARN] ${message}`, {
      context,
      timestamp: new Date().toISOString(),
      url: window.location.href
    });
  },

  info: (message, context = {}) => {
    console.info(`[INFO] ${message}`, {
      context,
      timestamp: new Date().toISOString()
    });
  },

  debug: (message, context = {}) => {
    if (import.meta.env.DEV) {
      console.debug(`[DEBUG] ${message}`, {
        context,
        timestamp: new Date().toISOString()
      });
    }
  }
};

export default loggerService;
