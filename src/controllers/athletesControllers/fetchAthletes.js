import { ApiResponse } from "../../utils/apiResponse";
import { AsyncHandler } from "../../utils/asyncHandler";
import { User } from "../../models/user.models.js";

export const fetchAthletes = AsyncHandler(async (req, res) => {
  try {
    let {
      q,
      sport,
      region,
      minAge,
      maxAge,
      page = 1,
      limit = 10,
      sort = "createdAt",
    } = req.query;

    const filters = {};

    if (q) {
      const regex = new RegExp(q, "i");
      filters.$or = [{ name: regex }, { username: regex }, { email: regex }];
    }

    if (sport) filters.sport = sport;
    if (region) filters.region = region;

    if (minAge || maxAge) {
      filters.age = {};
      if (minAge) filters.age.$gte = parseInt(minAge, 10);
      if (maxAge) filters.age.$lte = parseInt(maxAge, 10);
    }

    const total = await User.countDocuments(filters);

    const items = await User.find(filters)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(
      new ApiResponse(200, "Athletes fetched successfully", {
        items,
        total,
        page,
        limit,
      })
    );
  } catch (err) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          err.message || "Error while fetching athletes"
        )
      );
  }
});
