module.exports = {
  formatDate: function (date) {
    const parsedDate = new Date(date);
    return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
      parsedDate
    );
  },

  formatTime: function (date) {

    const parsedDate = new Date(date);

    const timeOptions = {
        hour12: false,
        hour: '2-digit',
        minute:  '2-digit',
        second:  '2-digit',
    };
    
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo', ...timeOptions
    });
    
    return formatter.format(parsedDate);

  },
};
