const mongoose = require('mongoose');
const barSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Month: String,
    Consumption: String,
    'Average Temperature (°F)': String,
    Avg: {
      'Total CO2 Emissions (metric tons)': String,
      'Total Revenue from Electricity Sales (USD)': String,
      'Total Electricity Generation (GWh)': String
    }
  });
const Bar = mongoose.model('Bar', barSchema);

module.exports = Bar;