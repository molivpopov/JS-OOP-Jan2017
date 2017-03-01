function solve() {
    'use strict';

    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!',
        INVALID_ALIGNMENT: 'Alignment must be good, neutral or evil!'
    };

    const Validator = {
        ValidateName(name) {
            
            if (typeof (name) !== 'string') {
                //console.log('name');
                throw Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            };
            if (name.length < 2 || name.length > 20) {
                // console.log('name');
                throw Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
            };

            if (name.match(/[^a-zA-Z ]/)) {
                // console.log('name');
                throw Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
            };
        },
        ValidatePosisvInteger(mana) {
            
            if (mana < 0 || mana !== (mana | 0)) {
                // console.log('mana');
                throw Error(ERROR_MESSAGES.INVALID_MANA);
            }
        }
    }
    function IsQuerable(x, query) {
        //console.log(query);
        if (!query.name && !query.alignment) {
            return true;
        }
        if (!query.name) {
            return x.alignment === query.alignment;
        }
        if (!query.alignment) {
            return x.name === query.name;
        }

        return (x.name === query.name) && (x.alignment === query.alignment)
    }
    // generate Id
    function GenerateId() {
        var id = 0;
        return function () {
            id += 1;
            return id;
        };
    }
    var ID = GenerateId();
    // Class spell
    class Spell {
        constructor(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;

            if (!(typeof (effect) === 'function' && effect.length === 1)) {
                //console.log('throw here')
                throw Error(ERROR_MESSAGES.INVALID_EFFECT);
            }

            this.effect = effect;

        }

        get name() {
            return this._name;
        }
        set name(name) {
            Validator.ValidateName(name);
            this._name = name;
        }
        get manaCost() {
            return this._manaCost;
        }
        set manaCost(manaCost) {
            Validator.ValidatePosisvInteger(manaCost);
            this._manaCost = manaCost;
        }

    }

    // Class Unit
    class Unit {
        constructor(name, alignment) {

            this.name = name;
            this.alignment = alignment;
        }
        get name() {
            return this._name;
        }

        set name(name) {
            Validator.ValidateName(name);
            this._name = name;
        }
        get alignment() {
            return this._alignement;
        }
        set alignment(alignment) {
            let alig = ['good', 'neutral', 'evil'].filter(x => x === alignment);

            if (alig.length === 0) {
                console.log(alig.length);
                throw Error(ERROR_MESSAGES.INVALID_ALIGNMENT);
            }
            this._alignement = alignment;
        }

    }

    //Class ArmyUnit 
    class ArmyUnit extends Unit {
        constructor(name, alignment, damage, health, count, speed) {
            super(name, alignment);

            this._id = ID();
            this.damage = damage;
            this.health = health;
            this.count = count;
            this.speed = speed;
        }
        get id() {
            return this._id;
        }

        get damage() {
            return this._damage;
        }
        set damage(damage) {
            this._damage = damage;
        }
        get health() {
            return this._health;
        }
        set health(health) {
            this._health = health;
        }
        get count() {
            return this._count
        }
        set count(count) {
            this._count = count
        }
        get speed() {
            return this._speed;
        }
        set speed(speed) {
            this._speed = speed;
        }
    }

    //Class Commander
    class Commander extends Unit {
        constructor(name, alignment, mana) {
            super(name, alignment);

            this.mana = mana;
            this.spellbook = [];
            this.army = [];
        }
        get mana() {
            return this._mana;
        }
        set mana(mana) {
            Validator.ValidatePosisvInteger(mana);
            this._mana = mana;
        }
    }

    //Class Battlemanager
    class Battlemanager {
        constructor() {
            this.comanders = [];
            this._units = [];
        }
        getCommander(name, alignment, mana) {
            return new Commander(name, alignment, mana);
        }
        getArmyUnit(options) {
            return new ArmyUnit(options.name, options.alignment, options.damage, options.health, options.count, options.speed);
        }
        getSpell(name, manaCost, effect) {
            return new Spell(name, manaCost, effect);
        }
        addCommanders(...comand) {
            comand.forEach(x => this.comanders.push(x));
            return this;
        }
        addArmyUnitTo(commanderName, armyUnit) {
            let index = this.comanders.findIndex(x => x.name === commanderName);
            if (index > -1) {
                this.comanders[index].army.push(armyUnit);
            }
            else throw 'have not commander with this name';
            this._units.push(armyUnit);

            return this;

        }
        addSpellsTo(...parameters) {
            let comndName = parameters.shift();
            //console.log(parameters.length);
            let comandir = this.comanders.find(x => x.name === comndName);
            parameters.forEach(x => {
                try {
                    //console.log(x);
                    getSpell(x.name, x.manaCost, x.effect);
                }
                catch(err) {
                    //console.log(x);
                    throw Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                };
            });
            comandir.spellbook = parameters;
            return this;

        }
        findCommanders(query) {
            return this.comanders.filter(x => IsQuerable(x, query));
        }

        findArmyUnitById(id) {

            return this._units.filter(unt => unt.id === id)[0];
        }
        findArmyUnits(query) {
            let res = this._units.filter(unt => IsQuerable(unt, query));
            res = res.sort((a, b) => {
                let sort = b.speed - a.speed;
                if (sort === 0) { return a.name.localeCompare(b.name) };
                return sort;
            });
            return res;

        }
        spellcast(casterName, spellName, targetUnitId) {

        }
        battle(attacker, defender) {

        }
    }

    //const battlemanager = { Battlemanager };
    return new Battlemanager;
}
// var p = solve();
// var pp = new p.ArmyUnit();
// console.log(pp.id);
// pa = new p.ArmyUnit();
// console.log(pp.id);
// pb = new p.ArmyUnit();
// console.log(pa.id);
module.exports = solve;