const Intervention = require('../models/Intervention');
const User = require('../models/User');

exports.createIntervention = async (req, res) => {
  try {
    const { panneType, location } = req.body;
    const driverId = req.user.id;

    const intervention = await Intervention.create({
      driverId,
      panneType,
      pickupLocation: { type: 'Point', coordinates: [location.lng, location.lat] },
      status: 'pending'
    });

    const mechanics = await User.findAll({
      where: { role: 'mechanic', isAvailable: true }
    });

    res.json({ success: true, intervention, mechanicsCount: mechanics.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

exports.acceptIntervention = async (req, res) => {
  try {
    const { interventionId } = req.body;
    const mechanicId = req.user.id;

    const intervention = await Intervention.findByPk(interventionId);
    if (!intervention) {
      return res.status(404).json({ success: false, message: 'Intervention non trouvée' });
    }

    intervention.mechanicId = mechanicId;
    intervention.status = 'accepted';
    await intervention.save();

    res.json({ success: true, intervention });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};
