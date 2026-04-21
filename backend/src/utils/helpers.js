export const successResponse = (res, data, message = 'Succès', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  };
  
  export const paginateResults = (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return { limit: parseInt(limit), offset };
  };