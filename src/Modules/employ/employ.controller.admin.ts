import { NextFunction, Request, Response } from "express";
import path from "path";
import { UPLOADS_PATH } from "../../config";
import Employ from "./employ.model";
import { unlink } from "node:fs/promises";
import { UtilDatabase } from "../../Utils/finder";

export const AdminEmployController = {
  //index
  index: async (req: Request, res: Response, next: NextFunction) => {
    let query = Employ.query();

    // Continue with the rest of your code for executing the query
    return await UtilDatabase.finder(Employ, req.query, query)
      .then((results) => res.json(results))
      .catch((err) => next(err));
  },
  tindex: async (req: Request, res: Response, next: NextFunction) => {
    let query = Employ.query()
      .select("number")
      .then((results) => {
        if (results.length === 0) {
          // Handle the case when there are no results
          return res.json({ message: "No results found" });
        }

        function groupNumbersByRange(numbers) {
          const groupedNumbers = {};

          numbers.forEach(({ number }) => {
            //convet number to string
            number = number.toString();
            const lastTwoDigits = parseInt(number.slice(0)); // Extract the last two digits
            const groupStart = Math.floor(lastTwoDigits / 100) * 100; // Group by 100s
            const groupEnd = groupStart + 99;

            const groupKey = `${groupStart}-${groupEnd}`;

            if (!groupedNumbers[groupKey]) {
              groupedNumbers[groupKey] = { count: 1, numbers: [number] };
            } else {
              groupedNumbers[groupKey].count += 1;
              groupedNumbers[groupKey].numbers.push(number);
            }
          });

          return groupedNumbers;
        }

        // Get the grouped result
        const result = groupNumbersByRange(results);

        // Convert the result to the desired format
        const formattedResult = [{}];
        formattedResult.pop();
        Object.keys(result).forEach((key) => {
          var values = key.split("-");

          // Reverse the order of the values
          var reversedValues = values.reverse();

          // Concatenate the values back into a range
          var reversedRange = reversedValues.join("-");
          formattedResult.push({
            id: reversedRange,
            count: result[key].count,
          });
        });

        res.json({ data: formattedResult });
      })
      .catch((err) => next(err));
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    //check if id is number
    if (isNaN(Number(req.params.id))) {
      return res.json({ message: "id should be number" });
    }
    let query = Employ.query()
    
      .findById(req.params.id)
      .then((result) => res.json(result));
  },
  store: async (req: Request, res: Response, next: NextFunction) => {
    var data = req.body;
 

    const trx = await Employ.startTransaction();
    data.status = true;

    try {
      await Employ.query(trx)
        .insert(data)
        .then((result) => res.json(result));

      await trx.commit();
    } catch (err) {
      // Delete file

      await trx.rollback();
      return next(err);
    }
  },

  /**
   * ---------------------------------------------------------------------
   * Update an existing instance of a model
   * ---------------------------------------------------------------------
   */
  update: async (req: Request, res: Response, next: NextFunction) => {
    var data = req.body;
    const { id } = req.params;



    try {
      // store file

      await Employ.query()
        .patchAndFetchById(id, data)
        .throwIfNotFound({ message: "Employ not found!" })
        .then((result) => res.json(result));
 
    } catch (err) {
   


      return next(err);
    }
  },

  /**
   * ---------------------------------------------------------------------
   * Destroy an instance of a model
   * ---------------------------------------------------------------------
   */
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await Employ.query()
      .deleteById(id)
      .throwIfNotFound({ message: "Employ not found!" })
      .returning("*")
      .then((result) => res.json(result))
      .catch((err) => next(err));
  },
};
