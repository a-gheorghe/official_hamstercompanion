const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DEV_MODE ? process.env.DEV_DATABASE_URL : process.env.DATABASE_URL);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Define models here
const User = sequelize.define('user', {
  username: { type: Sequelize.STRING, allowNull: false, unique: true},
  password: { type: Sequelize.STRING, allowNull: false },
  fName: { type: Sequelize.STRING },
  lName: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  sex: {
    type: Sequelize.ENUM('M', 'F')
  }
});

const Experiment = sequelize.define('experiment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  adminPassword: { type: Sequelize.STRING, allowNull: false },
  description: {
    type: Sequelize.STRING
  }
});

const TreatmentGroup = sequelize.define('treatment_group', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isControl: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  notes: {
    type: Sequelize.STRING
  }
});

const Cage = sequelize.define('cage', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  wheel_diameter: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  notes: {
    type: Sequelize.STRING
  }
});

const Mouse = sequelize.define('mouse', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rfid: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sex: {
    type: Sequelize.ENUM('M', 'F'),
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER
  },
  notes: {
    type: Sequelize.STRING
  }
});

const Session = sequelize.define('session', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  revolutions: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  start_time: {
    type: Sequelize.DATE,
    allowNull: false
  },
  end_time: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

const UserExperiment = sequelize.define('user_experiment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

UserExperiment.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
User.hasMany(UserExperiment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

UserExperiment.belongsTo(Experiment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Experiment.hasMany(UserExperiment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

User.belongsToMany(Experiment, { through: UserExperiment });
Experiment.belongsToMany(User, { through: UserExperiment });

TreatmentGroup.belongsTo(Experiment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Experiment.hasMany(TreatmentGroup, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Cage.belongsTo(TreatmentGroup, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
TreatmentGroup.hasMany(Cage, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Mouse.belongsTo(Cage, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Cage.hasMany(Mouse, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Session.belongsTo(Mouse, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Mouse.hasMany(Session, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

module.exports = {
  // Export models here
  sequelize,
  Sequelize,
  User,
  Experiment,
  TreatmentGroup,
  Cage,
  Mouse,
  Session,
  UserExperiment
};
