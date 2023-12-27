const zod = require('zod');
const crypto = require('crypto');

function generateId() {
    const temp = crypto.randomBytes(4);

    const uniqueId = temp.toString('hex');

    return uniqueId;
}

function validateInput(users) {
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8).max(255)
    });

    const result = schema.safeParse(users);

    return result;
}

function validateRecipes(recipes) {
    const recipeSchema = zod.object({
        name: zod.string().min(1).max(255),
        imageUrl: zod.string().url(),
        cookingTime: zod.number().int().positive(),
      });

      return recipeSchema.safeParse(recipes);
}


module.exports = {
    validateInput,
    generateId,
    validateRecipes
}