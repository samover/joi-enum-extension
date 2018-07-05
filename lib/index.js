const Joi = require('joi');

module.exports = {
    name: 'any',
    base: Joi.any(),
    language: {
        enum: 'must be one of {{enum}}',
    },
    coerce(value, state, options) {
        // Pass the buck to 'any'
        if (!this._flags.enum) return value;

        // Allow for adding extra valids like NULL
        const valids = this._valids._set;

        const enums = new Map(Object.entries(this._flags.enum));

        if (valids.has(value)) return value;
        if (enums.has(value)) return enums.get(value);

        return this.createError('any.enum', { value, enum: [...enums.keys(), ...valids.keys()].filter(i => i !== null) }, state, options);
},
    rules: [
        {
            name: 'enum',
            params: {
                enum: Joi.object(),
            },
            setup(params) {
                this._flags.enum = params.enum;
            },
        },
    ],
};
