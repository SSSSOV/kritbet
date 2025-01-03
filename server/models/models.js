const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Определение сущности пользователя 'user'
const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, defaultValue: "USER", allowNull: false },
    full_name: { type: DataTypes.STRING, unique: true, allowNull: false },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    birthday: { type: DataTypes.DATEONLY, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
});
// Характеристики пользователя 'user'
const UserBalance = sequelize.define("user_balance", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.INTEGER },
});
const UserVerification = sequelize.define("user_verification", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.INTEGER, unique: true },
});

// Определение сущности ставки 'bet'
const Bet = sequelize.define("bet", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    coefficient: { type: DataTypes.FLOAT },
    time: { type: DataTypes.DATE },
    bet_amount: { type: DataTypes.INTEGER },
});
// Характеристики ставки 'bet'
const BetStatus = sequelize.define("bet_status", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const BetType = sequelize.define("bet_type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const BetLimit = sequelize.define("bet_limit", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount_max: { type: DataTypes.INTEGER },
    amount_min: { type: DataTypes.INTEGER },
});

// Определение сущности события 'event'
const Event = sequelize.define("event", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
});
// Характеристики события 'event'
const EventResult = sequelize.define("event_result", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const EventCoefficient = sequelize.define("event_coefficient", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    coefficient: { type: DataTypes.FLOAT },
});

// Определение сущности матча 'match'
const Match = sequelize.define("match", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    date_start: { type: DataTypes.DATE },
    date_end: { type: DataTypes.DATE },
});
// Характеристики матча 'match'
const MatchStatus = sequelize.define("match_status", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

// Определение сущности локации 'location'
const Location = sequelize.define("location", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    capacity: { type: DataTypes.INTEGER },
});

// Определение сущности города 'city'
const City = sequelize.define("city", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

// Определение сущности страны 'country'
const Country = sequelize.define("country", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

// Определение сущности участника 'participant'
const Participant = sequelize.define("participant", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
// Характеристики участника 'participant'
const ParticipantType = sequelize.define("participant_type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const ParticipantSport = sequelize.define("participant_sport", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

// Связующие модели
const BetEvent = sequelize.define("bet_event", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const MatchParticipant = sequelize.define("match_participant", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// Описание связей моделей
User.hasOne(UserBalance);
UserBalance.belongsTo(User);

UserVerification.hasMany(User);
User.belongsTo(UserVerification);

User.hasMany(Bet);
Bet.belongsTo(User);

BetStatus.hasMany(Bet);
Bet.belongsTo(BetStatus);

BetType.hasMany(Bet);
Bet.belongsTo(BetType);

BetLimit.hasMany(Bet);
Bet.belongsTo(BetLimit);

Bet.belongsToMany(Event, { through: BetEvent });
Event.belongsToMany(Bet, { through: BetEvent });

EventResult.hasMany(Event);
Event.belongsTo(EventResult);

Event.hasOne(EventCoefficient);
EventCoefficient.belongsTo(Event);

Match.hasMany(Event);
Event.belongsTo(Match);

MatchStatus.hasMany(Match);
Match.belongsTo(MatchStatus);

Location.hasMany(Match);
Match.belongsTo(Location);

City.hasMany(Location);
Location.belongsTo(City);

Country.hasMany(City);
City.belongsTo(Country);

Match.belongsToMany(Participant, { through: MatchParticipant });
Participant.belongsToMany(Match, { through: MatchParticipant });

ParticipantType.hasMany(Participant);
Participant.belongsTo(ParticipantType);

ParticipantSport.hasMany(Participant);
Participant.belongsTo(ParticipantSport);

// Експорт моделей
module.exports = {
    User,
    UserBalance,
    UserVerification,
    Bet,
    BetStatus,
    BetLimit,
    BetType,
    BetEvent,
    Event,
    EventResult,
    EventCoefficient,
    Match,
    MatchStatus,
    Location,
    City,
    Country,
    Participant,
    ParticipantType,
    ParticipantSport,
    MatchParticipant,
};
