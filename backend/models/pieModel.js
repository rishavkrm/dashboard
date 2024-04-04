const mongoose = require('mongoose');
const pieSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Quarter: String,
    'Consumption (kWh)': String,
    'Population (millions)': String,
    'Renewable Energy %': String,
    'Total Energy Consumption (GWh)': String,
    Avg: {
      'Total CO2 Emissions (metric tons)': String,
      'Total Revenue from Electricity Sales (USD)': String,
      'Total Electricity Generation (GWh)': String
    }
  });
  const Pie = mongoose.model('Pie', pieSchema);

  module.exports = Pie;