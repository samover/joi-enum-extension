const BaseJoi = require('joi');
const EnumExtension = require('../');

const Joi = BaseJoi.extend(EnumExtension);

describe('extensions', () => {
    describe('enum', () => {
        it('maps string', async () => {
            const schema = Joi.any().enum({ MAPPED: 'mapped' });
            const value = await schema.validate('MAPPED');

            expect(value).toEqual('mapped');
        });
        it('maps objects', async () => {
            const schema = Joi.any().enum({ CHILD: { child: true } });
            const value = await schema.validate('CHILD');

            expect(value).toEqual({ child: true });
        });
        it('maps integers', async () => {
            const schema = Joi.any().enum({ ONE: 1 });
            const value = await schema.validate('ONE');

            expect(value).toEqual(1);
        });
        it('works on enums nested within objects', async () => {
            const schema = Joi.object({
                number: Joi.any().enum({ ONE: 1, TWO: 2 }),
            });
            await expect(schema.validate({ number: 'TWO' })).resolves.toEqual({ number: 2 })
        });
        it('works on an array of enums', async () => {
            const schema = Joi.object({
                numbers: Joi.array().items(Joi.any().enum({ ONE: 1, TWO: 2 })),
            });
            await expect(schema.validate({ numbers: ['TWO'] })).resolves.toEqual({ numbers: [2] })
        });
        it('works with allows null', async () => {
            const schema = Joi.object({
                number: Joi.any().allow(null, 1).valid('abc').enum({ ONE: 1, TWO: 2 }),
            });
            await expect(schema.validate({ number: null })).resolves.toEqual({ number: null});
        });

        it('fails on non-mapped values', async () => {
            const schema = Joi.any().allow(null).enum({ ONE: 1, TWO: 2 });
            await expect(schema.validate('THREE')).rejects.toThrow('"value" must be one of [ONE, TWO]');
        });

        it('fails on non-mapped values in object', async () => {
            const schema = Joi.object({
                number: Joi.any().enum({ ONE: 1, TWO: 2 }),
            });
            await expect(schema.validate({ numbers: 'THREE' })).rejects.toThrow('"numbers" must be one of [ONE, TWO]');
        });
        it('does not interfere with .any()', async () => {
            const schema = Joi.any();
            const value = await schema.validate(true);
            expect(value).toEqual(true);
        });

        it('should be described correctly', () => {
            const enums = {
                a: 1,
                b: 2,
                c: 3,
            };
            const schema = Joi.any().enum(enums);

            expect(schema.describe()).toEqual({
                type: 'any',
                options: {
                    language: {
                        any: {
                            enum: 'must be one of {{enum}}',
                        },
                    },
                },
                flags: {
                    enum: enums,
                },
            });
        });
    });
});
