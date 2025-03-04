const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { name, description, category, price, image, ingredients } = request.body;
    const user_id = request.user.id;

    const dish_id = await knex("dishes").insert({
      name,
      description,
      category,
      price,
      image,
      created_by: user_id,
      updated_by: user_id,
    });

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dish_id,
        name,
        created_by: user_id,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");

    return response.json({
      ...dish,
      ingredients,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json();
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description, category, price, ingredients } = request.body;
    const imageFilename = request.file?.filename;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Prato não encontrado.", 404);
    }

    const dishUpdate = {
      name: name ?? dish.name,
      description: description ?? dish.description,
      category: category ?? dish.category,
      price: price ?? dish.price,
      updated_by: request.user.id,
      updated_at: knex.fn.now(),
    };

    if (imageFilename) {
      const diskStorage = new DiskStorage();

      if (dish.image) {
        await diskStorage.deleteFile(dish.image);
      }

      const filename = await diskStorage.saveFile(imageFilename);
      dishUpdate.image = filename;
    }

    if (ingredients) {
      await knex("ingredients").where({ dish_id: id }).delete();

      const ingredientsInsert = ingredients.map((name) => {
        return {
          dish_id: id,
          name,
          created_by: dish.created_by,
        };
      });

      await knex("ingredients").insert(ingredientsInsert);
    }

    await knex("dishes").where({ id }).update(dishUpdate);

    return response.json();
  }

  async index(request, response) {
    const { title, ingredients } = request.query;

    let dishes;

    if (ingredients) {
      const filterIngredients = ingredients.split(",").map((ingredient) => ingredient.trim());

      dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.description",
          "dishes.category",
          "dishes.price",
          "dishes.image",
        ])
        .whereLike("dishes.name", `%${title}%`)
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("dishes.name");
    } else {
      dishes = await knex("dishes")
        .whereLike("name", `%${title}%`)
        .orderBy("name");
    }

    const dishesIngredients = await knex("ingredients");
    const dishesWithIngredients = dishes.map((dish) => {
      const dishIngredients = dishesIngredients.filter((ingredient) => ingredient.dish_id === dish.id);

      return {
        ...dish,
        ingredients: dishIngredients,
      };
    });

    return response.json(dishesWithIngredients);
  }
}

module.exports = DishesController;